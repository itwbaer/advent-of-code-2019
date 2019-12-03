"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OP_ADD = 1;
const OP_MULT = 2;
const OP_KILL = 99;
exports.processIndex = (input, index) => {
    let opCode = input[index];
    if (opCode === OP_KILL) {
        return null;
    }
    switch (opCode) {
        case OP_ADD:
            input[input[index + 3]] = input[input[index + 1]] + input[input[index + 2]];
            break;
        case OP_MULT:
            input[input[index + 3]] = input[input[index + 1]] * input[input[index + 2]];
            break;
        default:
            return null;
    }
    index += 4;
    return index < input.length - 4 ? index : null;
};
//# sourceMappingURL=day2.helper.js.map