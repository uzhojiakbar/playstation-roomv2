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
    UpdateRooms,
  } = useLocalStorage();

  const monthlyResults = getMonthlyResults();

  return (
    <div className="main">
      <div className="title center">
        <div>
          Kunlik Foyda: <u>{stats.today} som</u>
        </div>
        <div>
          Bugun Klientlar: <u>{stats.todayClient} ta</u>
        </div>
        <button className="middleBig" onClick={closeDay}>
          Kunni Yopish
        </button>
      </div>
      <div className="flex ">
        <Controller
          type={0}
          width="48%"
          border={1}
          updateWithdrawals={updateWithdrawals}
          minusToday={minusToday}
        />
        <Controller
          width="48%"
          border={1}
          updateWithdrawals={updateWithdrawals}
          minusToday={minusToday}
        />
      </div>

      <Rooms
        rooms={rooms}
        setRooms={setRooms}
        UpdateRooms={UpdateRooms}
        updateStats={updateStats}
      />

      <Withdrawals withdrawals={withdrawals} />
      <MonthlyResults monthlyResults={monthlyResults} />
      <RoomsController rooms={rooms} setGlobalRooms={setGlobalRooms} />
    </div>
  );
};

export default Root;
