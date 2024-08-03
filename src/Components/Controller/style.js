import styled from "styled-components";

export const CtrlDesign = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .CtrlBox {
    display: flex;
    width: 100%;
    gap: 10px;

    justify-content: space-around;

    padding: 10px 0;
    > .box {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .ctrl2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
