import type { Point } from '../types';

const getPointsForLine = (
  point1: Point,
  point2: Point,
  spacing: number
): Point[] => {
  const lengthX = point2[0] - point1[0],
    lengthY = point2[1] - point1[1];
  const length = Math.hypot(point2[0] - point1[0], point2[1] - point1[1]);

  const pointsNum = parseInt((length / spacing).toString());

  return [...Array(pointsNum + 1)].map((_, i) => [
    point1[0] + (lengthX / pointsNum) * i,
    point1[1] + (lengthY / pointsNum) * i,
  ]);
};

export default getPointsForLine;
