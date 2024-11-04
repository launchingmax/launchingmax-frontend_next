import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import reduce from "lodash-es/reduce";
import isObject from "lodash-es/isObject";
import assign from "lodash-es/assign";
import isArray from "lodash-es/isArray";
import omitBy from "lodash-es/omitBy";
import isNil from "lodash-es/isNil";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function flattenObject(obj?: any, parentKey = "", separator = ".") {
  if (!obj) return obj;
  return reduce(
    obj,
    (acc, value, key) => {
      const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

      if (isObject(value) && !isArray(value)) {
        assign(acc, flattenObject(value, newKey, separator));
      } else {
        //@ts-ignore
        acc[newKey] = value;
      }

      return acc;
    },
    {}
  );
}

export function objectToQueryParams(obj?: any) {
  if (!obj) return obj;
  obj = omitBy(obj, isNil);
  return reduce(
    obj,
    (acc, value, key) => {
      acc += acc ? `&${key}=${value}` : `?${key}=${value}`;

      return acc;
    },
    ""
  );
}

export function formatNumberWithCommas(number: number) {
  return Intl.NumberFormat("en-US").format(number);
}
