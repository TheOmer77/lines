import { useState } from 'react';

import LineCanvas from './components/LineCanvas';
import DrawCanvas from './components/DrawCanvas';
import PointsDisplay from './components/PointsDisplay';
import Instructions from './components/Instructions';

import type { Line } from './types';

const App = () => {
  const [points, setPoints] = useState<Line>([]);
  const [drawing, setDrawing] = useState(false);

  return (
    <>
      <Instructions />
      <PointsDisplay points={points} setPoints={setPoints} />
      <DrawCanvas
        points={points}
        setPoints={setPoints}
        drawing={drawing}
        setDrawing={setDrawing}
      />
      <LineCanvas points={points} />
    </>
  );
};

export default App;
