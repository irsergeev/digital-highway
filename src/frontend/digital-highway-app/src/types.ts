export interface Highway {
    id: string
    parts: Array<HighwayPart>
}

export interface HighwayPart {
    order: number,
    track: Track
}

export interface Track {
    id: string,
    startPoint: Point,
    endPoint: Point,
    distance: number,
    maxSpeed: number,
    surfaceType: number
}

export interface Point {
    id: string,
    height: number,
    name: string
}

export interface HighwayMetadata {
    id: string,
    totalDistance: number,
    tracksCount: number,
    points: number[]
}