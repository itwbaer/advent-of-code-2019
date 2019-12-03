export const massToFuel = (mass: number): number => {
    let fuel = Math.floor(mass / 3) - 2
    return fuel > 0 ? fuel : 0;
}

export const moduleToFuel = (mod: number): number => {
    let totalFuel = 0;
    let mass = mod;

    while(mass > 0) {
        mass = massToFuel(mass);
        totalFuel += mass;
    }

    return totalFuel;
}