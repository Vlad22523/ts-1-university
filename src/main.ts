import { add, multiply } from "./modules/calculator/calculator";
import { formatMessage } from "./modules/formatter/formatter";
import { log } from "./modules/logger/logger";
import { NumberPair } from "./types/types";

const nums: NumberPair = { a: 5, b: 7 };

const sum = add(nums);
const product = multiply(nums);

log(formatMessage(`Сума: ${sum}`));
log(formatMessage(`Добуток: ${product}`));
