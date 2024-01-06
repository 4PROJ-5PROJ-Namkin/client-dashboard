import React from 'react';
import '../styles/NotFound.css';


const NotFound = () => {
  return (
    <div className="flex">
        <div>
      <h2>404 Not Found</h2>
      <p>Aucune page à l'horizon, on continue de chercher.</p>
      
    </div>
        <div className="wrapper">
        <div className="board">
            <div className="round round-sm"></div>
            <div className="round round-md"></div>
            <div className="round round-lg"></div>
            <div className="line line-x"></div>
            <div className="line line-y"></div>
        </div>
        <div className="radar"></div>
        </div>
</div>
  );
};

export default NotFound;
