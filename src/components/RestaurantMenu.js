import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    areaname,
    avgRating,
    sla,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="menu-page">
      <div className="menu-header-card">
        <h1 className="menu-restaurant-name">{name}</h1>
        <div>
          <h2 className="menu-cuisines">{cuisines?.join(", ")}</h2>
          <h3 className="menu-area">{areaname}</h3>
          <div className="menu-meta-row">
            <h3 className="menu-meta-text">{avgRating}</h3>
            <h3 className="menu-meta-text">{totalRatingsString}</h3>
            <h3>•</h3>
            <h3 className="menu-meta-text">{costForTwoMessage}</h3>
          </div>
          <h3 className="menu-delivery">
            Delivery in : {sla?.slaString}
          </h3>
        </div>
      </div>
      <div className="menu-categories">
        {categories && categories.length > 0 ? (
          categories.map((category, _index) => (
            <RestaurantCategory
              key={category?.card?.card?.title}
              info={category?.card?.card}
            />
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;