import { useState, useEffect } from "react";
import { users } from "./pseudo_database";
import { calculateRewardsMonthly } from "./rewards_calculator";
import "./App.css";

/**
 * A React component which lets the user track all the transaction data
 */
function App() {
  /**
   * State for the whole live data object
   */
  const [userData, setUserData] = useState(users);

  /**
   * state to add data from the form
   */
  const [newAddedData, setNewAddedData] = useState({
    name: "",
    amount: 0,
    date: "2023-06-06",
  });

  const handleChange = (event) => {
    setNewAddedData({
      ...newAddedData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUserTransactionData(newAddedData);
  };

  /**
   * Function to add entry to dummy database from the form
   * @param {*} newManualyAddedTransaction data coming from the form
   */
  const addUserTransactionData = (newManualyAddedTransaction) => {
    const newUserData = {
      id: Math.floor(Math.random() * 400000),
      firstName: newManualyAddedTransaction.name,
      transactions: [
        {
          purchase_date: newManualyAddedTransaction.date,
          purchase_amount: newManualyAddedTransaction.amount,
        },
      ],
    };
    setUserData(() => [newUserData, ...userData]);
  };

  return (
    <div className="App">
      <h1>Rewards Tracker</h1>
      <form onSubmit={handleSubmit} className="form">
        <h2>Add yourself an entry to test</h2>
        <br />
        First Name :
        <input
          type="text"
          value={newAddedData.name}
          name="name"
          onChange={handleChange}
        />
        <br />
        Transaction amount :{" "}
        <input
          type="number"
          name="amount"
          value={newAddedData.amount}
          onChange={handleChange}
        />
        <br />
        Transaction date :{" "}
        <input
          type="date"
          id="start"
          name="date"
          value={newAddedData.date}
          min="2023-04-01"
          max="2023-06-15"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
        <br />
        <br />
      </form>
      <table className="rewardTable">
        <tr>
          <th>User</th>
          <th>Transactions</th>
          <th>Apr rewards</th>
          <th>May rewards</th>
          <th>Jun rewards</th>
          <th>Total Rewards</th>
        </tr>
        {userData.map((user) => {
          return (
            <tr>
              <td>{user.firstName}</td>
              <td>
                <ol>
                  {user.transactions.map((item) => [
                    <li>
                      Amount : ${item.purchase_amount}, Date :{" "}
                      {item.purchase_date}
                    </li>,
                  ])}
                </ol>
              </td>
              <td>{calculateRewardsMonthly("04", user)}</td>
              <td>{calculateRewardsMonthly("05", user)}</td>
              <td>{calculateRewardsMonthly("06", user)}</td>
              <td>
                {calculateRewardsMonthly("04", user) +
                  calculateRewardsMonthly("05", user) +
                  calculateRewardsMonthly("06", user)}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
