import React, { useState } from 'react';
// import axios from 'axios';
import LandingPage from './landingPage';
import StartStory from './startStory';
import AddToStory from './addToStory';
import ViewStory from './viewStory';
import Navbar from './navbar';
import EnterClass from './enterClass';
import NameForm from './nameForm';
import PartForm from './partForm';

export default function App() {
  const [view, setView] = useState('landingPage');
  const [storyToView, setViewStory] = useState({});
  const [className, setClass] = useState('');
  const [classID, setID] = useState(null);
  const [incompleteStory, setIncomplete] = useState({});
  const [partToAdd, setPart] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [modulOn, setModul] = useState(false);

  if (view === 'viewStory') {
    return (
    <>
        <Navbar changeView={setView} className={className} setClass={setClass} />
      <ViewStory story={storyToView} changeView={setView} setStoryBack = {setViewStory} />
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
        <AddToStory setAuthor={setAuthor} changeView={setView} className={className} classID={classID} setIncomplete={setIncomplete} setPart={setPart} setModul={setModul} modulOn={modulOn} />
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
  if (view === 'nameForm') {
    return (
      <>
        <Navbar changeView={setView} className={className} setClass={setClass} />
        <NameForm author={newAuthor} changeView={setView} className={className} classID={classID} story={incompleteStory} />
        <div style={{ height: '4rem' }}></div>
      </>
    );
  }
  if (view === 'partForm') {
    return (
      <>
        <Navbar changeView={setView} className={className} setClass={setClass} />
        <PartForm setPart={setPart} setAuthor={setAuthor} part={partToAdd} changeView={setView} className={className} classID={classID} story={incompleteStory} setModul={setModul} />
        <div style={{ height: '4rem' }}></div>
      </>
    );
  }
}
