// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from "react";

const useLocalStorage = () => {
  const [stats, setStats] = useState({
    today: JSON.parse(localStorage.getItem("today")) || 0,
    todayClient: JSON.parse(localStorage.getItem("todayClient")) || 0,
  });
  const [withdrawals, setWithdrawals] = useState(
    JSON.parse(localStorage.getItem("withdrawals")) || []
  );

  const [rooms, setRooms] = useState(
    JSON.parse(localStorage.getItem("room")) || []
  );

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
          // {
          //   id: 6,
          //   name: "6-xona",
          //   open: false,
          //   close: false,
          //   type: "oddiy",
          //   vip: false,
          // },
          // {
          //   id: 7,
          //   name: "7-xona",
          //   open: false,
          //   close: false,
          //   type: "oddiy",
          //   vip: false,
          // },
          // {
          //   id: 8,
          //   name: "8-xona",
          //   open: false,
          //   close: false,
          //   type: "pro",
          //   vip: false,
          // },
          // {
          //   id: 9,
          //   name: "9-xona",
          //   open: false,
          //   close: false,
          //   type: "oddiy",
          //   vip: false,
          // },
          // {
          //   id: 10,
          //   name: "10-xona",
          //   open: false,
          //   close: false,
          //   type: "oddiy",
          //   vip: false,
          // },
        ];
        localStorage.setItem("room", JSON.stringify(rooms));
      }
    };

    initializeData();
  }, []);

  const updateStats = useCallback(() => {
    setStats({
      today: JSON.parse(localStorage.getItem("today")) || 0,
      todayClient: JSON.parse(localStorage.getItem("todayClient")) || 0,
    });
  }, []);

  const updateWithdrawals = (data) => {
    setWithdrawals(data || []);
    // setWithdrawals(JSON.parse(localStorage.getItem("withdrawals")) || []);
    localStorage.setItem("withdrawals", JSON.stringify(data));
  };

  const addDailyProfit = useCallback((amount) => {
    const dailyProfits = JSON.parse(localStorage.getItem("dailyProfits")) || [];
    dailyProfits.push({
      date: new Date().toLocaleDateString(),
      profit: amount,
    });
    localStorage.setItem("dailyProfits", JSON.stringify(dailyProfits));
  }, []);

  const closeDay = useCallback(() => {
    const todayProfit = JSON.parse(localStorage.getItem("today")) || 0;
    addDailyProfit(todayProfit);
    localStorage.setItem("today", JSON.stringify(0));
    localStorage.setItem("todayClient", JSON.stringify(0));
    updateStats();
  }, [addDailyProfit, updateStats]);

  const getMonthlyResults = useCallback(() => {
    const dailyProfits = JSON.parse(localStorage.getItem("dailyProfits")) || [];
    const monthlyResults = dailyProfits.reduce((acc, item) => {
      const date = new Date(item.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month}`;
      if (!acc[key]) {
        acc[key] = {
          profit: 0,
          days: 0,
        };
      }
      acc[key].profit += item.profit;
      acc[key].days += 1;
      return acc;
    }, {});
    return monthlyResults;
  }, []);

  const setGlobalRooms = (room) => {
    setRooms(room);
    localStorage.setItem("room", JSON.stringify(room));
  };

  return {
    stats,
    updateStats,
    withdrawals,
    rooms,
    setRooms,
    setGlobalRooms,
    updateWithdrawals,
    closeDay,
    getMonthlyResults,
  };
};

export default useLocalStorage;
