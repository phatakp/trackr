import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createEnumObject = <T extends readonly [string, ...string[]]>(
  values: T,
): Record<T[number], T[number]> => {
  const obj: Record<string, T[number]> = {};
  for (const value of values) {
    obj[value] = value;
  }
  return obj;
};

export const amountFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const shortAmount = (amt: number, dec?: number) => {
  if (amt > 10000000) {
    const num = (amt / 10000000).toFixed(dec ?? 2);
    return num + "Cr";
  }
  if (amt > 100000) {
    const num = (amt / 100000).toFixed(dec ?? 2);
    return num + "L";
  }
  if (amt >= 1000) {
    const num = (amt / 1000).toFixed(dec ?? 2);
    return num + "K";
  }
  return amt.toFixed();
};

export function getValueOf<T extends Record<string, any>>(
  key: keyof T,
  object: T,
) {
  return object[key];
}
