import { Dispatch, SetStateAction, useCallback } from 'react';
import type { Line, StyleProperties } from '../types';

const PointsDisplay = ({
  points,
  setPoints,
  style,
  setStyle,
}: {
  points: Line;
  setPoints: Dispatch<SetStateAction<Line>>;
  style: StyleProperties;
  setStyle: Dispatch<SetStateAction<StyleProperties>>;
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
      {/* Points */}
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
      {/* Style */}
      <h2 className='section-header user-select-none'>Style</h2>
      <div className='labeled-input'>
        <label htmlFor='input-spacing'>Point spacing</label>
        <input
          id='input-spacing'
          type='number'
          value={style.spacing}
          onChange={e =>
            setStyle(prev => ({
              ...prev,
              spacing:
                e.target.value === '' || Number(e.target.value) < 1
                  ? 1
                  : Number(e.target.value),
            }))
          }
        />
      </div>
      <div className='labeled-input'>
        <label htmlFor='input-lineWidth'>Line width</label>
        <input
          id='input-lineWidth'
          type='number'
          value={style.lineWidth}
          onChange={e =>
            setStyle(prev => ({
              ...prev,
              lineWidth:
                e.target.value === '' || Number(e.target.value) < 1
                  ? 1
                  : Number(e.target.value),
            }))
          }
        />
      </div>
      <div className='labeled-input'>
        <label htmlFor='input-radius'>Point radius</label>
        <input
          id='input-radius'
          type='number'
          value={style.radius}
          onChange={e =>
            setStyle(prev => ({
              ...prev,
              radius:
                e.target.value === '' || Number(e.target.value) < 0
                  ? 0
                  : Number(e.target.value),
            }))
          }
        />
      </div>
    </div>
  );
};

export default PointsDisplay;
