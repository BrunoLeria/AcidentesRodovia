const router = require("express").Router();
const occurrenceController = require("../controllers/occurrences.js");
const verifyAuth = require("../middleware/verifyAuth.js");
// @route POST | /occurrences | public | Register a occurrence
router.post("/occurrences", verifyAuth, async (req, res) => {
  await occurrenceController.create(req, res);
});

// @route GET | /occurrences | public | Get a occurrence
router.get("/occurrences/", async (req, res) => {
  await occurrenceController.findOne(req, res);
});

// @route PUT | /occurrences/:id | private | Edit a occurrence
router.put("/occurrences/:id", verifyAuth, async (req, res) => {
  await occurrenceController.update(req, res);
});

// @route DELETE | /occurrences/:id | private | Delete a occurrence
router.delete("/occurrences/:id", verifyAuth, async (req, res) => {
  await occurrenceController.remove(req, res);
});

module.exports = router;
