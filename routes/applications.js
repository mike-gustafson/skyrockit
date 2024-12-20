const router = require('express').Router();
const userController = require('../controllers/applications');
const { isSignedIn } = require('../middleware/is-signed-in');

router.get('/', isSignedIn, userController.index)
router.get('/new', isSignedIn, userController.new)
router.post('/', isSignedIn, userController.create)
router.get('/:applicationId', isSignedIn, userController.show)
router.get('/:applicationId/edit', isSignedIn, userController.edit)
router.put('/:applicationId', isSignedIn, userController.update)
router.delete('/:applicationId', isSignedIn, userController.delete)

module.exports = router;