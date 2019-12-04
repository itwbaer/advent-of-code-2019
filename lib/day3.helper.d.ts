interface ICoords {
    y: number;
    x: number;
}
export declare const mapWire: (wire: string[]) => any;
export declare const wireCollisons: (wire1Map: any, wire2Map: any) => ICoords[];
export declare const minimumCollision: (wire1: any, wire2: any) => number;
export {};
