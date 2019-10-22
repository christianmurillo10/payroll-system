var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayFrequenciesController = require('../controllers').payFrequencies;

router.route('/').get(authController.authorization, PayFrequenciesController.findAll);
router.route('/create').post(authController.authorization, PayFrequenciesController.create);
router.route('/update/:id').put(authController.authorization, PayFrequenciesController.update);
router.route('/delete/:id').put(authController.authorization, PayFrequenciesController.delete);
router.route('/search').post(authController.authorization, PayFrequenciesController.search);
router.route('/:id').get(authController.authorization, PayFrequenciesController.findById);

module.exports = router;
