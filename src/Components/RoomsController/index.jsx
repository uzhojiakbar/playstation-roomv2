import React, { useState } from "react";
import { Room, RoomsCon } from "../Rooms/style";

const RoomsController = () => {
  const [rooms, setRooms] = useState(
    JSON.parse(localStorage.getItem("room")) || []
  );

  const [setting, setSettings] = useState("");

  const handleRoomChange = (id, field, value) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, [field]: value } : room
    );
    setRooms(updatedRooms);
    localStorage.setItem("room", JSON.stringify(updatedRooms));
  };

  return (
    <RoomsCon>
      {rooms.map((v, i) => {
        return (
          <Room key={v.id} back={i}>
            <div>
              {v.id === setting ? (
                <>
                  <div>
                    <input
                      defaultValue={v.name}
                      onChange={(e) => {
                        handleRoomChange(v.id, "name", e.target.value);
                      }}
                      className="middle"
                      type="text"
                    />
                  </div>
                  <select
                    defaultValue={v.type}
                    onChange={(e) => {
                      handleRoomChange(v.id, "type", e.target.value);
                    }}
                  >
                    <option className="opt" value="oddiy">
                      oddiy
                    </option>
                    <option className="opt" value="pro">
                      pro
                    </option>
                  </select>
                  <button
                    onClick={() => {
                      document.location.reload();
                    }}
                  >
                    Saqlash
                  </button>
                </>
              ) : (
                <>
                  <div>{v.name}</div>
                  <div>{v.type}</div>
                  <button
                    onClick={() => {
                      setSettings(v.id);
                    }}
                  >
                    sozlash
                  </button>
                </>
              )}
            </div>
          </Room>
        );
      })}
    </RoomsCon>
  );
};

export default RoomsController;
