// src/Components/Rooms.js
import React, { useState } from "react";
import { Room, RoomsCon } from "./style";

const Rooms = ({ updateStats, UpdateRooms, rooms, setRooms }) => {
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [additionalCharge, setAdditionalCharge] = useState({});

  const handleCloseChange = (id, value) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, close: value } : room
    );
    console.log(updatedRooms);
    UpdateRooms(updatedRooms);
    // localStorage.setItem("room", JSON.stringify(updatedRooms));
  };

  const handleVIP = (id) => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const updatedRooms = rooms.map((room) =>
      room.id === id
        ? { ...room, open: [currentHour, currentMinute], holat: "close" }
        : room
    );
    UpdateRooms(updatedRooms);
    updateStats();
  };

  const handleClose = (id, h, m) => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const updatedRooms = rooms.map((room) =>
      room.id === id
        ? {
            ...room,
            close: [
              room.close[0] ? room.close[0] : currentHour,
              room.close[1] ? room.close[1] : currentMinute,
            ],
            holat: "get",
          }
        : room
    );
    UpdateRooms(updatedRooms);
    updateStats();
  };

  const BudgetAdd = (id) => {
    if (!id) {
      alert("XATOLIK, pulini olib bolmaydi");
      return false;
    }

    const updatedRooms = rooms.map((room) => {
      if (room.id === id) {
        const totalPrice = calculatePrice(room);

        return {
          ...room,
          open: false,
          close: false,
          holat: "open",
          budget: {
            ...room.budget,
            room: (room.budget.room += totalPrice),
            full: room.budget.room + room.budget.oth,
          },
        };
      }

      updateStats();
      return room;
    });
    UpdateRooms(updatedRooms);
  };

  const handlePayment = (id) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === id) {
        const totalPrice = +room.budget.full;
        const today = JSON.parse(localStorage.getItem("today")) || 0;
        localStorage.setItem("today", JSON.stringify(today + totalPrice));

        const todayClient =
          JSON.parse(localStorage.getItem("todayClient")) || 0;
        localStorage.setItem("todayClient", JSON.stringify(todayClient + 1));
        updateStats();
        return { ...room, budget: { oth: 0, full: 0, room: 0 } };
      }
      updateStats();
      return room;
    });

    UpdateRooms(updatedRooms);
  };

  const handleTimeAddition = (id, minutesToAdd) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === id) {
        const currentTime = new Date();
        if (!room.open) {
          room.open = [currentTime.getHours(), currentTime.getMinutes()];
        }
        const openTime = new Date();
        openTime.setHours(room.open[0], room.open[1]);
        openTime.setMinutes(openTime.getMinutes() + minutesToAdd);
        return {
          ...room,
          close: [openTime.getHours(), openTime.getMinutes()],
          holat: "get",
        };
      }
      return room;
    });
    UpdateRooms(updatedRooms);
    updateStats();
  };

  const calculatePrice = (room) => {
    let hour = (room.close[0] - room.open[0]) * 60;

    if (room.open[0] > room.close[0]) {
      hour = (24 - room.open[0]) * 60 + room.close[0] * 60;
    }

    let minute = room.close[1] - room.open[1];

    return (
      (Number(hour) + Number(minute)) *
      (parseFloat(localStorage.getItem(room.type)) / 60)
    );
  };

  const handleAdditionalChargeChange = (id, value) => {
    setAdditionalCharge((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveAdditionalCharge = (id) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === id) {
        return {
          ...room,
          budget: {
            ...room.budget,
            oth: +room.budget.oth + +additionalCharge[id] || 0,
            full:
              room.budget.room + +room.budget.oth + +additionalCharge[id] || 0,
          },
        };
      }
      setAdditionalCharge({ ...additionalCharge, [id]: 0 });
      updateStats();
      return room;
    });
    console.log(updatedRooms);
    // setRooms(updatedRooms);
    // localStorage.setItem("room", JSON.stringify(updatedRooms));
    updateStats();
    UpdateRooms(updatedRooms);
  };

  return (
    <RoomsCon>
      {rooms.map((room, index) => {
        console.log("update");
        return (
          <Room className="border" key={room.id} back={index}>
            <div className="title center">{room.name}</div>
            <div>
              <div>
                <input
                  className="middle"
                  type="text"
                  value={
                    room.open && Array.isArray(room.open)
                      ? room.open.join(":")
                      : ""
                  }
                  placeholder="Ochilish"
                  disabled
                />
              </div>
              <div>
                <input
                  className="mini"
                  type="text"
                  value={room.close ? room.close[0] : ""}
                  onChange={(e) =>
                    room.open &&
                    handleCloseChange(room.id, [
                      +e.target.value || "00",
                      +room.close[1] || "00",
                    ])
                  }
                  placeholder="Soat"
                  disabled={room.holat === "get" || !room.open}
                />
                <input
                  className="mini"
                  type="text"
                  value={room.close ? room.close[1] : ""}
                  onChange={(e) =>
                    room.open &&
                    handleCloseChange(room.id, [
                      +room.close[0] || "00",
                      +e.target.value || "00",
                    ])
                  }
                  placeholder="Minut"
                  disabled={room.holat === "get" || !room.open}
                />
              </div>
            </div>

            <div>
              <div>
                {room.holat === "open" ? (
                  <button className="middle" onClick={() => handleVIP(room.id)}>
                    VIP
                  </button>
                ) : room.holat === "get" ? (
                  <button
                    className="middle"
                    onClick={() => BudgetAdd(room.id, "room")}
                  >
                    Olish
                  </button>
                ) : room.holat === "openMinute" ? (
                  <button
                    className="middle"
                    onClick={() => handleClose(room.id)}
                  >
                    Yopish
                  </button>
                ) : (
                  <button
                    className="middle"
                    onClick={() => handleClose(room.id)}
                  >
                    Yopish
                  </button>
                )}
              </div>
              <div>
                <button
                  className="mini"
                  onClick={() => handleTimeAddition(room.id, 30)}
                >
                  +30
                </button>
                <button
                  className="mini"
                  onClick={() => handleTimeAddition(room.id, 60)}
                >
                  +60
                </button>
              </div>
            </div>

            <div>
              <input
                className="middle"
                type="number"
                value={additionalCharge[room.id] || ""}
                onChange={(e) =>
                  handleAdditionalChargeChange(room.id, e.target.value)
                }
              />

              <div>
                <button
                  className="middleBig"
                  onClick={() => {
                    handleSaveAdditionalCharge(room.id);
                  }}
                >
                  Qo'shmoq
                </button>
              </div>
            </div>
            <div>
              <div className="title">
                {room.budget.room || calculatePrice(room) || "0.00"}
              </div>{" "}
              <div className="title ">{room.budget.oth || "0.00"}</div>{" "}
              <div className="title ">{room.budget.full || "0.00"}</div>
            </div>

            <div>
              <button
                className="bigButton"
                onClick={() => handlePayment(room.id)}
              >
                Olmoq
              </button>
            </div>
          </Room>
        );
      })}
    </RoomsCon>
  );
};

export default Rooms;
