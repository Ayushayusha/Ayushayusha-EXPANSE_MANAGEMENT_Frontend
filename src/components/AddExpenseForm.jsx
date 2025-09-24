import { useState } from "react";
import API from "../utils/api"; // axios instance

const AddExpenseForm = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/expenses", {
        amount: Number(amount),
        category,
        description,
        date,
      });

      alert("✅ Expense added successfully");

      // Reset form
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");

      // Tell parent new expense is added
      if (onExpenseAdded) onExpenseAdded(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <div>
        <label className="block">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label className="block">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label className="block">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label className="block">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
