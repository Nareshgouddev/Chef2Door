import React from "react";
import { useDispatch } from "react-redux";
import { ITEM_API } from "../assets/constants";
import vegLogo from "../assets/veg-icon.webp";
import nonVegLogo from "../assets/nonVeg-icon.webp";
import { addItem } from "../utils/cartSlice";


const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div className="item-list-container">
      {items.map((item) => (
        <div key={item?.card?.info?.id}>
          <span className="item-row">
            <div className="item-details">
              <span>
                {item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
                  <img className="item-type-icon" alt="VegLogo" src={vegLogo} />
                ) : (
                  <img className="item-type-icon" alt="NonVegLogo" src={nonVegLogo} />
                )}
              </span>
              <h2 className="item-name">{item.card?.info?.name}</h2>
              <div className="item-price-row">
                <h3 className="item-old-price">
                  ₹{(item.card?.info?.price || item.card?.info?.defaultPrice) / 100 + 100}
                </h3>
                <h3>
                  ₹{(item.card?.info?.price || item.card?.info?.defaultPrice) / 100}
                </h3>
              </div>
              <p className="item-description">{item?.card?.info?.description}</p>
            </div>
            <div className="item-action">
              <div className="item-img-wrapper">
                <button className="btn-add" onClick={() => handleAddItem(item)}>
                  Add +{" "}
                </button>
                <img
                  className="item-img"
                  alt=" "
                  src={ITEM_API + item?.card?.info?.imageId}
                />
              </div>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

