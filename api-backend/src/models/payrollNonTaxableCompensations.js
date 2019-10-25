'use strict';
module.exports = (sequelize, DataTypes) => {
  const PayrollNonTaxableCompensations = sequelize.define('PayrollNonTaxableCompensations', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'allowance_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'sick_leave_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'vacation_leave_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'holiday_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'other_salary_wages_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
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
    tableName: "payroll_non_taxable_compensations",
    timestamps: false
  });

  PayrollNonTaxableCompensations.associate = (models) => {
    PayrollNonTaxableCompensations.belongsTo(models.Payrolls, {
      foreignKey: 'payroll_id',
      as: 'payrolls'
    });
    PayrollNonTaxableCompensations.belongsTo(models.Employees, {
      foreignKey: 'employee_id',
      as: 'employees'
    });
    PayrollNonTaxableCompensations.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  return PayrollNonTaxableCompensations;
};