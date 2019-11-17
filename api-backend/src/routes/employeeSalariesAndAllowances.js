var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const employeeSalariesAndAllowancesController = require('../controllers').employeeSalariesAndAllowances;

router.route('/').get(authController.authorization, employeeSalariesAndAllowancesController.findAll);
router.route('/create').post(authController.authorization, employeeSalariesAndAllowancesController.create);
router.route('/update/:id').put(authController.authorization, employeeSalariesAndAllowancesController.update);
router.route('/delete/:id').put(authController.authorization, employeeSalariesAndAllowancesController.delete);
router.route('/search').post(authController.authorization, employeeSalariesAndAllowancesController.search);
router.route('/findAllbyEmployeeId/:employeeId').get(authController.authorization, employeeSalariesAndAllowancesController.findAllbyEmployeeId);
router.route('/:id').get(authController.authorization, employeeSalariesAndAllowancesController.findById);

module.exports = router;
