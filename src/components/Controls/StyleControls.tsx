import { Dispatch, SetStateAction } from 'react';
import LabeledInput from '../general/LabeledInput';
import type { StyleProperties } from '../../types';

const colorInputStyle = (color: string) => ({
  boxShadow: `inset 0 -0.25rem 0 0 ${color}`,
});

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
      <LabeledInput
        label='Point spacing'
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
      <LabeledInput
        label='Line width'
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
      <LabeledInput
        label='Point radius'
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
      <LabeledInput
        label='Line color'
        id='input-color-line'
        type='text'
        value={style.colors.line}
        onChange={e =>
          setStyle(prev => ({
            ...prev,
            colors: { ...prev.colors, line: e.target.value },
          }))
        }
        style={colorInputStyle(style.colors.line)}
      />
      <LabeledInput
        label='Point color'
        id='input-color-point'
        type='text'
        value={style.colors.point}
        onChange={e =>
          setStyle(prev => ({
            ...prev,
            colors: { ...prev.colors, point: e.target.value },
          }))
        }
        style={colorInputStyle(style.colors.point)}
      />
      <LabeledInput
        label='Temp Line color'
        id='input-color-tempLine'
        type='text'
        value={style.colors.tempLine}
        onChange={e =>
          setStyle(prev => ({
            ...prev,
            colors: { ...prev.colors, tempLine: e.target.value },
          }))
        }
        style={colorInputStyle(style.colors.tempLine)}
      />
      <LabeledInput
        label='Temp Point color'
        id='input-color-tempPoint'
        type='text'
        value={style.colors.tempPoint}
        onChange={e =>
          setStyle(prev => ({
            ...prev,
            colors: { ...prev.colors, tempPoint: e.target.value },
          }))
        }
        style={colorInputStyle(style.colors.tempPoint)}
      />
    </>
  );
};

export default StyleControls;
