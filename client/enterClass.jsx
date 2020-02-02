import React, { useState } from 'react';
import axios from 'axios';

export default function EnterClass(props) {
  const [className, setClass] = useState('');

  const fetchData = async () => {
    const result = await axios.get('/api/class/id', {
      params: {
        className: className
      }
    });
    if (result.data.length === 0) {
      alert('No such class exists');
    } else {
      let classObj = result.data[0];
      props.setClass(className);
      props.setID(classObj.classID);
      await props.changeView('landingPage');
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    fetchData();
  };

  return (
    <>
    <div style={{ height: '6rem' }}></div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-1">
          <button type="button" className="btn btn-outline-success" onClick={() => { props.changeView('landingPage'); }}>Home</button>
        </div>
      </div>
      <div style={{ height: '4rem' }}></div>
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
