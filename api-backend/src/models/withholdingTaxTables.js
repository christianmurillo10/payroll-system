'use strict';
module.exports = (sequelize, DataTypes) => {
  const WithholdingTaxTables = sequelize.define('WithholdingTaxTables', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'compensation_range_from': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'compensation_range_to': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'tax_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'tax_percentage': {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    'pay_frequency_id': {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'pay_frequencies',
        key: 'id'
      },
      comment: 'refd to pay_frequencies.id',
      allowNull: false
    },
    'created_at': {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    'updated_at': {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    'is_deleted': {
      type: DataTypes.SMALLINT(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: "withholding_tax_tables",
    timestamps: false
  });

  WithholdingTaxTables.associate = (models) => {
    WithholdingTaxTables.belongsTo(models.PayFrequencies, {
      foreignKey: 'pay_frequency_id',
      as: 'payFrequencies'
    });
  };

  WithholdingTaxTables.associate = (models) => {};

  return WithholdingTaxTables;
};