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
    console.log(result.data);
    if (result.data.length === 0) {
      console.log('no class');
    } else {
      props.setClass(className);
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
