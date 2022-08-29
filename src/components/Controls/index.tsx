import { Dispatch, SetStateAction } from 'react';
import type { Line, StyleProperties } from '../../types';
import PointsControls from './PointsControls';
import StyleControls from './StyleControls';

const Controls = ({
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
  return (
    <div className='controls-panel'>
      <PointsControls points={points} setPoints={setPoints} />
      <StyleControls style={style} setStyle={setStyle} />
    </div>
  );
};

export default Controls;
