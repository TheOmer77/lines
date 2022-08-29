import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useWindowSize from './hooks/useWindowSize';
import { drawLine, drawPoint } from './utils/canvasUtils';
import getPointsForLine from './utils/getPointsForLine';
import { spacing } from './constants/defaults';

import type { Line } from './types';

const App = () => {
  const { width, height } = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null),
    drawCanvasRef = useRef<HTMLCanvasElement>(null);

  const [points, setPoints] = useState<Line>([]);
  const [drawing, setDrawing] = useState(false);

  /** Click will add the clicked position as a point to points */
  const canvasClickHandler: MouseEventHandler = useCallback(
    ({ clientX, clientY }) => {
      if (!drawing) {
        setDrawing(true);
        if (points.length) return;
      }
      setPoints(prev => [...prev, [clientX, clientY]]);

      if (!drawCanvasRef.current || !width || !height) return;
      drawCanvasRef.current.getContext('2d')?.clearRect(0, 0, width, height);
    },
    [drawing, height, points.length, width]
  );

  /** Double click will stop drawing */
  const canvasDoubleClickHandler = useCallback(
    () => drawing && setDrawing(false),
    [drawing]
  );

  /** Draw the line that the user is about to draw */
  const canvasMouseMoveHandler: MouseEventHandler = useCallback(
    ({ clientX, clientY }) => {
      const drawCanvas = drawCanvasRef.current;

      if (!drawCanvas || !width || !height) return;
      drawCanvas.getContext('2d')?.clearRect(0, 0, width, height);

      if (!drawing || !points.length) return;

      drawLine(drawCanvas, points[points.length - 1], [clientX, clientY], {
        strokeStyle: '#d1d1d1',
      });
      getPointsForLine(
        points[points.length - 1],
        [clientX, clientY],
        spacing
      ).forEach(point =>
        drawPoint(drawCanvas, point, { fillStyle: '#949494' })
      );
    },
    [drawing, height, points, width]
  );

  /** Set the canvas width + height to viewport width + height */
  useEffect(() => {
    canvasRef.current?.setAttribute('width', `${width}px`);
    canvasRef.current?.setAttribute('height', `${height}px`);

    drawCanvasRef.current?.setAttribute('width', `${width}px`);
    drawCanvasRef.current?.setAttribute('height', `${height}px`);
  }, [height, width]);

  /** Draw the lines that the user has drawn, from points state */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (points.length === 1) return drawPoint(canvas, points[0]);

    // Draw lines first
    points
      .map((vert, index) => [vert, points[index + 1]])
      .forEach(
        ([p1, p2]) =>
          p2 &&
          drawLine(canvas, p1, p2, { strokeStyle: '#a3adff', lineWidth: 4 })
      );

    // Then draw points
    points
      .map((vert, index) => [vert, points[index + 1]])
      .forEach(
        ([p1, p2]) =>
          p2 &&
          getPointsForLine(p1, p2, spacing).forEach(point =>
            drawPoint(canvas, point, { fillStyle: '#2954ff' })
          )
      );

    return () => {
      if (width && height)
        canvas?.getContext?.('2d')?.clearRect?.(0, 0, width, height);
    };
  }, [height, points, width]);

  /** Clear the drawing canvas when you stop drawing */
  useEffect(() => {
    if (drawing || !drawCanvasRef.current || !width || !height) return;
    drawCanvasRef.current.getContext('2d')?.clearRect(0, 0, width, height);
  }, [drawing, height, width]);

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
  }, [drawing]);

  return (
    <>
      <div className='points'>
        <pre>
          {points.length
            ? `[
${points.map(([x, y]) => `  [${x}, ${y}]`).join(', \n')}
]`
            : '[]'}
        </pre>
      </div>
      <canvas
        ref={drawCanvasRef}
        className='drawCanvas'
        onClick={canvasClickHandler}
        onDoubleClick={canvasDoubleClickHandler}
        onMouseMove={canvasMouseMoveHandler}
      ></canvas>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default App;
