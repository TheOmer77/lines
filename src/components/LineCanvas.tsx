import { useEffect, useRef } from 'react';

import { colors, spacing } from '../constants/defaults';
import useWindowSize from '../hooks/useWindowSize';
import { drawLine, drawPoint } from '../utils/canvasUtils';
import getPointsForLine from '../utils/getPointsForLine';
import type { Line } from '../types';

const LineCanvas = ({ points }: { points: Line }) => {
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

    if (points.length === 1) return drawPoint(canvas, points[0]);

    // Draw lines first
    points
      .map((vert, index) => [vert, points[index + 1]])
      .forEach(
        ([p1, p2]) =>
          p2 &&
          drawLine(canvas, p1, p2, { strokeStyle: colors.line, lineWidth: 4 })
      );

    // Then draw points
    points
      .map((vert, index) => [vert, points[index + 1]])
      .forEach(
        ([p1, p2]) =>
          p2 &&
          getPointsForLine(p1, p2, spacing).forEach(point =>
            drawPoint(canvas, point, { fillStyle: colors.point })
          )
      );

    return () => {
      if (width && height)
        canvas?.getContext?.('2d')?.clearRect?.(0, 0, width, height);
    };
  }, [height, points, width]);

  return <canvas ref={ref} />;
};

export default LineCanvas;
