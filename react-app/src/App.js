import React from 'react';
import BlobAnimation from './components/BlobAnimation';
import PageHead from './components/PageHead';
import Rocket from './components/Rocket';
//import React, { useState } from 'react';
import Timer from './components/Timer';
import './index.css'


function App() {
  return (

    <div className="App">
      <BlobAnimation />
      <PageHead />
      <Rocket />
      <Timer initialMinutes={10} initialSeconds={3} />
    </div>
  );
}

export default App;
