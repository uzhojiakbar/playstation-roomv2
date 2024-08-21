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

  const handlePayment = (id) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === id) {
        const totalPrice = calculatePrice(room);

        const today = JSON.parse(localStorage.getItem("today")) || 0;
        localStorage.setItem("today", JSON.stringify(today + totalPrice));

        const todayClient =
          JSON.parse(localStorage.getItem("todayClient")) || 0;
        localStorage.setItem("todayClient", JSON.stringify(todayClient + 1));
        updateStats();
        return { ...room, open: false, close: false, holat: "open" };
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
        return { ...room, additionalCharge: additionalCharge[id] || 0 };
      }
      return room;
    });
    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
    setEditingRoomId(null);
    updateStats();
  };

  const handleObtainAdditionalCharge = (id) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === id) {
        const totalPrice =
          +calculatePrice(room) + (+room.additionalCharge || 0);
        const today = JSON.parse(localStorage.getItem("today")) || 0;
        localStorage.setItem("today", JSON.stringify(+today + +totalPrice));
        return { ...room, open: false, close: false, additionalCharge: 0 };
      }
      return room;
    });

    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
    updateStats();
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
                    onClick={() => handlePayment(room.id)}
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
                    if (editingRoomId === room.id) {
                      handleSaveAdditionalCharge(room.id);
                    } else {
                      handleObtainAdditionalCharge(room.id);
                    }
                  }}
                  disabled={
                    editingRoomId !== room.id && room.additionalCharge <= 0
                  }
                >
                  Qo'shmoq
                </button>
              </div>
            </div>
            <div>
              <div className="title ">{calculatePrice(room).toFixed(2)}</div>{" "}
              <div className="title ">{room.additionalCharge || "0.00"}</div>
            </div>
            <div>
              <button
                className="bigButton"
                onClick={() => {
                  if (editingRoomId === room.id) {
                    handleSaveAdditionalCharge(room.id);
                  } else {
                    handleObtainAdditionalCharge(room.id);
                  }
                }}
                disabled={
                  editingRoomId !== room.id && room.additionalCharge <= 0
                }
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
