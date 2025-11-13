import { Message } from "../../types/types";

export function formatMessage(msg: Message): string {
  return `>>> ${msg} <<<`;
}
