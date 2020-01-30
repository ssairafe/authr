import React, { useState } from 'react';

export default function EnterClass(props) {
  const [className, setClass] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    props.setClass(className);
    props.changeView('landingPage');
  };

  return (
    <>
    <div style={{ height: '6rem' }}></div>
    <div className="container-fluid">
      <form onSubmit={handleSubmit} id="form3">
        <label>
          Class Name:
          <input
            type="text"
            minLength='3'
            defaultValue=""
            onChange={e => setClass({ className: e.target.value })}
            placeholder={'Class Name'}
          />
        </label>
        <button type="submit" className="btn btn-outline-success" form="form3" value="Submit">Submit</button>
      </form>
    </div>
    </>
  );

}
