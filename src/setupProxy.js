const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const swiggyProxy = {
    target: "https://www.swiggy.com",
    changeOrigin: true,
    headers: {
      // Swiggy expects a real browser User-Agent
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://www.swiggy.com/",
      "Origin": "https://www.swiggy.com",
    },
  };

  // Proxy /api/restaurants → Swiggy restaurants listing API
  app.use(
    "/api/restaurants",
    createProxyMiddleware({
      ...swiggyProxy,
      pathRewrite: {
        "^/api/restaurants":
          "/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      },
    })
  );

  // Proxy /api/menu/:resId → Swiggy menu API
  app.use(
    "/api/menu",
    createProxyMiddleware({
      ...swiggyProxy,
      pathRewrite: (path) => {
        const resId = path.replace("/api/menu/", "");
        return `/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}`;
      },
    })
  );
};
