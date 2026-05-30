import React, {useEffect, useState } from "react";
import RestaurantCard,{withPromotedLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import resListMock from "./mocks/resListMockData.json";

const Body = () => {
  const [ListOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");
 

const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const extractRestaurants = (json) => {
    const cards = json?.data?.cards || [];
    for (const cardObj of cards) {
      const restaurants = cardObj?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants && restaurants.length > 0) {
        return restaurants;
      }
    }
    // Backup fallback check
    for (const cardObj of cards) {
      const restaurants = cardObj?.card?.card?.restaurants;
      if (restaurants && restaurants.length > 0) {
        return restaurants;
      }
    }
    return null;
  };

  const fetchData = async () => {
    try {
      const data = await fetch("/api/restaurants");
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();
      const restaurants = extractRestaurants(json);
      if (!restaurants) {
        throw new Error("No restaurants list found in API response");
      }
      setListOfRestaurants(restaurants);
      setfilteredRestaurant(restaurants);
    } catch (err) {
      console.warn("Failed to fetch restaurants, using local mock data:", err);
      const fallbackRestaurants = extractRestaurants(resListMock) || [];
      setListOfRestaurants(fallbackRestaurants);
      setfilteredRestaurant(fallbackRestaurants);
    }
  };
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you are offline, please check your internent connection.
      </h1>
    );

  if (!ListOfRestaurants || ListOfRestaurants.length === 0){
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="search-bar-section">
        <div>
          <input
            data-test-id="search-inputs"
            type="text"
            placeholder="Search your Restaurant..."
            className="search-input"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="btn-search"
            onClick={() => {
              console.log(searchText);
              const filteredRestaurant = ListOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="btn-top-rated"
          onClick={() => {
            // filter logic
            const filteredList = ListOfRestaurants.filter(
              (res) => res.info.avgRating > 4.3
            );

            setfilteredRestaurant(filteredList);
            console.log(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="restaurant-grid">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info?.id}
            to={"/restaurants/" + restaurant.info?.id}
          >{restaurant.info.promoted ?
            ( <RestaurantCardPromoted resData={restaurant} />) :
          ( <RestaurantCard resData={restaurant} />)}
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

