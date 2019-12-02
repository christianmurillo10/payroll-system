var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayrollTardinessController = require('../controllers').payrollTardiness;

router.route('/create').post(authController.authorization, PayrollTardinessController.create);
router.route('/compute').post(authController.authorization, PayrollTardinessController.compute);

module.exports = router;
