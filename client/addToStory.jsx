import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default function AddToStory(props) {
  const [incompleteStory, setStory] = useState({});
  const [partToAdd, setPart] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [modulOn, setModul] = useState(false);

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
    <div className="card incompleteStoryCard" key={incompleteStory.storyID}>
      <div className="card-body">
        <h2 className="card-title">{incompleteStory.title}</h2>
        <p className="card-text"><small className="text-muted">By: {incompleteStory.author1 + ', ' + incompleteStory.author2 + ', ' + incompleteStory.author3 + ', ' + incompleteStory.author4}</small></p>
        <p className="card-text finishedStoryPart ">{incompleteStory.part1}</p>
      </div>
    </div>;

  function acceptStory() {
    let length = (Object.keys(incompleteStory).length - 3) / 2 + 1;
    for (let i = 0; i < length; i++) {
      if (incompleteStory['author' + i] === '' && incompleteStory['part' + i] === '') {
        setPart('part' + i);
        setAuthor('author' + i);
        break;
      }
    }
  }

  const modul =
    <div className="container-fluid">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>Your part has been submitted!</p>
            <hr></hr>
            <p>You can select another story to add to, or go Home</p>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>;

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
    setAuthor('');
    setPart('');
    fetchData();
    setModul(true);
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
                <button type="submit" className="btn btn-outline-success" form="form2" value="Submit">Submit</button>
              </form>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </>
    );
  } else {
    return (
    <>
      <Navbar />
      <div style={{ height: '130px' }}></div>
      <div className="container">
        {modulOn ? modul : null}
        <div className="row" id='finishedStoriesRow'>
          <div className="col-12">
            <h1 id='finishedStoriesHeader'>Select a Story</h1>
            {incompleteStoryElement}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-outline-success selectStoryButtons" onClick={() => { props.changeView('landingPage'); }}>Home</button>
            <button type="button" className="btn btn-outline-success selectStoryButtons" onClick={() => { fetchData(); }}>Another Story</button>
            <button type="button" className="btn btn-outline-success selectStoryButtons" onClick={() => { acceptStory(); }}>Accept Story</button>
          </div>
        </div>
      </div>
    </>
    );
  }
}
