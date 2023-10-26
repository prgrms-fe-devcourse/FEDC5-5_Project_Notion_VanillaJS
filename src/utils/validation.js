import { MESSAGE } from "./constants.js";

export function validateConstructorUsage(target) {
  if (!target) {
    throw new Error(MESSAGE.NEW_INSTANCE);
  }
}

export function validationfetchData(data) {
  if (!Array.isArray(data)) throw new Error(MESSAGE.VALIDATION_ARRAY);
}
