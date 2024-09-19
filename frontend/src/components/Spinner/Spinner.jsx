import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './Spinner.css';


function Spinner() {
  return (
    <div className="spinner-container">
      <ClipLoader color="#e50914" size={50} />
    </div>
  );
}

export default Spinner;
