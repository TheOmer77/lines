import type { Line } from '../types';

const PointsDisplay = ({ points }: { points: Line }) => {
  return (
    <div className='points'>
      <pre>
        {points.length
          ? `[
${points.map(([x, y]) => `  [${x}, ${y}]`).join(', \n')}
]`
          : '[]'}
      </pre>
    </div>
  );
};

export default PointsDisplay;
