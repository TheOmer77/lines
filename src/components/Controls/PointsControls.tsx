import { Dispatch, SetStateAction, useCallback } from 'react';
import type { Line } from '../../types';

const PointsControls = ({
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
    <>
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
    </>
  );
};

export default PointsControls;
