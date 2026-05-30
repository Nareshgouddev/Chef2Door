import React from "react";
import { CDN_URL } from "../assets/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  // Destructure info and sla with default empty objects
  const { info = {} } = resData;
  const { cloudinaryImageId, name, avgRating, costForTwo, areaName } = info;
  const OriginalCostForTwo = costForTwo.replace(/\D/g, "");
  const modifiedCostForTwo1 = parseFloat(OriginalCostForTwo);
  const modifiedCostForTwo2 = modifiedCostForTwo1 + 200;

  // Check if cuisines array is defined and not empty
  const cuisinesArray = info.cuisines || [];
  const cuisinesText =
    cuisinesArray.length > 0 ? cuisinesArray.join(", ") : "Unknown";

  return (
    <div className="restaurant-card">
      <div className="restaurant-card-img-wrapper">
        <img
          className="restaurant-card-img"
          alt="res-images"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <div className="restaurant-card-info">
        <div className="restaurant-card-name-row">
          <h3 className="restaurant-card-name">{name}</h3>
          <h4 className="restaurant-card-rating">{avgRating}⭐</h4>
        </div>
        <h4 className="restaurant-card-cuisines">{cuisinesText}</h4>
        <div className="restaurant-card-price-row">
          <h4 className="restaurant-card-old-price">
            ₹{modifiedCostForTwo2} for Two
          </h4>
          <h4 className="restaurant-card-new-price">{costForTwo}</h4>
        </div>
        <h4 className="restaurant-card-area">📍{areaName}</h4>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="promoted-wrapper">
        <label className="promoted-label">Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;

