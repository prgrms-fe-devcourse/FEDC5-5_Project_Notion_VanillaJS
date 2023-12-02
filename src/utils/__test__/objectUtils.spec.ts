import { isObject, deepEqual } from "@/utils/objectUtils";

describe("isObject", () => {
  it("should return false for primitive types", () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(Symbol())).toBe(false);
  });

  it("should return true for objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
    expect(isObject({ key: { nestedKey: "nestedValue" } })).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(/regex/)).toBe(true);
    expect(isObject(new Set())).toBe(true);
    expect(isObject(new Map())).toBe(true);
  });

  it("should return true for arrays", () => {
    expect(isObject([])).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject([{ key: "value" }])).toBe(true);
  });

  it("should return true for functions", () => {
    expect(isObject(() => {})).toBe(true);
    expect(isObject(function () {})).toBe(true);
  });
});

describe("deepEqual", () => {
  it("should return true for strictly equal primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("string", "string")).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
  });

  it("should return false for different primitives", () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual("string1", "string2")).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
  });

  it("should return true for deeply equal objects", () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
  });

  it("should return false for objects with different structures", () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2, d: 3 } })).toBe(false);
  });

  it("should return false for objects with same structure but different values", () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);
  });

  it("should return true for deeply equal arrays", () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
  });

  it("should return false for arrays with different values or structures", () => {
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(deepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });
});
