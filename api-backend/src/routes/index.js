var express = require('express');
var router = express.Router();

router.use('/payFrequency', require('./payFrequencies'));
router.use('/role', require('./roles'));
router.use('/sssContributionTable', require('./sssContributionTables'));
router.use('/user', require('./users'));
router.use('/withholdingTaxTable', require('./withholdingTaxTables'));

module.exports = router;
