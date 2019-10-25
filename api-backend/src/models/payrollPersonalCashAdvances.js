'use strict';
module.exports = (sequelize, DataTypes) => {
  const PayrollPersonalCashAdvances = sequelize.define('PayrollPersonalCashAdvances', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'amount': {
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
    'date': {
      type: DataTypes.DATEONLY,
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
    tableName: "payroll_personal_cash_advances",
    timestamps: false
  });

  PayrollPersonalCashAdvances.associate = (models) => {
    PayrollPersonalCashAdvances.belongsTo(models.Payrolls, {
      foreignKey: 'payroll_id',
      as: 'payrolls'
    });
    PayrollPersonalCashAdvances.belongsTo(models.Employees, {
      foreignKey: 'employee_id',
      as: 'employees'
    });
    PayrollPersonalCashAdvances.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  return PayrollPersonalCashAdvances;
};