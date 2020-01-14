import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default function StartStory(props) {
  const [newStory, setStory] = useState({
    title: '',
    author1: '',
    part1: ''
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    axios({
      method: 'post',
      url: '/api/stories',
      data: {
        newStory
      }
    });
  };

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
                defaultValue= ""
                onChange={e => setStory({ ...newStory, author1: e.target.value })}
                placeholder={'First Last'}
              />
            </label>
            <label>
        Title
              <input
                type="text"
                defaultValue=""
                onChange={e => setStory({ ...newStory, title: e.target.value })}
              />
            </label>
            <label>
        Part 1
              <textarea
                type="text"
                defaultValue=""
                onChange={e => setStory({ ...newStory, part1: e.target.value })}
              />
            </label>
            <button type="submit" form="form1" value="Submit">Submit</button>
          </form>
        </div>
        <button onClick={() => { props.changeView('landingPage'); }}>Home</button>
      </div>
    </>
  );
}
