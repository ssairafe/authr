import React from 'react';

export default function Navbar(props) {
  const exitClassFunction = () => {
    props.setClass('');
    props.changeView('landingPage');
  };

  const exitClass = <button type="button" className="btn btn-outline-success align-right" onClick={exitClassFunction}>Exit Class</button>;

  const enterClass = <button type="button" className="btn btn-outline-success align-right" onClick={() => { props.changeView('enterClass'); }}>Enter A Class</button>;

  return (
    <nav className="myNav navbar navbar-light bg-grey fixed-top" >
      <div className="logoBox navbar-brand" href="#">
        <h1 className="logo d-inline-block align-top" alt="">
          authr
        </h1>
      </div>
      {
        props.className ? exitClass : enterClass
      }
    </nav>
  );
}
