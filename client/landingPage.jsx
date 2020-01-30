import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LandingPage(props) {
  const [finishedStories, setStories] = useState([]);
  const [className, setClass] = useState('');

  const fetchData = async classToUse => {
    if (props.className) {
      console.log(classToUse);
      const result = await axios.get('/api/class', {
        data: classToUse
      });
      await setStories([
        ...result.data
      ]);
    } else {
      const result = await axios(
        '/api/stories'
      );
      await setStories([
        ...result.data
      ]);
    }
  };

  useEffect(() => {
    setClass(props.className.className);
    fetchData(props.className);
  }, []);

  function findElementsStory(id) {
    let storyId = null;
    for (let i = 0; i < finishedStories.length; i++) {
      for (const key in finishedStories[i]) {
        if (key === 'storyID' && finishedStories[i][key] === id) {
          storyId = finishedStories[i];
        }
      }
    }
    return storyId;
  }

  let finishedStoryElements = finishedStories.map(story => {
    return (
      <div className="card finishedStoryCard" onClick={() => {
        props.setStory(findElementsStory(story.storyID));
        props.changeView('viewStory');
      }} key={story.storyID}>
        <div className="card-body">
          <h2 className="card-title">{story.title}</h2>
          <p className="card-text"><small className="text-muted">By: {story.author1 + ', ' + story.author2 + ', ' + story.author3 + ', ' + story.author4}</small></p>
          <p className="card-text finishedStoryPart ">{story.part1 }...</p>
        </div>
      </div>
    );
  });

  return (
      <>
        <div style={{ height: '130px' }}></div>
        <div className="container">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6" style={{ textAlign: 'center' }}>
              <button type="button" className="btn btn-outline-success" onClick={() => { props.changeView('startStory'); }}>Start Story</button>
              <br></br>
              <span id='homePageOr'>Or</span>
              <br></br>
              <button type="button" className="btn btn-outline-success" onClick={() => { props.changeView('addToStory'); }}>Add to Story</button>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row" id='finishedStoriesRow'>
            <div className="col-12">
              <h1 id='finishedStoriesHeader'>Finished Stories</h1>
              {finishedStoryElements}
            </div>
          </div>
        </div>
      </>
  );
}
