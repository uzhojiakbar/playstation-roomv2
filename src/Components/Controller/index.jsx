import React, { useState } from "react";
import { CtrlDesign } from "./style";

const Controller = ({ type, updateWithdrawals }) => {
  const [price, setPrice] = useState({
    oddiy: localStorage.getItem("oddiy") || 12000,
    pro: localStorage.getItem("pro") || 15000,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [summa, setSumma] = useState("");
  const [tavsiy, setTavsiy] = useState("");

  React.useEffect(() => {
    if (!isEditing) {
      localStorage.setItem("oddiy", price.oddiy);
      localStorage.setItem("pro", price.pro);
    }
  }, [isEditing, price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrice((prevPrice) => ({
      ...prevPrice,
      [name]: value,
    }));
  };

  const handleSummaChange = (e) => setSumma(e.target.value);
  const handleTavsiyChange = (e) => setTavsiy(e.target.value);

  const handleAyrish = () => {
    if (!summa || isNaN(summa) || Number(summa) <= 0) {
      alert("Miqdorni to'g'ri kiriting!");
      return;
    }

    const newWithdrawal = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      description: tavsiy,
      amount: Number(summa),
    };

    const existingWithdrawals =
      JSON.parse(localStorage.getItem("withdrawals")) || [];
    existingWithdrawals.push(newWithdrawal);
    // localStorage.setItem("withdrawals", JSON.stringify(existingWithdrawals));

    updateWithdrawals(existingWithdrawals);
    setSumma("");
    setTavsiy("");
    onUpdateStats();
  };

  if (type === 0) {
    return (
      <CtrlDesign>
        <div className="ctrl2">
          <div className="title centerText">Kunlik Foydadan Ayrish:</div>
          <div className="CtrlBox">
            <input
              value={summa}
              onChange={handleSummaChange}
              type="number"
              placeholder="summa"
            />
            <input
              className="desc"
              value={tavsiy}
              onChange={handleTavsiyChange}
              type="text"
              placeholder="tavsif"
            />
            <button onClick={handleAyrish}>Ayrish</button>
          </div>
        </div>
      </CtrlDesign>
    );
  }

  return (
    <CtrlDesign>
      <div className="CtrlBox">
        <div className="box">
          <div className="title">Oddiy Xona:</div>
          <input
            name="oddiy"
            value={price.oddiy}
            type="number"
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="narx"
          />
        </div>
        <div className="box">
          <div className="title">Pro Xona:</div>
          <input
            name="pro"
            value={price.pro}
            type="number"
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="narx"
          />
        </div>
        <div className="box">
          <div className="title">Sozlash:</div>
          <button onClick={() => setIsEditing((prev) => !prev)}>
            {isEditing ? "Saqlash" : "Sozlash"}
          </button>
        </div>
      </div>
    </CtrlDesign>
  );
};

export default Controller;
