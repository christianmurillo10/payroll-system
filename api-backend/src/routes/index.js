var express = require('express');
var router = express.Router();

router.use('/employee', require('./employees'));
router.use('/employeeSalariesAndAllowances', require('./employeeSalariesAndAllowances'));
router.use('/payFrequency', require('./payFrequencies'));
router.use('/payroll', require('./payrolls'));
router.use('/payrollWorkingDay', require('./payrollWorkingDays'));
router.use('/payrollNightDifferential', require('./payrollNightDifferentials'));
router.use('/payrollOvertime', require('./payrollOvertimes'));
router.use('/payrollTardiness', require('./payrollTardiness'));
router.use('/role', require('./roles'));
router.use('/sssContributionTable', require('./sssContributionTables'));
router.use('/user', require('./users'));
router.use('/withholdingTaxTable', require('./withholdingTaxTables'));

module.exports = router;
