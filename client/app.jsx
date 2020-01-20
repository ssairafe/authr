import React, { useState } from 'react';
// import axios from 'axios';
import LandingPage from './landingPage';
import StartStory from './startStory';
import AddToStory from './addToStory';
import ViewStory from './viewStory';

export default function App() {
  const [view, setView] = useState('landingPage');
  const [storyToView, setViewStory] = useState({});

  if (view === 'viewStory') {
    return <ViewStory story={storyToView} changeView={setView} />;
  }
  if (view === 'landingPage') {
    return <LandingPage setStory={setViewStory} changeView={setView} />;
  }
  if (view === 'startStory') {
    return <StartStory changeView={setView} />;
  }

  if (view === 'addToStory') {
    return <AddToStory changeView={setView} />;
  }
}
