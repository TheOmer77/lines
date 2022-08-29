import { useEffect, useRef } from 'react';

import useWindowSize from '../hooks/useWindowSize';
import { drawLine, drawPoint } from '../utils/canvasUtils';
import getPointsForLine from '../utils/getPointsForLine';
import type { Line, StyleProperties } from '../types';

const LineCanvas = ({
  points,
  style,
}: {
  points: Line;
  style: StyleProperties;
}) => {
  const { width, height } = useWindowSize();

  const ref = useRef<HTMLCanvasElement>(null);

  /** Set the canvas width + height to viewport width + height */
  useEffect(() => {
    ref.current?.setAttribute('width', `${width}px`);
    ref.current?.setAttribute('height', `${height}px`);
  }, [height, width]);

  /** Draw the lines that the user has drawn, from points state */
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    if (points.length === 1)
      return drawPoint(canvas, points[0], {
        fillStyle: style.colors.point,
        radius: style.radius,
      });

    // Draw lines first
    points
      .map((vert, index) => [vert, points[index + 1]])
      .forEach(
        ([p1, p2]) =>
          p2 &&
          drawLine(canvas, p1, p2, {
            strokeStyle: style.colors.line,
            lineWidth: style.lineWidth,
          })
      );

    // Then draw points
    points
      .map((vert, index) => [vert, points[index + 1]])
      .forEach(
        ([p1, p2]) =>
          p2 &&
          getPointsForLine(p1, p2, style.spacing).forEach(point =>
            drawPoint(canvas, point, {
              fillStyle: style.colors.point,
              radius: style.radius,
            })
          )
      );

    return () => {
      if (width && height)
        canvas?.getContext?.('2d')?.clearRect?.(0, 0, width, height);
    };
  }, [
    height,
    points,
    style.colors.line,
    style.colors.point,
    style.lineWidth,
    style.radius,
    style.spacing,
    width,
  ]);

  return <canvas ref={ref} />;
};

export default LineCanvas;
