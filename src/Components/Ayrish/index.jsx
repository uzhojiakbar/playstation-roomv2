// src/Components/Ayrish.js
import React, { useEffect } from "react";
import { WithdrawalsCon, WithdrawalItem } from "./style";

const Withdrawals = ({ withdrawals, onUpdateWithdrawals }) => {
  useEffect(() => {
    onUpdateWithdrawals();
  }, []);

  return (
    <WithdrawalsCon>
      {withdrawals.map((withdrawal, index) => (
        <WithdrawalItem key={index}>
          <div className="item">
            <div className="top">
              <div className="description">{withdrawal.description}</div>
              <div className="date">{withdrawal.date}</div>
            </div>
            <div className="amount">{withdrawal.amount} so`m</div>
          </div>
        </WithdrawalItem>
      ))}
    </WithdrawalsCon>
  );
};

export default Withdrawals;
