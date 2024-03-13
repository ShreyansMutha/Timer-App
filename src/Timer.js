import React, { useState, useEffect } from "react";

const Timer = ({ hoursMinSecs }) => {
  const { hours, minutes, seconds } = hoursMinSecs;

  const [pause, setPause] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [minute, setMinute] = useState(minutes);
  const [percentage, setPercentage] = useState(0);
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  useEffect(() => {
    let timerId;
    if (pause) {
      timerId = setInterval(() => {
        tick();
      }, 1000);
      trackProgress();
    }

    return () => clearInterval(timerId);
  }, [pause, hrs, mins, secs]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      pauseTimer();
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const trackProgress = () => {
    const totalTime = hours * 3600 + minute * 60 + seconds;
    const timeRemaining = hrs * 3600 + mins * 60 + secs;
    const newPercentage = ((totalTime - timeRemaining) / totalTime) * 100;
    setPercentage(newPercentage);
    if (newPercentage === 100) {
      playMusic();
    }
  };

  const pauseTimer = () => {
    setPause(false);
    clearInterval();
  };

  const reset = () => {
    setTime([hours, minutes, seconds]);
    setPause(true);
  };

  const addMin = () => {
    setTime(prevState => {
      const [prevHrs, prevMins, prevSecs] = prevState;
      if (musicPlaying) {
        pauseMusic();
      }
      setMinute(prevMinute => prevMinute + 1);
      return [prevHrs, prevMins + 1, prevSecs];
    });
  };

  const playMusic = () => {
    setMusicPlaying(true);
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };

  const pauseMusic = () => {
    setMusicPlaying(false);
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.pause();
  };

  return (
    <div className="base">
      <div className="container">
        <audio className="audio-element">
          <source src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3" />
        </audio>
        <div
          className="circular-progress"
          style={{
            background: `conic-gradient(var(--primary-color) ${
              percentage * 3.6
            }deg, #eadcff ${percentage * 3.6}deg)`
          }}
        >
          <p
            onDoubleClick={reset}
            onClick={() => setPause(!pause)}
            className={`value-container ${!pause ? "flash" : ""}`}
          >
            {`${hrs.toString().padStart(2, "0")}:${mins
              .toString()
              .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
            <small className="percentage-block">{percentage.toFixed(2)}%</small>
          </p>
        </div>
        <p style={{ cursor: "default" }}>{`${hours
          .toString()
          .padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
        <button onClick={addMin} className="addMin">
          +1 Min
        </button>
      </div>
    </div>
  );
};

export default Timer;
