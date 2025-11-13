import { NumberPair } from "../../types/types";

export function add(numbers: NumberPair): number {
  return numbers.a + numbers.b;
}

export function multiply(numbers: NumberPair): number {
  return numbers.a * numbers.b;
}
