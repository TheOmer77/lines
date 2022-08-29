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
      <h2 className='section-header user-select-none'>Points</h2>
      <div className='points'>
        {points.length ? (
          points.map((point, index) => (
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
          ))
        ) : (
          <span className='text-secondary user-select-none'>
            No points added yet.
          </span>
        )}
      </div>

      <h2 className='section-header user-select-none'>Instructions</h2>
      <ul className='text-secondary list user-select-none'>
        <li>Click anywhere to add a point.</li>
        <li>Double click or press Esc to stop drawing.</li>
        <li>Press Esc a second time to clear the screen.</li>
      </ul>
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
