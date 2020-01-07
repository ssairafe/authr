import React, { useState } from 'react';
// import axios from 'axios';
import LandingPage from './landingPage';
import StartStory from './startStory';

export default function App() {
  const [view, setView] = useState('landingPage');

  if (view === 'landingPage') {
    return <LandingPage changeView={setView} />;
  }
  if (view === 'startStory') {
    return <StartStory changeView={setView} />;
  }

  if (view === 'addToStory') {
    return (
      <div>
        This is a story.. add to it here
        <button onClick={() => {
          setView('landingPage');
        }}>return</button>
      </div>
    );
  }
}
