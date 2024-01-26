import { useState } from "react";
import Button from "./Button";

function FormSplitBill({ activeFriend, onBillSplit }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = billValue - yourExpense;
  const [paidBy, setPaidBy] = useState("user");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!billValue) return;
    onBillSplit(
      activeFriend.balance +
        Number(paidBy === "user" ? friendExpense : -yourExpense)
    );
  };

  return (
    <form className="form-split-bill" onSubmit={handleFormSubmit}>
      <h2>Split a Bill with {activeFriend.name}</h2>

      <label htmlFor="bill-value">Bill Value</label>
      <input
        type="text"
        min={0}
        id="bill-value"
        value={billValue}
        onChange={(e) =>
          setBillValue(
            Number(e.target.value) >= 0 ? Number(e.target.value) : billValue
          )
        }
      />
      <label htmlFor="your-expense">Your Expense</label>
      <input
        type="text"
        min={0}
        id="your-expense"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) <= billValue && Number(e.target.value) >= 0
              ? Number(e.target.value)
              : yourExpense
          )
        }
      />
      <label htmlFor="friend-expense">{activeFriend.name}&apos;s Expense</label>
      <input
        type="text"
        id="friend-expense"
        disabled
        value={friendExpense ? friendExpense : ""}
      />
      <label htmlFor="paid-by">Who is paying the Bill?</label>
      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        id="paid-by"
      >
        <option value="user">You</option>
        <option value="friend">{activeFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default FormSplitBill;
