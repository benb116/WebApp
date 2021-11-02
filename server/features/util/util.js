const out = {};

const logger = require('../../utilities/logger');

// Clean up the raw response from the database
out.dv = function dv(input) {
  if (input === null) { return input; }
  if (input.length) { return input.map(out.dv); }
  if (input.toJSON) { return input.toJSON(); }
  return input;
};

// Transaction object to cause SELECT ... FOR UPDATE
out.tobj = function tobj(t) {
  return {
    transaction: t,
    lock: t.LOCK.UPDATE,
  };
};

// Custom error function that returns a msg and http status
out.Error = function uError(msg, status = 500) {
  const err = new Error(msg);
  err.status = status;
  throw err;
};

out.errorHandler = function errorHandler(responseMap) {
  return function errorHandlerInner(err) {
    const outmess = (responseMap.default || 'Unexpected error');
    if (!err) return out.Error(outmess[0], (outmess[1] || 500));
    if (err.status) throw err;
    const errmess = err.parent?.constraint;
    const respout = responseMap[errmess];
    if (respout) return out.Error(respout[0], respout[1]);
    logger.error(`Unknown error: ${err}`);
    return out.Error(outmess[0], (outmess[1] || 500));
  };
};

// Console.log passthrough for promises
out.cl = function cl(input) {
  logger.info(input);
  return input;
};

// Validate an object based on a Joi schema
out.validate = function validate(input, schema) {
  const { value, error } = schema.validate(input);
  if (error) { out.Error(error.details[0].message, 400); }
  return value;
};

// Functions used in Jest testing
// Ensures that a service call returns an object with specific properties
out.ObjectTest = function ObjectTest(service, req, contains) {
  return async () => service(req).then((resp) => {
    expect(resp).toEqual(expect.objectContaining(contains));
  });
};

// Ensures that a service call returns an array with specific elements
out.ArrayTest = function ArrayTest(service, req, items) {
  return async () => service(req).then((resp) => {
    items.forEach((e) => {
      let check = e;
      if (typeof check === 'object' && check !== null) {
        check = expect.objectContaining(e);
      }
      expect(resp).toContainEqual(check);
    });
  });
};

// Ensures that a service call throws an error with specific status number and message
out.ErrorTest = function ErrorTest(service, req, statusNumber, message) {
  return async function errortest() {
    try {
      const o = await service(req);
      // eslint-disable-next-line no-console
      console.log(o);
      throw new Error('Unexpected pass');
    } catch (err) {
      // eslint-disable-next-line no-console
      if (!err.status) { console.log(err); }
      expect(err.message).toEqual(message);
      expect(err.status).toEqual(statusNumber);
    }
  };
};

// Compare strings in constant time
// https://snyk.io/blog/node-js-timing-attack-ccc-ctf/
out.OnCompare = function OnCompare(a, b) {
  let mismatch = 0;
  for (let i = 0; i < a.length; ++i) {
    // eslint-disable-next-line no-bitwise
    mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
  }
  return mismatch;
};

module.exports = out;
