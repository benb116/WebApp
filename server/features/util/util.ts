import { Schema } from 'joi';
import { Model, Transaction } from 'sequelize';

import logger from '../../utilities/logger';

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

// Console.log passthrough for promises
export const cl = function cl(input: any) {
  logger.info(input);
  return input;
};

// Validate an object based on a Joi schema
export const validate = function validate(input: Record<string, any>, schema: Schema) {
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
export const onlyUnique = function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
};

export type ServiceType = (inp: any) => Promise<any>;
