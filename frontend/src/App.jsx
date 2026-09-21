import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date());
  const [alarm, setAlarm] = useState("");
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    fetch("http://localhost:5000/api/health")
      .then((response) => response.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus("Backend unavailable"));

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>⏰ Alarm Clock</h1>

      <h2>{time.toLocaleTimeString()}</h2>

      <p>{time.toLocaleDateString()}</p>

      <hr />

      <h3>Set Alarm</h3>

      <input
        type="time"
        value={alarm}
        onChange={(e) => setAlarm(e.target.value)}
      />

      <button style={{ marginLeft: "10px" }}>
        Set Alarm
      </button>

      <p>Backend: {status}</p>
    </div>
  );
}

export default App;