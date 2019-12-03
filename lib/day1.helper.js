"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.massToFuel = (mass) => {
    let fuel = Math.floor(mass / 3) - 2;
    return fuel > 0 ? fuel : 0;
};
exports.moduleToFuel = (mod) => {
    let totalFuel = 0;
    let mass = mod;
    while (mass > 0) {
        mass = exports.massToFuel(mass);
        totalFuel += mass;
    }
    return totalFuel;
};
//# sourceMappingURL=day1.helper.js.map