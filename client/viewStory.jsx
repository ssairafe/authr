import React from 'react';
import Navbar from './navbar';

export default function ViewStory(props) {
  return (
    <>
    <Navbar />
      <div style={{ height: '130px' }}></div>
    <div className="container">
      <div className="card finishedStoryView">
        <div className="card-body">
          <h2 className="card-title">{props.story.title}</h2>
          <p className="card-text"><small className="text-muted">By: {props.story.author1 + ', ' + props.story.author2 + ', ' + props.story.author3 + ', ' + props.story.author4}</small></p>
          <p className="card-text finishedStoryPart ">{props.story.part1}</p>
          <p className="card-text finishedStoryPart ">{props.story.part2}</p>
          <p className="card-text finishedStoryPart ">{props.story.part3}</p>
          <p className="card-text finishedStoryPart ">{props.story.part4}</p>
        </div>
      </div>
      <button type="button" className="btn btn-outline-success" style={{ marginBottom: '2%' }} onClick={() => { props.changeView('landingPage'); }}>Home</button>
    </div>
    </>
  );
}