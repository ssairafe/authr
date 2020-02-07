import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddToStory(props) {
  const [incompleteStory, setStory] = useState({});

  const fetchData = async () => {
    if (props.className) {
      try {
        const result = await axios.get('/api/incompleteStories',
          {
            params: props.classID
          });
        await setStory({
          ...result.data
        });
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const result = await axios.get('/api/incompleteStories');
        await setStory({
          ...result.data
        });
      } catch (error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    props.setIncomplete({});
    setStory({});
    fetchData();
  }, []);

  function acceptStory() {
    let length = (Object.keys(incompleteStory).length - 4) / 2 + 1;

    for (let i = 1; i < length; i++) {
      if (incompleteStory['author' + i] === '' && incompleteStory['part' + i] === '') {
        props.setPart('part' + i);
        props.setAuthor('author' + i);
        break;
      }
    }
    props.setIncomplete(incompleteStory);
    props.changeView('nameForm');
  }

  let incompleteStoryElement =
    <div className="card incompleteStoryCard" key={incompleteStory.storyID}>
      <div className="card-body">
        <h2 className="card-title">{incompleteStory.title}</h2>
        <p className="card-text"><small className="text-muted">By: {incompleteStory.author1 + ', ' + incompleteStory.author2 + ', ' + incompleteStory.author3 + ', ' + incompleteStory.author4}</small></p>
        <p className="card-text finishedStoryPart ">{incompleteStory.part1}</p>
      </div>
    </div>;

  const modul =
    <div className="container-fluid">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>Your part has been submitted!</p>
            <hr></hr>
            <p>You can select another story to add to, or go Home</p>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>;

  return (
      <>
        <div style={{ height: '130px' }}></div>
        <div className="container">
          {props.modulOn ? modul : null}
          <div className="row" id='finishedStoriesRow'>
            <div className="col-12">
              <h1 id='finishedStoriesHeader'>Select a Story</h1>
              {incompleteStoryElement}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="button" className="btn btn-outline-success selectStoryButtons" onClick={() => { props.setModul(false); props.changeView('landingPage'); }}>Home</button>
              <button type="button" className="btn btn-outline-success selectStoryButtons" onClick={() => { fetchData(); }}>Another Story</button>
              <button type="button" className="btn btn-outline-success selectStoryButtons" onClick={() => { acceptStory(); props.setModul(false); }}>Accept Story</button>
            </div>
          </div>
        </div>
      </>
  );
}
