import { Dispatch, SetStateAction, useCallback } from 'react';
import type { Line } from '../types';

const PointsDisplay = ({
  points,
  setPoints,
}: {
  points: Line;
  setPoints: Dispatch<SetStateAction<Line>>;
}) => {
  const handlePointChange = useCallback(
    (pointAxis: 0 | 1, pointIndex: number, value: number) =>
      setPoints(prev =>
        prev.map((point, index) =>
          pointIndex === index
            ? pointAxis === 1
              ? [point[0], value]
              : [value, point[1]]
            : point
        )
      ),
    [setPoints]
  );

  return (
    <div className='points-display'>
      <h2 className='section-header'>Points</h2>
      {!points.length ? (
        <span className='text-secondary'>Click anywhere to add a point.</span>
      ) : (
        <div className='points'>
          {points.map((point, index) => (
            <div key={index} className='point'>
              <input
                type='number'
                value={point[0]}
                onChange={e =>
                  handlePointChange(0, index, Number(e.target.value))
                }
              ></input>
              <input
                type='number'
                value={point[1]}
                onChange={e =>
                  handlePointChange(1, index, Number(e.target.value))
                }
              ></input>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* OLD UGLY VERSION
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
  */
};

export default PointsDisplay;
