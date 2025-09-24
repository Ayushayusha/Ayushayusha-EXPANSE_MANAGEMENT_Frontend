// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import { saveAuth } from "../utils/auth";

// const SignupPage = () => {
//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");
//   const [loading,setLoading] = useState(false);
//   const [error,setError] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true); setError("");
//     try {
//       const res = await API.post("/auth/signup", { name, email, password });
//       saveAuth(res.data);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.error || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{maxWidth:420, margin:"40px auto"}}>
//       <div className="card">
//         <h2>Create Account</h2>
//         <form onSubmit={submit} style={{display:"grid", gap:12}}>
//           <input className="form-input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
//           <input className="form-input" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} required />
//           <input className="form-input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
//           {error && <div style={{color:"red"}}>{error}</div>}
//           <button className="btn" disabled={loading}>{loading ? "Signing..." : "Sign Up"}</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { saveAuth } from "../utils/auth";

const SignupPage = () => {
  const [name, setName] = useState("");
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
      const res = await API.post("/auth/signup", { name, email, password });
      saveAuth(res.data); 
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <input
            className="form-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-input"
            placeholder="Email address"
            type="email"
             name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            placeholder="Password"
            type="password"
              name="password"
             autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="btn" disabled={loading}>
            {loading ? "Signing..." : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
