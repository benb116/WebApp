import { Schema } from 'joi';
import { Model, Transaction } from 'sequelize';

// Clean up the raw response from the database
export const dv = function dv(input: Model | Model[] | null) : any | any[] | null {
  if (input === null) { return input; }
  if (input instanceof Model) { return input.toJSON(); }
  if (input.length) { return input.map(dv); }
  return input;
};

// Transaction object to cause SELECT ... FOR UPDATE
export const tobj = function tobj(t: Transaction) {
  return {
    transaction: t,
    lock: t.LOCK.UPDATE,
  };
};

export interface UError extends Error {
  message: string,
  name: string,
  status: number,
}

// Custom error function that returns a msg and http status
export const uError = function uError(msg: string, status = 500) {
  const uerr: UError = { name: msg, message: msg, status };
  throw uerr;
};

export const isUError = (item: unknown): item is UError => !!(item as UError)?.status;

// Validate an object based on a Joi schema
export const validate = function validate(input: unknown, schema: Schema) {
  const { value, error } = schema.validate(input);
  if (error) { uError(error.details[0].message, 400); }
  return value;
};

// Compare strings in constant time
// https://snyk.io/blog/node-js-timing-attack-ccc-ctf/
export const OnCompare = function OnCompare(a: string, b: string) {
  let mismatch = 0;
  for (let i = 0; i < a.length; ++i) {
    // eslint-disable-next-line no-bitwise
    mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
  }
  return mismatch;
};
// Filter out duplicates
export const onlyUnique = function onlyUnique(value: unknown, index: number, self: unknown[]) {
  return self.indexOf(value) === index;
};
