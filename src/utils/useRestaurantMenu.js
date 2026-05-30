import { useEffect, useState } from 'react';
import resListMock from '../components/mocks/resListMockData.json';

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const data = await fetch("/api/menu/" + resId);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();
      if (!json || !json.data) {
        throw new Error("Invalid JSON data format received");
      }
      setResInfo(json.data);
    } catch (err) {
      console.warn("Failed to fetch restaurant menu, using local mock data:", err);
      
      // Look up restaurant in mock list
      const mockRes = resListMock?.data?.cards
        ?.flatMap(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
        ?.find(res => String(res?.info?.id) === String(resId))?.info;

      // Construct fallback structure matching Swiggy cards[2] and cards[4] schema
      const fallbackData = {
        cards: [
          {}, // cards[0]
          {}, // cards[1]
          {
            card: {
              card: {
                info: {
                  name: mockRes?.name || "Delicious Chef Special",
                  cuisines: mockRes?.cuisines || ["Multi-cuisine", "Fast Food"],
                  costForTwoMessage: mockRes?.costForTwo || "₹350 for two",
                  totalRatingsString: mockRes?.totalRatingsString || "150+ ratings",
                  areaname: mockRes?.areaName || "Koramangala",
                  avgRating: mockRes?.avgRating || 4.4,
                  sla: mockRes?.sla || { slaString: "20-25 mins" }
                }
              }
            }
          }, // cards[2]
          {}, // cards[3]
          {
            groupedCard: {
              cardGroupMap: {
                REGULAR: {
                  cards: [
                    {
                      card: {
                        card: {
                          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                          title: "Recommended Specials",
                          itemCards: [
                            {
                              card: {
                                info: {
                                  id: `${resId}-m1`,
                                  name: "Chef's Special Paneer Butter Masala",
                                  price: 28000,
                                  description: "Fresh cottage cheese chunks cooked in rich creamy tomato butter gravy.",
                                  imageId: mockRes?.cloudinaryImageId || "cihuy7nxa3lhf0qj1eom",
                                  itemAttribute: { vegClassifier: "VEG" }
                                }
                              }
                            },
                            {
                              card: {
                                info: {
                                  id: `${resId}-m2`,
                                  name: "Classic Veg Burger Combo",
                                  price: 19900,
                                  description: "Crispy vegetable patty with signature sauce, fresh veggies, served with fries.",
                                  imageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/6/18/81be3f2a-21bf-4a78-a8b2-fe827557a6e1_910940.JPG",
                                  itemAttribute: { vegClassifier: "VEG" }
                                }
                              }
                            },
                            {
                              card: {
                                info: {
                                  id: `${resId}-m3`,
                                  name: "Garlic Butter Naan (2 pcs)",
                                  price: 9000,
                                  description: "Soft Indian flatbread topped with minced garlic and generous butter.",
                                  imageId: "10f49ae1182b46a76d54295ff690c623",
                                  itemAttribute: { vegClassifier: "VEG" }
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      card: {
                        card: {
                          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                          title: "Desserts & Drinks",
                          itemCards: [
                            {
                              card: {
                                info: {
                                  id: `${resId}-m4`,
                                  name: "Authentic Belgian Waffle",
                                  price: 16000,
                                  description: "Freshly baked waffle topped with warm milk chocolate and powdered sugar.",
                                  imageId: "85ccae4e3576f9330af102c46ca85395",
                                  itemAttribute: { vegClassifier: "VEG" }
                                }
                              }
                            },
                            {
                              card: {
                                info: {
                                  id: `${resId}-m5`,
                                  name: "Cool Mint Mojito",
                                  price: 12000,
                                  description: "Refreshing summer cooler with fresh mint leaves, lime juice, and soda.",
                                  imageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/11/23/e99fa79e-c152-4865-9147-640caa556ab5_50842.JPG",
                                  itemAttribute: { vegClassifier: "VEG" }
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          } // cards[4]
        ]
      };
      setResInfo(fallbackData);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
