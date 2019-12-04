"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathToInstruction = (path) => {
    let axis, dir;
    switch (path[0]) {
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
const coordsToKey = (coords) => {
    return JSON.stringify(coords);
};
const keyToCoords = (key) => {
    return JSON.parse(key);
};
const mapWire = (wire) => {
    let map = {};
    let coords = { x: 0, y: 0 };
    map[coordsToKey(coords)] = 1;
    let steps = 0;
    for (let path of wire) {
        let instruction = pathToInstruction(path);
        for (let i = 0; i < instruction.val; i++) {
            steps++;
            coords[instruction.axis] = coords[instruction.axis] + 1 * instruction.dir;
            if (!map[coordsToKey(coords)]) {
                map[coordsToKey(coords)] = steps;
            }
        }
    }
    return map;
};
const wireCollisonsOfCoords = (wire1Map, wire2Map) => {
    let collisions = [];
    for (let key in wire1Map) {
        if (key in wire2Map) {
            collisions.push(keyToCoords(key));
        }
    }
    return collisions;
};
const manhattanDistance = (coords) => {
    return Math.abs(coords.x) + Math.abs(coords.y);
};
exports.minimumCollisionOfCoords = (wire1, wire2) => {
    let wire1Map = mapWire(wire1);
    let wire2Map = mapWire(wire2);
    //delete 0 key
    delete wire1Map[coordsToKey({ x: 0, y: 0 })];
    delete wire2Map[coordsToKey({ x: 0, y: 0 })];
    let collisions = wireCollisonsOfCoords(wire1Map, wire2Map);
    let min = manhattanDistance(collisions[0]);
    for (let coords of collisions) {
        let distance = manhattanDistance(coords);
        if (distance !== 0) {
            min = distance < min ? distance : min;
        }
    }
    return min;
};
const wireCollisonsOfSteps = (wire1Map, wire2Map) => {
    let stepCollisions = [];
    for (let key in wire1Map) {
        if (key in wire2Map) {
            stepCollisions.push(wire1Map[key] + wire2Map[key]);
        }
    }
    return stepCollisions;
};
exports.minimumCollisionOfSteps = (wire1, wire2) => {
    let wire1Map = mapWire(wire1);
    let wire2Map = mapWire(wire2);
    //delete 0 key
    delete wire1Map[coordsToKey({ x: 0, y: 0 })];
    delete wire2Map[coordsToKey({ x: 0, y: 0 })];
    return Math.min(...wireCollisonsOfSteps(wire1Map, wire2Map));
};
//# sourceMappingURL=day3.helper.js.map