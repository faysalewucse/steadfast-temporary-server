const getSortingFilter = (sortBy) => {
  switch (sortBy) {
    case "popularity":
      return { sales: -1 };
    case "new-to-old":
      return { createdAt: -1 };
    case "old-to-new":
      return { createdAt: 1 };
    case "price-low-to-high":
      return { price: 1, offerPrice: 1 };
    case "price-high-to-low":
      return { price: -1, offerPrice: -1 };
    case "newest":
      return { createdAt: -1 };
    case "oldest":
      return { createdAt: 1 };
    default:
      return { createdAt: -1 };
  }
};

module.exports = getSortingFilter;
