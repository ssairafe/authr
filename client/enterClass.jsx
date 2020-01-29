import React, { useState } from 'react';
import axios from 'axios';

export default function EnterClass(props) {
  const [className, setClass] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    axios({
      method: 'post',
      url: '/api/class',
      data: {
        className
      }
    });
  };

}
