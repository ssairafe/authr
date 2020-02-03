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
  const [classID, setID] = useState(null);

  if (view === 'viewStory') {
    return (
    <>
        <Navbar changeView={setView} className={className} setClass={setClass} />
      <ViewStory story={storyToView} changeView={setView} />
      <div style={{ height: '4rem' }}></div>
    </>
    );
  }
  if (view === 'landingPage') {
    return (
    <>
        <Navbar changeView={setView} className={className} setClass={setClass}/>
        <LandingPage setStory={setViewStory} changeView={setView} className={className} />
        <div style={{ height: '4rem' }}></div>
    </>
    );
  }
  if (view === 'startStory') {
    return (
    <>
        <Navbar changeView={setView} className={className} setClass={setClass} />
        <StartStory changeView={setView} className={className} classID={classID} />
        <div style={{ height: '4rem' }}></div>
    </>
    );
  }

  if (view === 'addToStory') {
    return (
    <>
        <Navbar changeView={setView} className={className} setClass={setClass} />
        <AddToStory changeView={setView} className={className} classID={classID} />
        <div style={{ height: '4rem' }}></div>
   </>
    );
  }
  if (view === 'enterClass') {
    return (
      <>
        <Navbar changeView={setView} className={className} setClass={setClass}/>
        <EnterClass setClass={setClass} changeView={setView} setID={setID} />
        <div style={{ height: '4rem' }}></div>
      </>
    );
  }
}
