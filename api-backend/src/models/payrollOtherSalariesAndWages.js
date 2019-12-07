'use strict';
module.exports = (sequelize, DataTypes) => {
  const PayrollOtherSalariesAndWages = sequelize.define('PayrollOtherSalariesAndWages', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'taxable_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'non_taxable_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'description': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'payroll_id': {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'payrolls',
        key: 'id'
      },
      comment: 'refd to payrolls.id',
      allowNull: false
    },
    'employee_id': {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'employees',
        key: 'id'
      },
      comment: 'refd to employees.id',
      allowNull: false
    },
    'user_id': {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'users',
        key: 'id'
      },
      comment: 'refd to users.id',
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
    tableName: "payroll_other_salaries_and_wages",
    timestamps: false
  });

  PayrollOtherSalariesAndWages.associate = (models) => {
    PayrollOtherSalariesAndWages.belongsTo(models.Payrolls, {
      foreignKey: 'payroll_id',
      as: 'payrolls'
    });
    PayrollOtherSalariesAndWages.belongsTo(models.Employees, {
      foreignKey: 'employee_id',
      as: 'employees'
    });
    PayrollOtherSalariesAndWages.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  return PayrollOtherSalariesAndWages;
};