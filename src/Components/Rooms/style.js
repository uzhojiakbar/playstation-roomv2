import styled from "styled-components";

export const RoomsCon = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
  gap: 15px;
`;

export const Room = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: fit-content;
  gap: 10px;
  padding: 5px 0;

  background-color: ${({ back }) =>
    back % 2 === 0 ? "var(--back1)" : "var(--back2)"};
  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      display: flex;
      justify-content: flex-start;
    }
  }
`;
