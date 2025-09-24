// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api";
// import { saveAuth } from "../utils/auth";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading,setLoading] = useState(false);
//   const [error,setError] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true); setError("");
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       saveAuth(res.data);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{maxWidth:420, margin:"40px auto"}}>
//       <div className="card">
//         <h2>Welcome Back</h2>
//         <form onSubmit={submit} style={{display:"grid", gap:12}}>
//           <input className="form-input" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} required />
//           <input className="form-input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
//           {error && <div style={{color:"red"}}>{error}</div>}
//           <button className="btn" disabled={loading}>{loading ? "Logging..." : "Log In"}</button>
//         </form>

//         <div style={{marginTop:12, textAlign:"center"}}>
//           <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { saveAuth } from "../utils/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      saveAuth(res.data); 
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <div className="card">
        <h2>Welcome Back</h2>
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <input
            className="form-input"
            placeholder="Email address"
            type="email"
             name="email"                   
             autoComplete="username" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            placeholder="Password"
            type="password"
           name="password"             
           autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="btn" disabled={loading}>
            {loading ? "Logging..." : "Log In"}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
