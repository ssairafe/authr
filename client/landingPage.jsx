import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LandingPage(props) {
  const [finishedStories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/api/stories'
      );
      await setStories([
        result.data
      ]);
    };

    fetchData();
  }, []);

  let finishedStoryElements = finishedStories.map(story => {
    return (
      <div key={story.storyID}>
        <h3>{story.title}</h3>
        <ul>
          <li>{story.creator}</li>
          <li>{story.author1}</li>
          <li>{story.author2}</li>
          <li>{story.author3}</li>
        </ul>
        <p>{story.part1 + ' ' + story.part2 + ' ' + story.part3 + ' ' + story.part4 + ' '}</p>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6" style={{ textAlign: 'center' }}>
          <button onClick={() => { props.changeView('startStory'); }}>Start Story</button>
          <button onClick={() => { props.changeView('addToStory'); }}>Add to Story</button>
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row">
        <div className="col-12">
          <h1>Finished Stories</h1>
          {finishedStoryElements}
        </div>
      </div>
    </div>
  );
}
