const router = require("express").Router();
const userController = require("../controllers/users.js");
const verifyAuth = require("../middleware/verifyAuth");
// @route POST | /users | public | Register a user
router.post("/users", async (req, res) => {
  await userController.create(req, res);
});

// @route POST | /login | public | Login a user
router.post("/login", async (req, res) => {
  await userController.login(req, res);
});

// @route GET | /users | private | Get logged in user for the process of authentication
router.get("/users", verifyAuth, async (req, res) => {
  await userController.find(req, res);
});

// @route PUT | /users/:id | private | Edit a user
router.put("/users/:id", verifyAuth, async (req, res) => {
  await userController.update(req, res);
});

// @route DELETE | /users/:id | private | Delete a user
router.delete("/users/:id", verifyAuth, async (req, res) => {
  await userController.remove(req, res);
});

// @route GET | /validate | public | Validate a user token
router.get("/validate", async (req, res) => {
  await userController.validateUserToken(req, res);
});

module.exports = router;
