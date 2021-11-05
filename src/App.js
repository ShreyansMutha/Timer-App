import "./styles.css";
import Timer from "./Timer";

function App() {
  const hoursMinSecs = { hours: 0, minutes: 0, seconds: 5 };

  return (
    <div className="App">
      <div className="Timer">
        <Timer hoursMinSecs={hoursMinSecs} />
      </div>
    </div>
  );
}

export default App;
