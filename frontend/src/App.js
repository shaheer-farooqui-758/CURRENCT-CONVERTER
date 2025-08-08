

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [converted, setConverted] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/currencies")
      .then((res) => {
        setCurrencies(res.data);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/convert", {
        params: { from, to, amount },
      });
      setConverted(res.data.result.toFixed(2));

      const record = {
        from,
        to,
        amount,
        result: res.data.result.toFixed(2),
        timestamp: new Date().toLocaleString(),
      };

      const newHistory = [record, ...history];
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    } catch (e) {
      alert("Conversion failed");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light py-4">
      <h2 className="text-center mb-4">💱 Currency Converter</h2>

      <div className="row w-100 shadow-lg rounded bg-white overflow-hidden" style={{ maxWidth: "900px" }}>
        <div className="col-md-6 p-4 border-end">

          <div className="row align-items-end mb-3">
            <div className="col-5">
              <label className="form-label">From:</label>
              <select
                className="form-select"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setConverted(null);
                }}
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-2 text-center">
              <button
                className="btn btn-outline-secondary mt-4"
                onClick={() => {
                  const temp = from;
                  setFrom(to);
                  setTo(temp);
                  setConverted(null);
                }}
                title="Swap currencies"
              >
                <i className="bi bi-arrow-left-right"></i>
              </button>
            </div>

            <div className="col-5">
              <label className="form-label">To:</label>
              <select
                className="form-select"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setConverted(null);
                }}
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setConverted(null);
              }}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert"}
          </button>

          {converted && (
            <div className="alert alert-success mt-3 text-center fs-5">
              {amount} {from} = <strong>{converted} {to}</strong>
            </div>
          )}
        </div>


        <div className="col-md-6 p-4 bg-light">
          <h5 className="text-center mb-3">📜 Conversion History</h5>
          <ul className="list-group overflow-auto" style={{ maxHeight: "350px" }}>
            {history.length > 0 ? (
              history.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex flex-column">
                  <div className="fw-bold">{item.amount} {item.from} → {item.result} {item.to}</div>
                  <small className="text-muted">{item.timestamp}</small>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted text-center">No conversions yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;