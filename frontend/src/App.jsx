import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const res = await axios.post("http://localhost:3000/shorten", {
        longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🔗 URL Shortener</h1>
      <p style={styles.subheading}>
        Paste your long URL and get a short link instantly.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="url"
          placeholder="https://example.com/your-long-url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          ✂️ Shorten URL
        </button>
      </form>

      {shortUrl && (
        <p style={styles.result}>
          ✅ Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            {shortUrl}
          </a>
        </p>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "30px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: "center",
    color: "#fff",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#ddd",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    padding: "12px",
    backgroundColor: "#646cff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  result: {
    marginTop: "20px",
    fontSize: "16px",
  },
  link: {
    color: "#91a7ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: "15px",
  },
};

export default App;
