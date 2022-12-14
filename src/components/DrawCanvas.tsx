import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { drawLine, drawPoint } from '../utils/canvasUtils';
import getPointsForLine from '../utils/getPointsForLine';
import type { Line, StyleProperties } from '../types';

const DrawCanvas = ({
  points,
  setPoints,
  drawing,
  setDrawing,
  style,
}: {
  points: Line;
  setPoints: Dispatch<SetStateAction<Line>>;
  drawing: boolean;
  setDrawing: Dispatch<SetStateAction<boolean>>;
  style: StyleProperties;
}) => {
  const { width, height } = useWindowSize();

  const ref = useRef<HTMLCanvasElement>(null);

  /** Click will add the clicked position as a point to points */
  const canvasClickHandler: MouseEventHandler = useCallback(
    ({ clientX, clientY }) => {
      if (!drawing) {
        setDrawing(true);
        if (points.length) return;
      }
      setPoints(prev => [...prev, [clientX, clientY]]);

      if (!ref.current || !width || !height) return;
      ref.current.getContext('2d')?.clearRect(0, 0, width, height);
    },
    [drawing, height, points.length, setDrawing, setPoints, width]
  );

  /** Double click will stop drawing */
  const canvasDoubleClickHandler = useCallback(
    () => drawing && setDrawing(false),
    [drawing, setDrawing]
  );

  /** Draw the line that the user is about to draw */
  const canvasMouseMoveHandler: MouseEventHandler = useCallback(
    ({ clientX, clientY }) => {
      const drawCanvas = ref.current;

      if (!drawCanvas || !width || !height) return;
      drawCanvas.getContext('2d')?.clearRect(0, 0, width, height);

      if (!drawing || !points.length) return;

      drawLine(drawCanvas, points[points.length - 1], [clientX, clientY], {
        strokeStyle: style.colors.tempLine,
        lineWidth: style.lineWidth,
      });
      getPointsForLine(
        points[points.length - 1],
        [clientX, clientY],
        style.spacing
      ).forEach(point =>
        drawPoint(drawCanvas, point, {
          fillStyle: style.colors.tempPoint,
          radius: style.radius,
        })
      );
    },
    [
      drawing,
      height,
      points,
      style.colors.tempLine,
      style.colors.tempPoint,
      style.lineWidth,
      style.radius,
      style.spacing,
      width,
    ]
  );

  /** Set the canvas width + height to viewport width + height */
  useEffect(() => {
    ref.current?.setAttribute('width', `${width}px`);
    ref.current?.setAttribute('height', `${height}px`);
  }, [height, width]);

  /** Pressing esc once will stop drawing;
  Pressing it a second time will clear the current points. */
  useEffect(() => {
    const escEventHandler = (e: KeyboardEvent) => {
      if (e.code !== 'Escape') return;
      if (drawing) return setDrawing(false);
      setPoints([]);
    };

    document.addEventListener('keydown', escEventHandler);
    return () => document.removeEventListener('keydown', escEventHandler);
  }, [drawing, setDrawing, setPoints]);

  return (
    <canvas
      ref={ref}
      className='draw-canvas'
      onClick={canvasClickHandler}
      onDoubleClick={canvasDoubleClickHandler}
      onMouseMove={canvasMouseMoveHandler}
    />
  );
};

export default DrawCanvas;
