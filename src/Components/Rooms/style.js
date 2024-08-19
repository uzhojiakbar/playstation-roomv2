import styled from "styled-components";

export const RoomsCon = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  overflow: scroll;
  margin: 0 auto;
  padding: 0 0px;
  margin: 10px 0;
  gap: 5px;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 25px;
  }
`;

{
  /* <div className="title mini">{calculatePrice(room).toFixed(2)}</div> */
  // <div className="title mini">{room.additionalCharge || "0.00"}</div>
}

export const Room = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 300px;
  padding: 20px 10px;
  border-radius: 20px;
  height: fit-content;
  gap: 30px;

  /* background-color: ${({ back }) =>
    back % 2 === 0 ? "var(--back1)" : "var(--back2)"}; */
  background-color: var(--back1);
  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
