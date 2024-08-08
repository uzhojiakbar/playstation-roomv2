import React from "react";
import "./index.css";
import Rooms from "../Components/Rooms";
import Controller from "../Components/Controller";
import useLocalStorage from "../hooks/useLocalStorage";
import MonthlyResults from "../Components/MonthlyResults/MonthlyResults.jsx";
import Withdrawals from "../Components/Ayrish/index.jsx";
import { Room } from "../Components/Rooms/style.js";
import RoomsController from "../Components/RoomsController/index.jsx";

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
            Kunlik Foyda: <u>{stats.today} som</u>
          </div>
          <div>
            Bugun Klientlar: <u>{stats.todayClient} ta</u>
          </div>
        </div>
      </div>
      <Controller onUpdateStats={updateStats} />
      <Rooms onUpdateStats={updateStats} />
      <Controller type={0} onUpdateStats={updateStats} />
      <div className="center">
        <button className="bigButton" onClick={closeDay}>
          Kunni Yopish
        </button>
      </div>
      <Withdrawals
        withdrawals={withdrawals}
        onUpdateWithdrawals={updateWithdrawals}
      />
      <MonthlyResults monthlyResults={monthlyResults} />
      <RoomsController />
    </div>
  );
};

export default Root;
