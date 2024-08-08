import React, { useRef, useState } from "react";
import { Room, RoomsCon } from "../Rooms/style";

const RoomsController = ({ rooms, setGlobalRooms }) => {
  const [setting, setSettings] = useState("");

  const name = useRef("xona");
  const type = useRef("oddiy");

  const handleRoomChange = (id, field, value) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, [field]: value } : room
    );
    setGlobalRooms(updatedRooms);
    // localStorage.setItem("room", JSON.stringify(updatedRooms));
  };

  const onSave = (id) => {
    const innerRooms = rooms?.map((room) => {
      return room?.id === id
        ? {
            ...room,
            name: name?.current?.value || "xona",
            type: type?.current?.value || "oddiy",
          }
        : room;
    });
    setGlobalRooms(innerRooms);
    setSettings("close");
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
                      // onChange={(e) => {
                      //   handleRoomChange(v.id, "name", e.target.value);
                      // }}
                      ref={name}
                      className="middle"
                      type="text"
                    />
                  </div>
                  <select
                    defaultValue={v.type}
                    // onChange={(e) => {
                    //   handleRoomChange(v.id, "type", e.target.value);
                    // }}
                    ref={type}
                  >
                    <option className="opt" value="oddiy">
                      oddiy
                    </option>
                    <option className="opt" value="pro">
                      pro
                    </option>
                  </select>
                  <button onClick={() => onSave(v.id)}>Saqlash</button>
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
