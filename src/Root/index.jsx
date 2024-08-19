import React from "react";
import "./index.css";
import Rooms from "../Components/Rooms";
import Controller from "../Components/Controller";
import useLocalStorage from "../hooks/useLocalStorage";
import MonthlyResults from "../Components/MonthlyResults/MonthlyResults.jsx";
import Withdrawals from "../Components/Ayrish/index.jsx";
import RoomsController from "../Components/RoomsController/index.jsx";

const Root = () => {
  const {
    stats,
    updateStats,
    withdrawals,
    updateWithdrawals,
    closeDay,
    getMonthlyResults,
    setRooms,
    rooms,
    setGlobalRooms,
    minusToday,
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
      <div className="flex ">
        <Controller
          width="50%"
          border={1}
          type={0}
          updateWithdrawals={updateWithdrawals}
          updateStats={updateStats}
          minusToday={minusToday}
        />
        <Controller
          border={1}
          width="50%"
          updateStats={updateStats}
          updateWithdrawals={updateWithdrawals}
          minusToday={minusToday}
        />
      </div>

      <Rooms rooms={rooms} setRooms={setRooms} onUpdateStats={updateStats} />
      <div className="center">
        <button className="bigButton" onClick={closeDay}>
          Kunni Yopish
        </button>
      </div>

      <Withdrawals withdrawals={withdrawals} />
      <MonthlyResults monthlyResults={monthlyResults} />
      <RoomsController rooms={rooms} setGlobalRooms={setGlobalRooms} />
    </div>
  );
};

export default Root;
