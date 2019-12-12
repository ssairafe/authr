import React from 'react';

export default function LandingPage(props) {
  return (
    <div>
      <button onClick={() => { props.changeView('startStory'); }}>Start Story</button>
      <button onClick={() => { props.changeView('addToStory'); }}>Add to Story</button>
    </div>
  );
}
