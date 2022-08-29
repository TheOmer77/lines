import {
  colors,
  lineWidth as defaultLineWidth,
  radius as defaultRadius,
} from '../constants/defaults';
import type { Point } from '../types';

export const drawLine = (
  canvas: HTMLCanvasElement,
  point1: Point,
  point2: Point,
  {
    strokeStyle = colors.line,
    lineWidth = defaultLineWidth,
  }: { fillStyle?: string; strokeStyle?: string; lineWidth?: number } = {}
) => {
  const ctx = canvas.getContext?.('2d');
  if (!canvas.getContext || !ctx) return;

  // Style properties
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  // Draw line
  ctx.beginPath();
  ctx.moveTo(point1[0], point1[1]);
  ctx.lineTo(point2[0], point2[1]);
  ctx.stroke();
};

export const drawPoint = (
  canvas: HTMLCanvasElement,
  point: Point,
  {
    fillStyle = colors.point,
    strokeStyle = 'transparent',
    lineWidth = 0,
    radius = defaultRadius,
  }: {
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;
    radius?: number;
  } = {}
) => {
  const ctx = canvas.getContext?.('2d');
  if (!canvas.getContext || !ctx) return;

  // Style properties
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  // Draw circle
  ctx.beginPath();
  ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI);
  ctx.fill();
  strokeStyle && lineWidth && ctx.stroke();
};
