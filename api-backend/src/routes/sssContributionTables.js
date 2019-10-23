var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const SssContributionTablesController = require('../controllers').sssContributionTables;

router.route('/').get(authController.authorization, SssContributionTablesController.findAll);
router.route('/create').post(authController.authorization, SssContributionTablesController.create);
router.route('/update/:id').put(authController.authorization, SssContributionTablesController.update);
router.route('/delete/:id').put(authController.authorization, SssContributionTablesController.delete);
router.route('/search').post(authController.authorization, SssContributionTablesController.search);
router.route('/:id').get(authController.authorization, SssContributionTablesController.findById);

module.exports = router;
