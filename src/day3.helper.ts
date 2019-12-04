
interface ICoords {
    y: number;
    x: number;
}

interface IInstruction {
    axis: string;
    dir: number;
    val: number;
}

const pathToInstruction = (path: string): IInstruction => {
    let axis, dir;
    switch(path[0]) {
        case "R":
            axis = "x";
            dir = 1;
            break;
        case "L":
            axis = "x";
            dir = -1;
            break;
        case "U":
            axis = "y";
            dir = 1;
            break;
        case "D":
            axis = "y";
            dir = -1;
            break;
    }

    let val = parseInt(path.substring(1));

    return {
        val: val, dir: dir, axis: axis,
    };
};

const coordsToKey = (coords: ICoords): string => {
    return JSON.stringify(coords);
};

const keyToCoords = (key: string): ICoords => {
    return JSON.parse(key);
};

const mapWire = (wire: string[]): any => {
    let map: any = {};
    let coords: ICoords = {x: 0, y: 0};
    map[coordsToKey(coords)] = 1;
    let steps = 0;
    for(let path of wire) {
        let instruction = pathToInstruction(path);
        for(let i = 0; i < instruction.val; i++) {
            steps++;
            coords[instruction.axis] = coords[instruction.axis] + 1 * instruction.dir;
            if(!map[coordsToKey(coords)]) {
                map[coordsToKey(coords)] = steps;
            }
            
        }
    }

    return map;
};

const wireCollisonsOfCoords = (wire1Map: any, wire2Map: any): ICoords[] => {
    let collisions = [];

    for(let key in wire1Map) {
        if(key in wire2Map) {
            collisions.push(keyToCoords(key));
        }
    }
    return collisions;
};

const manhattanDistance = (coords: ICoords): number => {
    return Math.abs(coords.x) + Math.abs(coords.y);
};

export const minimumCollisionOfCoords = (wire1: any, wire2: any): number => {
    let wire1Map = mapWire(wire1);
    let wire2Map = mapWire(wire2);

    //delete 0 key
    delete wire1Map[coordsToKey({x: 0, y: 0})];
    delete wire2Map[coordsToKey({x: 0, y: 0})];

    let collisions = wireCollisonsOfCoords(wire1Map, wire2Map);
    let min = manhattanDistance(collisions[0]);
    for(let coords of collisions) {
        let distance = manhattanDistance(coords);
        if(distance !== 0) {
            min = distance < min ? distance : min;
        }
    }

    return min;
};

const wireCollisonsOfSteps = (wire1Map: any, wire2Map: any): number[] => {
    let stepCollisions = [];

    for(let key in wire1Map) {
        if(key in wire2Map) {
            stepCollisions.push(wire1Map[key] + wire2Map[key]);
        }
    }
    return stepCollisions;
};

export const minimumCollisionOfSteps = (wire1: any, wire2: any): number => {
    let wire1Map = mapWire(wire1);
    let wire2Map = mapWire(wire2);

    //delete 0 key
    delete wire1Map[coordsToKey({x: 0, y: 0})];
    delete wire2Map[coordsToKey({x: 0, y: 0})];

    return Math.min(...wireCollisonsOfSteps(wire1Map, wire2Map));
};