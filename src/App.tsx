import { useState } from 'react';

import LineCanvas from './components/LineCanvas';
import DrawCanvas from './components/DrawCanvas';
import Controls from './components/Controls';
import Instructions from './components/Instructions';

import { spacing, lineWidth, radius, colors } from './constants/defaults';
import type { Line, StyleProperties } from './types';

const App = () => {
  const [points, setPoints] = useState<Line>([]);
  const [drawing, setDrawing] = useState(false);
  const [style, setStyle] = useState<StyleProperties>({
    spacing,
    lineWidth,
    radius,
    colors,
  });

  return (
    <>
      <Instructions />
      <Controls
        points={points}
        setPoints={setPoints}
        style={style}
        setStyle={setStyle}
      />
      <DrawCanvas
        points={points}
        setPoints={setPoints}
        drawing={drawing}
        setDrawing={setDrawing}
        style={style}
      />
      <LineCanvas points={points} style={style} />
    </>
  );
};

export default App;
