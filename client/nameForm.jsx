import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NameForm(props) {
  const [incompleteStory, setStory] = useState(null);
  const [newAuthor, setAuthor] = useState('');

  useEffect(() => {
    setStory(props.story);
    setAuthor(props.author);
  }, []);

  const handleAuthorSubmit = evt => {
    evt.preventDefault();
    axios({
      method: 'patch',
      url: '/api/incompleteStories/author',
      data: {
        incompleteStory,
        newAuthor,
        className: props.className
      }
    });
    props.changeView('partForm');
  };

  return (
      <>
      <div style={{ height: '110px' }}></div>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <button type="button" className="btn btn-outline-success" onClick={() => { props.changeView('landingPage'); }}>Home</button>
          </div>
          <div className="col-10" id="startStoryHeader"></div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <form onSubmit={handleAuthorSubmit} id="form4">
              <label>
                Name:
                <input
                  type="text"
                  minLength='5'
                  defaultValue=""
                  onChange={e => setStory({ ...incompleteStory, [newAuthor]: e.target.value })}
                  placeholder={'First Last'}
                />
              </label>
              <button type="submit" className="btn btn-outline-success" form="form4" value="Submit">Submit</button>
            </form>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
      </>
  );
}
