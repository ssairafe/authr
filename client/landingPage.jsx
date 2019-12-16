import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LandingPage(props) {
  const [finishedStories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(setStories);
      const result = await axios(
        '/api/stories'
      );
      setStories(result.data);
    };
    fetchData();
    console.log(finishedStories);
  }, []);

  return (
    <div>
      <button onClick={() => { props.changeView('startStory'); }}>Start Story</button>
      <button onClick={() => { props.changeView('addToStory'); }}>Add to Story</button>
    </div>
  );
}
