import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Timer.css'

const Timer = ({ initialMinutes = 0, initialSeconds = 0 }) => {
  const navigate = useNavigate();

  const getInitialTime = () => {
    const savedTime = localStorage.getItem('savedTime');
    if (savedTime) {
      return JSON.parse(savedTime);
    }
    return {
      hours: Math.floor(initialMinutes / 60),
      minutes: initialMinutes % 60,
      seconds: initialSeconds,
    };
  };

  const [time, setTime] = useState(getInitialTime);
  const [showCard, setShowCard] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timerInterval);
          setTimeout(() => {
            setConfettiVisible(true);
            setShowCard(true);
            setTimeout(() => navigate('/new-page'), 3000);
          }, 1000);
          return prevTime;
        }

        const newTime = { ...prevTime };
        if (seconds > 0) {
          newTime.seconds = seconds - 1;
        } else if (minutes > 0) {
          newTime.minutes = minutes - 1;
          newTime.seconds = 59;
        } else if (hours > 0) {
          newTime.hours = hours - 1;
          newTime.minutes = 59;
          newTime.seconds = 59;
        }

        localStorage.setItem('savedTime', JSON.stringify(newTime));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [navigate]);

  useEffect(() => {
    if (showCard) {
      localStorage.setItem('timerEnded', true);
      localStorage.removeItem('savedTime');
    }
  }, [showCard]);

  useEffect(() => {
    if (localStorage.getItem('timerEnded')) {
      navigate('/new-page');
    }
  }, [navigate]);

  return (
    <div className="timer-container">
      {!showCard ? (
        <div className="timer-display">
          {time.hours > 0 && <b>{String(time.hours).padStart(2, '0')}:</b>}
          <b>{String(time.minutes).padStart(2, '0')}:</b>
          <b>{String(time.seconds).padStart(2, '0')}</b>
        </div>
      ) : (
        <div className='cardDiv'>
          <div className="card-container">
            {confettiVisible && <Confetti />}
            <div className="card">
              <h1>We’re Live!</h1>
              <p>The module has been launched.</p>
              <button onClick={() => navigate('/new-page')}>Go to Module</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
