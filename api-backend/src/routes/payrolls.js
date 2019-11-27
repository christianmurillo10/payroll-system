var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayrollsController = require('../controllers').payrolls;

router.route('/').get(authController.authorization, PayrollsController.findAll);
router.route('/create').post(authController.authorization, PayrollsController.create);
router.route('/update/:id').put(authController.authorization, PayrollsController.update);
router.route('/delete/:id').put(authController.authorization, PayrollsController.delete);
router.route('/search/:value').get(authController.authorization, PayrollsController.search);
router.route('/:id').get(authController.authorization, PayrollsController.findById);

module.exports = router;
