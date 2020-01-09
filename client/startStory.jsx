import React, { useState } from 'react';
// import axios from 'axios';

export default function StartStory(props) {
  const [newStory, setStory] = useState({
    title: '',
    creator: '',
    part1: ''
  });

  const handleSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          defaultValue= ""
          onChange={e => setStory({ ...newStory, creator: e.target.value })}
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
      <button type="submit" value="Submit" />
    </form>
      <button onClick={() => { props.changeView('landingPage'); }}>Home</button>
    </>
  );
}
