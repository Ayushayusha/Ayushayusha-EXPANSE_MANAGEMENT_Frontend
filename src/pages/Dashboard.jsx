import React, { useEffect, useState, useMemo } from "react";
import API from "../api";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const categoriesDefault = ["Rent", "Groceries", "Entertainment", "Utilities", "Other"];
const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#6366F1", "#EF4444"];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimit] = useState(1000);
  const [spent, setSpent] = useState(0);
  const [form, setForm] = useState({ amount:"", description:"", category:"Groceries", date: new Date().toISOString().slice(0,10) });
  const [loading, setLoading] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const month = new Date().toISOString().slice(0,7);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/expenses?month=${month}&limit=50`);
        setExpenses(res.data.expenses || []);
        const b = await API.get(`/budget?month=${month}`);
        setLimit(b.data.limit || 0);
        setSpent(b.data.spent || 0);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [refreshToggle, month]);

  const pieData = useMemo(() => {
    return categoriesDefault.map((cat) => ({
      name: cat,
      value: expenses.filter(e => e.category === cat).reduce((s, e) => s + Number(e.amount), 0)
    }));
  }, [expenses]);

  const trendData = useMemo(() => {
   
    const map = {};
    expenses.forEach(e => {
      const d = new Date(e.date).toLocaleDateString();
      map[d] = (map[d] || 0) + Number(e.amount);
    });
    return Object.keys(map).slice(-7).map(k => ({ day: k.split("/").slice(0,2).join("-"), amount: map[k] }));
  }, [expenses]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/expenses", {
        amount: Number(form.amount),
        description: form.description,
        category: form.category,
        date: form.date
      });
      setForm({ amount:"", description:"", category:form.category, date: new Date().toISOString().slice(0,10) });
      setRefreshToggle(t => !t);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetBudget = async () => {
    const newLimit = Number(prompt("Enter monthly budget limit", limit || 0));
    if (!newLimit) return;
    await API.post("/budget", { month, limit: newLimit });
    setLimit(newLimit);
    setRefreshToggle(t => !t);
  };

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <div>
          <h3 style={{margin:0}}>Dashboard</h3>
          <div style={{color:"#64748B"}}>Overview of your month</div>
        </div>

        <div style={{display:"flex", gap:8}}>
          <button className="btn" onClick={handleSetBudget}>Set Budget</button>
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card" style={{marginBottom:16}}>
            <h4>Monthly Budget Overview</h4>
            <p>Spending: Rs.{spent} of Rs.{limit || "0"}</p>
            <progress value={spent} max={limit || 1} style={{width:"100%"}} />
          </div>

          <div className="grid-2" style={{marginBottom:16}}>
            <div className="card">
              <h4>Spending by Category</h4>
              <div style={{height:200}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} label>
                      {pieData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h4>Monthly Trend</h4>
              <div style={{height:200}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#2563EB" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

         {expenses.map((ex) => (
  <div key={ex._id} className="list-item">
    <div>
      <div style={{fontWeight:600}}>{ex.description || ex.category}</div>
      <div style={{color:"#64748B", fontSize:13}}>
        {new Date(ex.date).toLocaleString()} · {ex.category}
      </div>
    </div>
    <div style={{display:"flex", alignItems:"center", gap:8}}>
      <div style={{fontWeight:700}}>${ex.amount}</div>
      <button className="btn" style={{background:"#10B981"}} onClick={()=>{
        const newAmount = prompt("Edit amount", ex.amount);
        if(newAmount){
          API.put(`/expenses/${ex._id}`, {...ex, amount:Number(newAmount)})
            .then(()=> setRefreshToggle(t=>!t));
        }
      }}>Edit</button>
      <button className="btn" style={{background:"#EF4444"}} onClick={()=>{
        if(window.confirm("Delete this expense?")){
          API.delete(`/expenses/${ex._id}`)
            .then(()=> setRefreshToggle(t=>!t));
        }
      }}>Delete</button>
    </div>
  </div>
))}



        </div>

        <div style={{display:"flex", flexDirection:"column", gap:16}}>
          <div className="card">
            <h4>Quick Expense Entry</h4>
            <form onSubmit={handleAdd} style={{display:"grid", gap:8}}>
              <input className="form-input" placeholder="Amount" type="number" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required />
              <input className="form-input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
              <select className="form-input" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
                {categoriesDefault.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input className="form-input" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
              <button className="btn" type="submit" disabled={loading}>{loading ? "Adding..." : "Save"}</button>
            </form>
          </div>

          <div className="card">
            <h4>Quick Actions</h4>
            <div style={{display:"flex", flexDirection:"column", gap:8}}><button className="btn" onClick={()=>{
  const rows = [["Date","Category","Description","Amount"]];
  expenses.forEach(e=>{
    rows.push([new Date(e.date).toISOString(), e.category, e.description, e.amount]);
  });
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.csv";
  a.click();
  URL.revokeObjectURL(url);
}}>Export CSV</button>

              <button className="btn" onClick={()=>window.location.reload()}>Refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
