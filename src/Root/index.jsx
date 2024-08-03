// src/Root.js

import React, { useState, useEffect } from "react";
import "./index.css";
import Rooms from "../Components/Rooms";
import Controller from "../Components/Controller";
import Withdrawals from "../Components/Ayrish";

const Root = () => {
  const [stats, setStats] = useState({
    today: JSON.parse(localStorage.getItem("today")) || 0,
    todayClient: JSON.parse(localStorage.getItem("todayClient")) || 0,
  });
  const [withdrawals, setWithdrawals] = useState(
    JSON.parse(localStorage.getItem("withdrawals")) || []
  );

  const updateStats = () => {
    setStats({
      today: JSON.parse(localStorage.getItem("today")) || 0,
      todayClient: JSON.parse(localStorage.getItem("todayClient")) || 0,
    });
  };

  const updateWithdrawals = () => {
    setWithdrawals(JSON.parse(localStorage.getItem("withdrawals")) || []);
  };

  useEffect(() => {
    const initializeData = () => {
      if (localStorage.getItem("oddiy") === null) {
        localStorage.setItem("oddiy", 12000);
      }
      if (localStorage.getItem("pro") === null) {
        localStorage.setItem("pro", 15000);
      }
      if (localStorage.getItem("room") === null) {
        const rooms = [
          {
            id: 1,
            name: "1-xona",
            open: false,
            close: false,
            type: "oddiy",
            vip: false,
          },
          {
            id: 2,
            name: "2-xona",
            open: false,
            close: false,
            type: "oddiy",
            vip: false,
          },
          {
            id: 3,
            name: "3-xona",
            open: false,
            close: false,
            type: "pro",
            vip: false,
          },
          {
            id: 4,
            name: "4-xona",
            open: false,
            close: false,
            type: "oddiy",
            vip: false,
          },
          {
            id: 5,
            name: "5-xona",
            open: false,
            close: false,
            type: "oddiy",
            vip: false,
          },
        ];
        localStorage.setItem("room", JSON.stringify(rooms));
      }
    };

    initializeData();
  }, []);

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
      <Controller onUpdateStats={updateStats} />
      <Rooms onUpdateStats={updateStats} />
      <Controller type={0} onUpdateStats={updateStats} />
      <Withdrawals
        withdrawals={withdrawals}
        onUpdateWithdrawals={updateWithdrawals}
      />
    </div>
  );
};

export default Root;
