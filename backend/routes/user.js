const router = require("express").Router();
const userController = require("../controllers/users.js");
const verifyAuth = require("../middleware/verifyAuth");
// @route POST | /api/v1/users | public | Register a user
router.post("/users", async (req, res) => {
  await userController.create(req, res);
});

// @route POST | /api/v1/login | public | Login a user
router.post("/login", async (req, res) => {
  await userController.login(req, res);
});

// @route GET | /api/v1/users | private | Get logged in user for the process of authentication
router.get("/users", verifyAuth, async (req, res) => {
  await userController.find(req, res);
});

// @route PUT | /api/v1/users/:id | private | Edit a user
router.put("/users", verifyAuth, async (req, res) => {
  await userController.update(req, res);
});

// @route DELETE | /api/v1/users/:id | private | Delete a user
router.delete("/users", verifyAuth, async (req, res) => {
  await userController.remove(req, res);
});

module.exports = router;
