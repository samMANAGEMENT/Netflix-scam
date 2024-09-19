import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './Spinner.css';


function Spinner() {
  return (
    <div className="spinner-container">
      <ClipLoader className='bg-black' size={50} />
    </div>
  );
}

export default Spinner;
