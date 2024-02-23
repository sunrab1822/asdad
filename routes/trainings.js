const express = require("express");
const {
  getTraining,
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  getTrainingsInRadius,
  trainingPhotoUpload,
} = require("../controllers/trainings");

const advancedResults = require("../middleware/advancedResults");

const courseRouter = require("./courses");
const Training = require("../models/Training");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.use("/:trainingId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getTrainingsInRadius);

router.route("/:id/photo").put(protect,authorize('admin','publisher'), trainingPhotoUpload);

router
  .route("/")
  .get(advancedResults(Training, "courses"), getTrainings)
  .post(protect, createTraining);

router
  .route("/:id")
  .get(getTraining)
  .put(protect,authorize('admin','publisher'), updateTraining)
  .delete(protect,authorize('admin','publisher'), deleteTraining);

module.exports = router;
