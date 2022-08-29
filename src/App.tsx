import { useState } from 'react';

import LineCanvas from './components/LineCanvas';
import DrawCanvas from './components/DrawCanvas';
import type { Line } from './types';

const App = () => {
  const [points, setPoints] = useState<Line>([]);
  const [drawing, setDrawing] = useState(false);

  return (
    <>
      <div className='points'>
        <pre>
          {points.length
            ? `[
${points.map(([x, y]) => `  [${x}, ${y}]`).join(', \n')}
]`
            : '[]'}
        </pre>
      </div>
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
