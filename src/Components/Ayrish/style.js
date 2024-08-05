import styled from "styled-components";

export const WithdrawalsCon = styled.div`
  /* Add styling here */
`;

export const WithdrawalItem = styled.div`
  /* Add styling here */

  .item {
    padding: 5px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .top {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    .description {
      font-weight: bold;
      font-size: 22px;
    }

    .date {
      font-size: 0.9em;
      color: #777;
    }

    .amount {
      display: flex;
      align-items: center;

      height: 100%;

      color: #f00;
      font-size: 22px;
      height: 100%;
    }
  }
`;
