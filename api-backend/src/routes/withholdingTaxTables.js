var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const WithholdingTaxTablesController = require('../controllers').withholdingTaxTables;

router.route('/').get(authController.authorization, WithholdingTaxTablesController.findAll);
router.route('/create').post(authController.authorization, WithholdingTaxTablesController.create);
router.route('/update/:id').put(authController.authorization, WithholdingTaxTablesController.update);
router.route('/delete/:id').put(authController.authorization, WithholdingTaxTablesController.delete);
router.route('/search').post(authController.authorization, WithholdingTaxTablesController.search);
router.route('/:id').get(authController.authorization, WithholdingTaxTablesController.findById);

module.exports = router;
