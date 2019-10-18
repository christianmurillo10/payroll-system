'use strict';
module.exports = (sequelize, DataTypes) => {
  const SssContributionTables = sequelize.define('SssContributionTables', {
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
    'monthly_salary_credit': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'employer_contribution': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'employee_contribution': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
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
    tableName: "sss_contribution_tables",
    timestamps: false
  });

  SssContributionTables.associate = (models) => {};

  return SssContributionTables;
};