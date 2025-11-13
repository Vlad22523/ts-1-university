import { Message } from "../../types/types";

export function log(msg: Message): void {
  console.log(`[LOG]: ${msg}`);
}
