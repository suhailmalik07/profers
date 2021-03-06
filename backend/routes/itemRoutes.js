const { addItem, getItems, getItemsByLocation } = require("../controllers/item-controller");
const { getByCategory, getBySubCategory, getByCity } = require("../controllers/itemByCategories-controller");
const queryParser = require("../middleware/queryParser");
const uploadImages = require("../utils/uploadImages");

const routes = require("express").Router();

routes.get("/getBy", queryParser, getByCategory)
routes.get("/getByCity/:city/:category", queryParser, getByCity);
routes.get("/getBy/:city/:category/:subcategory", queryParser, getBySubCategory);
routes.get("/:id/:city", queryParser, getItems);
routes.get("/", queryParser, getItemsByLocation);
routes.post("/", uploadImages.array("photos", 12), addItem);

module.exports = routes;
