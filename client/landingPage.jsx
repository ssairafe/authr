import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default function LandingPage(props) {
  const [finishedStories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/api/stories'
      );
      await setStories([
        ...result.data
      ]);
    };

    fetchData();
  }, []);

  let finishedStoryElements = finishedStories.map(story => {
    return (
      <div key={story.storyID}>
        <h3>{story.title}</h3>
        <div>
          <h6>{story.author1 + ', ' + story.author2 + ', ' + story.author3 + ', ' + story.author4}</h6>
        </div>
        <p>{story.part1 + ' ' + story.part2 + ' ' + story.part3 + ' ' + story.part4 + ' '}</p>
      </div>
    );
  });

  return (
  <>
  <Navbar/>
  <div style={{ height: '130px' }}></div>
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6" style={{ textAlign: 'center' }}>
          <button type="button" className="btn btn-outline-success" onClick={() => { props.changeView('startStory'); }}>Start Story</button>
          <br></br>
          <span id= 'homePageOr'>Or</span>
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
