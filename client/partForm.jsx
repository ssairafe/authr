import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PartForm(props) {
  const [incompleteStory, setStory] = useState({});
  const [partToAdd, setPart] = useState('');
  const [charactersRemaining, setCharachters] = useState(2500);

  useEffect(() => {
    setStory(props.story);
    setPart(props.part);
  }, []);

  const handleSubmit = evt => {
    evt.preventDefault();
    axios({
      method: 'patch',
      url: '/api/incompleteStories',
      data: {
        incompleteStory,
        partToAdd,
        className: props.className
      }
    });
    props.setAuthor('');
    props.setPart('');
    props.setModul(true);
    props.changeView('addToStory');
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
          <div className="col-10" id="startStoryHeader">
            {incompleteStory.title}
            <div id="incompleteStoryBody">
              <p>{incompleteStory.part1}</p>
              <p>{incompleteStory.part2}</p>
              <p>{incompleteStory.part3}</p>
              <p>{incompleteStory.part4}</p>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <form onSubmit={handleSubmit} id="form2">
              <label>
                Part
                <textarea
                  maxLength='2500'
                  minLength='500'
                  type="text"
                  defaultValue=""
                  onChange={e => {
                    setStory({ ...incompleteStory, [partToAdd]: e.target.value });
                    setCharachters((2500 - incompleteStory[partToAdd].length) - 1);
                  }
                  }
                />
              </label>
              <p>Characters Remaining:{charactersRemaining}</p>
              <button type="submit" className="btn btn-outline-success" form="form2" value="Submit">Submit</button>
            </form>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
}
