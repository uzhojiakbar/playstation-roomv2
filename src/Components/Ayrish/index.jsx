// src/Components/Ayrish.js
import React, { useEffect } from "react";
import { WithdrawalsCon, WithdrawalItem } from "./style";

const Withdrawals = ({ withdrawals, onUpdateWithdrawals }) => {
  useEffect(() => {
    onUpdateWithdrawals();
  }, [onUpdateWithdrawals]);

  return (
    <WithdrawalsCon>
      {withdrawals.map((withdrawal, index) => (
        <WithdrawalItem key={index}>
          <div className="item">
            <div className="description">{withdrawal.description}</div>
            <div className="amount">{withdrawal.amount} so`m</div>
            <div className="date">{withdrawal.date}</div>
          </div>
        </WithdrawalItem>
      ))}
    </WithdrawalsCon>
  );
};

export default Withdrawals;
