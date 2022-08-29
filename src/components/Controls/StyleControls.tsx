import { Dispatch, SetStateAction } from 'react';
import type { StyleProperties } from '../../types';

const StyleControls = ({
  style,
  setStyle,
}: {
  style: StyleProperties;
  setStyle: Dispatch<SetStateAction<StyleProperties>>;
}) => {
  return (
    <>
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
    </>
  );
};

export default StyleControls;
