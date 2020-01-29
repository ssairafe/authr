import React, { useState } from 'react';
import axios from 'axios';

export default function StartStory(props) {
  const [newStory, setStory] = useState({
    title: '',
    author1: '',
    part1: ''
  });
  const [modulOn, setModul] = useState(false);
  const [charactersRemaining, setCharachters] = useState(2500);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (newStory.part1.length < 1) {
      return;
    }
    axios({
      method: 'post',
      url: '/api/stories',
      data: {
        newStory
      }
    });
    setModul(true);
    document.getElementById('form1').reset();
  };

  const modul =
      <div className="container-fluid" style={{ marginTop: '2%' }}>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Well done!</h4>
              <p>Your story has been submitted!</p>
              <hr></hr>
              <p>You can go back Home or start another story</p>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>;

  return (
    <>
      <div style={{ height: '130px' }}></div>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <button type="button" className="btn btn-outline-success" onClick={() => { props.changeView('landingPage'); }}>Home</button>
          </div>
          {modulOn ? modul : null}
          <div className="col-10" id="startStoryHeader"></div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10" id="startStoryHeader">Start Your Story</div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <form onSubmit={handleSubmit} id="form1">
              <label>
                Name:
                <input
                  minLength='6'
                  type="text"
                  defaultValue=""
                  onChange={e => setStory({ ...newStory, author1: e.target.value })}
                  placeholder={'First-Name Last-Name'}
                />
              </label>
              <label>
                Title
                <input
                  minLength='3'
                  type="text"
                  defaultValue=""
                  onChange={e => setStory({ ...newStory, title: e.target.value })}
                />
              </label>
              <label>
                Part
                <textarea
                  maxLength='2500'
                  minLength='500'
                  type="text"
                  defaultValue=""
                  onChange={e => {
                    setStory({ ...newStory, part1: e.target.value });
                    setCharachters((2500 - newStory.part1.length) - 1);
                  }}
                />
              </label>
              <p>Characters Remaining:{charactersRemaining}</p>
              <button type="submit" className="btn btn-outline-success" form="form1" value="Submit">Submit</button>
            </form>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
}
