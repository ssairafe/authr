import React, { useState } from 'react';
// import axios from 'axios';
import LandingPage from './landingPage';
import StartStory from './startStory';
import AddToStory from './addToStory';
import ViewStory from './viewStory';
import Navbar from './navbar';
import EnterClass from './enterClass';

export default function App() {
  const [view, setView] = useState('landingPage');
  const [storyToView, setViewStory] = useState({});
  const [className, setClass] = useState('');

  if (view === 'viewStory') {
    return (
    <>
      <Navbar changeView={setView} />
      <ViewStory story={storyToView} changeView={setView} />
    </>
    );
  }
  if (view === 'landingPage') {
    return (
    <>
      <Navbar changeView={setView} />
        <LandingPage setStory={setViewStory} changeView={setView} className={className} />
    </>
    );
  }
  if (view === 'startStory') {
    return (
    <>
      <Navbar changeView={setView} />
        <StartStory changeView={setView} className={className} />
    </>
    );
  }

  if (view === 'addToStory') {
    return (
    <>
      <Navbar changeView={setView} />
        <AddToStory changeView={setView} className={className} />
   </>
    );
  }
  if (view === 'enterClass') {
    return (
      <>
        <Navbar changeView={setView} />
        <EnterClass setClass={setClass} changeView={setView} />
      </>
    );
  }
}
