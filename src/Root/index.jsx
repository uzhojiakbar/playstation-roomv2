// src/Root.js
import React from "react";
import "./index.css";
import Rooms from "../Components/Rooms";
import Controller from "../Components/Controller";
import Withdrawals from "../Components/Ayrish";
import useLocalStorage from "../hooks/useLocalStorage";

const Root = () => {
  const {
    stats,
    updateStats,
    withdrawals,
    updateWithdrawals,
    closeDay,
    getMonthlyResults,
  } = useLocalStorage();

  const monthlyResults = getMonthlyResults();

  return (
    <div className="main">
      <div className="center">
        <div className="title">
          <div>
            Kunlik Foyda: <u>{stats.today} so`m</u>
          </div>
          <div>
            Bugun Klientlar: <u>{stats.todayClient} ta</u>
          </div>
        </div>
      </div>
      <button onClick={closeDay}>Kunni Yopish</button>
      <Controller onUpdateStats={updateStats} />
      <Rooms onUpdateStats={updateStats} />
      <Controller type={0} onUpdateStats={updateStats} />
      <Withdrawals
        withdrawals={withdrawals}
        onUpdateWithdrawals={updateWithdrawals}
      />
      <div>
        <h3>Oylik Natijalar</h3>
        {Object.entries(monthlyResults).map(([key, value]) => (
          <div key={key}>
            <strong>{key}</strong>: Foyda: {value.profit} so'm, Kunlar:{" "}
            {value.days}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Root;
