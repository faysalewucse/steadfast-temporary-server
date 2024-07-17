const generateCategorySlug = (name) => name.toLowerCase().split(" ").join("-");

module.exports = generateCategorySlug;
