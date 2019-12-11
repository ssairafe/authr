import React from 'react';

export default function LandingPage(props) {
  return (
    <div>
      <button onClick={() => { props.changeView('writersBlock'); }}>click me</button>
    </div>
  );
}
