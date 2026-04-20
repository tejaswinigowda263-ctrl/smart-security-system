import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function App() {
  // LOGIN (LEVEL 4)
  const [loggedIn, setLoggedIn] = useState(false);

  // ALERT SYSTEM (LEVEL 4)
  const [isSafe, setIsSafe] = useState(true);
  const [popup, setPopup] = useState("");

  // SENSORS (LEVEL 2 + 3)
  const [temperature, setTemperature] = useState(28);
  const [motion, setMotion] = useState(false);
  const [smoke, setSmoke] = useState(false);

  // CAMERA SIMULATION (LEVEL 4)
  const [time, setTime] = useState(0);

  // GRAPH (LEVEL 5)
  const [data, setData] = useState([]);

  // LOGIN
  const handleLogin = () => setLoggedIn(true);

  // ALERT SYSTEM
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSafe(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isSafe) {
      setPopup("⚠ Intruder Detected!");
      setTimeout(() => setPopup(""), 3000);
    }
  }, [isSafe]);

  // SENSOR + GRAPH UPDATE (LEVEL 5 ADDED HERE)
  useEffect(() => {
    const interval = setInterval(() => {
      const temp = Math.floor(25 + Math.random() * 10);

      setTemperature(temp);
      setMotion(Math.random() > 0.5);
      setSmoke(Math.random() > 0.8);

      setData(prev => {
        const updated = [...prev, { time: Date.now(), temp }];
        return updated.slice(-10);
      });

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // CAMERA TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // LOGIN SCREEN (LEVEL 4)
  if (!loggedIn) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h2>Smart Security Login</h2>
          <input placeholder="Username" style={styles.input} />
          <input placeholder="Password" type="password" style={styles.input} />
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // DASHBOARD (LEVEL 1–5 COMBINED)
  return (
    <div style={styles.page}>

      {/* STATUS BAR */}
      <div style={{
        background: isSafe ? "green" : "red",
        color: "white",
        padding: "10px",
        textAlign: "center",
        fontWeight: "bold"
      }}>
        {isSafe ? "SYSTEM SAFE" : "DANGER ALERT ACTIVE"}
      </div>

      {/* POPUP */}
      {popup && (
        <div style={styles.popup}>
          {popup}
        </div>
      )}

      <div style={{ display: "flex" }}>

        {/* SIDEBAR (LEVEL 3) */}
        <div style={styles.sidebar}>
          <h2>Security Panel</h2>
          <p>📊 Dashboard</p>
          <p>📷 Cameras</p>
          <p>🚨 Alerts</p>
          <p>⚙ Settings</p>
        </div>

        {/* MAIN */}
        <div style={styles.main}>

          <h1>Smart Security Dashboard</h1>

          {/* SENSOR CARDS */}
          <div style={styles.row}>

            <div style={styles.card}>
              <h3>Temperature</h3>
              <p>{temperature}°C</p>
            </div>

            <div style={styles.card}>
              <h3>Motion</h3>
              <p style={{ color: motion ? "red" : "green" }}>
                {motion ? "Detected" : "Normal"}
              </p>
            </div>

            <div style={styles.card}>
              <h3>Smoke</h3>
              <p style={{ color: smoke ? "red" : "green" }}>
                {smoke ? "Detected" : "Safe"}
              </p>
            </div>

          </div>

          {/* CAMERA (LEVEL 4) */}
          <div style={styles.panel}>
            <h3>Live Camera</h3>
            <div style={styles.camera}>
              CAMERA FEED: {time}
            </div>
          </div>

          {/* ALERT PANEL */}
          <div style={styles.panel}>
            <h3>Alerts</h3>
            <p style={{ color: isSafe ? "green" : "red", fontWeight: "bold" }}>
              {isSafe ? "System Normal" : "Intruder Detected"}
            </p>
          </div>

          {/* GRAPH (LEVEL 5 ADDED) */}
          <div style={styles.panel}>
            <h3>Temperature Graph</h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="blue" />
              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: { fontFamily: "Arial", background: "#f1f5f9", minHeight: "100vh" },

  loginPage: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },

  loginBox: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none"
  },

  sidebar: {
    width: "250px",
    background: "#111827",
    color: "white",
    padding: "20px"
  },

  main: {
    flex: 1,
    padding: "20px"
  },

  row: {
    display: "flex",
    gap: "15px"
  },

  card: {
    flex: 1,
    background: "white",
    padding: "15px",
    borderRadius: "10px"
  },

  panel: {
    marginTop: "20px",
    background: "white",
    padding: "15px",
    borderRadius: "10px"
  },

  camera: {
    height: "120px",
    background: "black",
    color: "lime",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "monospace"
  },

  popup: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "red",
    color: "white",
    padding: "10px",
    borderRadius: "8px"
  }
};