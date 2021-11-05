import React, { useState, useEffect } from "react";

const Timer = ({ hoursMinSecs }) => {
  let { hours, minutes, seconds } = hoursMinSecs;
  const [pause, setPause] = useState(false);
  const [music, setMusic] = useState(false);
  const [minute, setMinute] = useState(minutes);
  const [percentage, setPercentage] = useState(0);

  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const trackProgress = () => {
    let totalTime = +hours * 3600 + +minute * 60 + +seconds;
    let timeRemaining = +hrs * 3600 + +mins * 60 + +secs;
    let newPercentage = ((totalTime - timeRemaining) / totalTime) * 100;
    setPercentage(newPercentage);
    if (newPercentage === 100) {
      playMusic();
    }
    //console.log(percentage);
  };

  const reset = () => {
    setTime([+hours, +minutes, +seconds]);
    setPause(true);
  };

  const addMin = () => {
    setTime([hrs, mins + 1, secs]);
    setMinute(minute + 1);
    // console.log(minute);
  };

  const playMusic = () => {
    setMusic(true);
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };

  useEffect(() => {
    var timerId;
    if (pause) {
      timerId = setInterval(() => {
        tick();
      }, 1000);

      trackProgress();
      // let timeRemaining = hrs * 3600 + mins * 60 + secs;
      // console.log(timeRemaining);
    }

    return () => clearInterval(timerId);
  });

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
