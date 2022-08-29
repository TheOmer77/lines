const Instructions = () => {
  return (
    <div className='instructions'>
      <h2 className='section-header user-select-none'>Instructions</h2>
      <ul className='text-secondary list user-select-none'>
        <li>Click anywhere to add a point.</li>
        <li>Double click or press Esc to stop drawing.</li>
        <li>Press Esc a second time to clear the screen.</li>
      </ul>
    </div>
  );
};

export default Instructions;
