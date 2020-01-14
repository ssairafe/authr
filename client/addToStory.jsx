import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default function AddToStory(props) {
  const [incompleteStory, setStory] = useState({});
  const [partToAdd, setPart] = useState('');
  const [newAuthor, setAuthor] = useState('');

  const fetchData = async () => {
    const result = await axios(
      '/api/incompleteStories'
    );
    setStory({
      ...result.data
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let incompleteStoryElement =
  <div className="container">
    <div className="row">
      <div key={incompleteStory.storyID}>
        <h3>{incompleteStory.title}</h3>
        <div>
          <h6>{incompleteStory.author1 + ', ' + incompleteStory.author2 + ', ' + incompleteStory.author3 + ', ' + incompleteStory.author4}</h6>
        </div>
        <p>{incompleteStory.part1 + ' ' + incompleteStory.part2 + ' ' + incompleteStory.part3 + ' ' + incompleteStory.part4 + ' '}</p>
      </div>
    </div>
  </div>;

  function acceptStory() {
    for (let i = 0; i < 5; i++) {
      if (incompleteStory['author' + i] === '' && incompleteStory['part' + i] === '') {
        setPart('part' + i);
        setAuthor('author' + i);
        break;
      }
    }
  }

  if (partToAdd !== '' && newAuthor !== '') {
    return (
    <>
      <Navbar />
      <div style={{ height: '130px' }}></div>
      <div>
        Accepted story! You are {newAuthor} for {partToAdd}
        <button onClick={() => { props.changeView('landingPage'); }}>Home</button>
      </div>
      </>
    );
  } else {
    return (
    <>
      <Navbar />
      <div style={{ height: '130px' }}></div>
      {incompleteStoryElement}
      <button onClick={() => { props.changeView('landingPage'); }}>Home</button>
      <button onClick={() => { fetchData(); }}>Another Story</button>
      <button onClick={() => { acceptStory(); }}>Accept Story</button>
    </>
    );
  }
}
