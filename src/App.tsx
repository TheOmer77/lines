import { useState } from 'react';

import LineCanvas from './components/LineCanvas';
import DrawCanvas from './components/DrawCanvas';
import type { Line } from './types';
import PointsDisplay from './components/PointsDisplay';

const App = () => {
  const [points, setPoints] = useState<Line>([]);
  const [drawing, setDrawing] = useState(false);

  return (
    <>
      <PointsDisplay points={points} />
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
