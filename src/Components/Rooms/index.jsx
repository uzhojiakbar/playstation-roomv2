import React, { useState } from "react";
import { Room, RoomsCon } from "./style";

const Rooms = ({ onUpdateStats }) => {
  const [rooms, setRooms] = useState(
    JSON.parse(localStorage.getItem("room")) || []
  );

  const handleRoomChange = (id, field, value) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, [field]: value } : room
    );
    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
  };

  const handleVIP = (id) => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, open: [currentHour, currentMinute] } : room
    );
    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
    // Update stats after VIP is set
    onUpdateStats();
  };

  const handleClose = (id) => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, close: [currentHour, currentMinute] } : room
    );
    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
  };

  const handlePayment = (id) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === id) {
        // Tekshiruv: open va close mavjudligini tekshirish
        if (!room.open || !room.close) {
          console.error("Room open or close time is missing.");
          return room; // Agar vaqt mavjud bo'lmasa, xona holatini o'zgartirmaslik
        }

        console.log("Room open:", room.open);
        console.log("Room close:", room.close);

        // Vaqtni to'g'ri olish
        const openTime = new Date();
        openTime.setHours(room.open[0], room.open[1], 0, 0);

        const closeTime = new Date();
        closeTime.setHours(room.close[0], room.close[1], 0, 0);

        console.log("Open time:", openTime);
        console.log("Close time:", closeTime);

        // Hisoblash
        const diffInMinutes = (closeTime - openTime) / 60000;
        const diffInHours = diffInMinutes / 60;

        // `pricePerHour` qiymatini olish
        const pricePerHour = parseFloat(localStorage.getItem(room.type)) || 0;
        console.log("Price per hour:", pricePerHour);

        // Agar narx bo'lsa, to'liq narxni hisoblash
        const totalPrice = diffInHours * pricePerHour;
        console.log("Total price:", totalPrice);

        // Statistikalarni yangilash
        const today = JSON.parse(localStorage.getItem("today")) || 0;
        localStorage.setItem("today", JSON.stringify(today + totalPrice));

        // Klientlar sonini oshirish
        const todayClient =
          JSON.parse(localStorage.getItem("todayClient")) || 0;
        localStorage.setItem("todayClient", JSON.stringify(todayClient + 1));

        // Statistikalarni yangilash
        onUpdateStats();

        // Xonani yangilash
        return { ...room, open: false, close: false };
      }
      return room;
    });

    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
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
        };
      }
      return room;
    });
    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
    // Update stats after time addition
    onUpdateStats();
  };

  const calculatePrice = (room) => {
    if (!room.open || !room.close) return 0;
    const openTime = new Date();
    openTime.setHours(room.open[0], room.open[1]);
    const closeTime = new Date();
    closeTime.setHours(room.close[0], room.close[1]);
    const diffInMinutes = (closeTime - openTime) / 60000;
    const diffInHours = diffInMinutes / 60;
    const pricePerHour = parseFloat(localStorage.getItem(room.type));
    return diffInHours * pricePerHour;
  };

  return (
    <RoomsCon>
      {rooms.map((room, index) => (
        <Room key={room.id} back={index}>
          <div>
            <div className="title mini">{room.name}</div>
            <div>
              <input
                className="middle"
                type="text"
                value={
                  room.open && Array.isArray(room.open)
                    ? room.open.join(":")
                    : ""
                }
                onChange={(e) =>
                  handleRoomChange(room.id, "open", e.target.value)
                }
                placeholder="Ochilish vaqti"
                disabled
              />
            </div>
            <div>
              <input
                className="mini"
                type="text"
                value={room.close ? room.close[0] : ""}
                onChange={(e) =>
                  handleRoomChange(room.id, "closeHour", e.target.value)
                }
                placeholder="Soat"
                disabled
              />
              <input
                className="mini"
                type="text"
                value={room.close ? room.close[1] : ""}
                onChange={(e) =>
                  handleRoomChange(room.id, "closeMinute", e.target.value)
                }
                placeholder="Minut"
                disabled
              />
            </div>
          </div>
          <div>
            <div className="title mini">{calculatePrice(room)}</div>
            <div>
              {room.open === false ? (
                <button className="middle" onClick={() => handleVIP(room.id)}>
                  VIP
                </button>
              ) : room.close ? (
                <button
                  className="middle"
                  onClick={() => handlePayment(room.id)}
                >
                  Olish
                </button>
              ) : (
                <button className="middle" onClick={() => handleClose(room.id)}>
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
        </Room>
      ))}
    </RoomsCon>
  );
};

export default Rooms;
