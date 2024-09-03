import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Timer.css';

function Timer(props) {
  const navigate = useNavigate();

  const getSavedTime = () => {
    const savedTime = localStorage.getItem('time');
    if (savedTime) {
      return JSON.parse(savedTime);
    } else {
      return {
        hours: Math.floor(props.initialMinutes / 60),
        minutes: props.initialMinutes % 60,
        seconds: props.initialSeconds,
      };
    }
  };

  const [time, setTime] = useState(getSavedTime);
  const [showCard, setShowCard] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        let newTime = { ...prevTime };

        if (newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
          clearInterval(interval);
          setTimeout(() => {
            setConfettiVisible(true);
            setShowCard(true);
            setTimeout(() => {
              navigate('/new-page');
            }, 3000);
          }, 1000);
          return newTime;
        }

        if (newTime.seconds > 0) {
          newTime.seconds -= 1;
        } else {
          if (newTime.minutes > 0) {
            newTime.minutes -= 1;
            newTime.seconds = 59;
          } else {
            if (newTime.hours > 0) {
              newTime.hours -= 1;
              newTime.minutes = 59;
              newTime.seconds = 59;
            }
          }
        }

        localStorage.setItem('time', JSON.stringify(newTime));
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  useEffect(() => {
    if (showCard) {
      localStorage.setItem('timerFinished', 'true');
      localStorage.removeItem('time');
    }
  }, [showCard]);

  useEffect(() => {
    if (localStorage.getItem('timerFinished') === 'true') {
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
        <div className="cardDiv">
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
}

export default Timer;
