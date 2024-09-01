import React from "react";

const MonthlyResults = ({ monthlyResults }) => {
  return (
    <div className="results">
      <h3 className="oylikNatijaTitle">Oylik Natijalar</h3>
      <ul>
        {Object.entries(monthlyResults).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong>: Foyda: {value.profit} so'm, Kunlar:{" "}
            {value.days}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyResults;
