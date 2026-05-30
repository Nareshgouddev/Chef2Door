import React, { useState } from "react";
import ItemList from "./ItemList";


const RestaurantCategory = ({ info }) => {
  const [showIndex, setshowIndex] = useState();
  const handleClick = () => {
    setshowIndex(!showIndex);
  };
  return (
    <div className="category-wrapper">
      <div className="category-header" onClick={handleClick}>
        <span className="category-title">
          {info.title} ({info.itemCards.length})
        </span>
        <span>🔻</span>
      </div>
      <div>{showIndex && <ItemList items={info?.itemCards} />}</div>
    </div>
  );
};

export default RestaurantCategory;

