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

  const handleSubmit = evt => {
    evt.preventDefault();
    axios({
      method: 'patch',
      url: '/api/incompleteStories',
      data: {
        incompleteStory,
        partToAdd,
        newAuthor
      }
    });
  };

  if (partToAdd !== '' && newAuthor !== '') {
    let part = partToAdd;
    let author = newAuthor;

    return (
    <>
      <Navbar />
      <div style={{ height: '130px' }}></div>
        <div className="container">
          <div className="row">
            <form onSubmit={handleSubmit} id="form1">
              <label>
                Name:
                <input
                  type="text"
                  defaultValue=""
                  onChange={e => setStory({ ...incompleteStory, [author]: e.target.value })}
                  placeholder={'First Last'}
                />
              </label>
              <label>
                Part
                <textarea
                  type="text"
                  defaultValue=""
                  onChange={e => setStory({ ...incompleteStory, [part]: e.target.value })}
                />
              </label>
              <button type="submit" form="form1" value="Submit">Submit</button>
            </form>
          </div>
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
