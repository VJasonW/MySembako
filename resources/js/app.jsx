import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./app.css";

function DummyAuth() {
  const [authType, setAuthType] = useState("login");
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", no_telp: "", password: "" });
  const [message, setMessage] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    setMessage(`Mencoba login dengan nama: ${loginData.name}`);
  };

  const handleRegister = e => {
    e.preventDefault();
    setMessage(`Register: ${registerData.name}, ${registerData.email}, ${registerData.no_telp}`);
  };

  return (
    <div style={{ maxWidth: 370, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => setAuthType("login")}
          style={{ fontWeight: authType === "login" ? "bold" : "normal" }}>Login</button>
        <button onClick={() => setAuthType("register")}
          style={{ fontWeight: authType === "register" ? "bold" : "normal" }}>Register</button>
      </div>
      {authType === "login" ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Nama</label>
            <input type="text" value={loginData.name}
              onChange={e => setLoginData(current => ({ ...current, name: e.target.value }))}
              required className="border px-2 py-1 w-full mb-3" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={loginData.password}
              onChange={e => setLoginData(current => ({ ...current, password: e.target.value }))}
              required className="border px-2 py-1 w-full mb-3" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <div>
            <label>Nama</label>
            <input type="text" value={registerData.name}
              onChange={e => setRegisterData(current => ({ ...current, name: e.target.value }))}
              required className="border px-2 py-1 w-full mb-3" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={registerData.email}
              onChange={e => setRegisterData(current => ({ ...current, email: e.target.value }))}
              required className="border px-2 py-1 w-full mb-3" />
          </div>
          <div>
            <label>No Telp</label>
            <input type="text" value={registerData.no_telp}
              onChange={e => setRegisterData(current => ({ ...current, no_telp: e.target.value }))}
              required className="border px-2 py-1 w-full mb-3" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={registerData.password}
              onChange={e => setRegisterData(current => ({ ...current, password: e.target.value }))}
              required className="border px-2 py-1 w-full mb-3" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">Register</button>
        </form>
      )}
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<DummyAuth />);