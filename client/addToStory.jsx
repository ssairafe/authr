import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddToStory(props) {
  const [incompleteStory, setStory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/api/incompleteStories'
      );

      setStory({
        ...result.data
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <div>`{incompleteStory + ''}`</div>
      <button onClick={() => { props.changeView('landingPage'); }}>Home</button>
    </>
  );
}
