import React from 'react';
import './Rocket.css';
import image from './assets/rocket.png';

const Rocket = () => {
    return (

        <div className='rocket-component'>
            <div className='rocket-container'>
            <img src={image} className='rocket-img' alt='rocket' />
            <p id='rocket-heading'>Launching New Module Soon!</p>
            </div>
            <div className='rocket-content'>
                <p>Exciting things are in the works! We're currently <b>Crafting a new feature</b> for you.</p>
                <p>Keep an eye out for updates-We're working to make it available soon!</p>
            </div>
            <div className='timer-head'><b>GET READY FOR THE REVEAL</b></div>
            
        </div>

    );
};

export default Rocket;