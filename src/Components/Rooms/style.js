import styled from "styled-components";

export const RoomsCon = styled.div`
  display: flex;
  width: 1200px;
  overflow: scroll;
  margin: 0 auto;
  padding: 20px 0;
  gap: 20px;
`;

{
  /* <div className="title mini">{calculatePrice(room).toFixed(2)}</div> */
  // <div className="title mini">{room.additionalCharge || "0.00"}</div>
}

export const Room = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 200px;
  height: fit-content;
  gap: 30px;
  padding: 5px 0px;

  /* background-color: ${({ back }) =>
    back % 2 === 0 ? "var(--back1)" : "var(--back2)"}; */
  background-color: var(--back1);
  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
