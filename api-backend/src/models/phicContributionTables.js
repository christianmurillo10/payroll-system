'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhicContributionTables = sequelize.define('PhicContributionTables', {
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
    'phic_percentage': {
      type: DataTypes.INTEGER(3),
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
    tableName: "phic_contribution_tables",
    timestamps: false
  });

  PhicContributionTables.associate = (models) => {};

  return PhicContributionTables;
};