const router = require('express').Router();
const {
  createThought,
  getThought,
  updateThought,
  deleteThought,
  
} = require('../../controllers/thoughtcontroller');

// /api/applications
router.route('/').get(getThought).post(createThought);

// /api/applications/:applicationId
router
  .route('/:thoughtid')
  .get(getSingleApplication)
  .put(updateThought)
  .delete(deleteThought);

// /api/applications/:applicationId/tags
router.route('/:applicationId/tags').post(addTag);

// /api/applications/:applicationId/tags/:tagId
router.route('/:applicationId/tags/:tagId').delete(removeTag);

module.exports = router;
