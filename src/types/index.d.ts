export type Point = [number, number];
export type Line = Point[];

export interface StyleProperties {
  spacing: number;
  lineWidth: number;
  radius: number;
  colors: {
    line: string;
    point: string;
    tempLine: string;
    tempPoint: string;
  };
}
