'use strict';
module.exports = (sequelize, DataTypes) => {
  const PayrollWorkingDays = sequelize.define('PayrollWorkingDays', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'regular_day': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'special_day': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      comment: 'Sunday/Rest/Special day',
      defaultValue: '0.00'
    },
    'special_day_ford': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      comment: 'Special day falling on rest day',
      defaultValue: '0.00'
    },
    'holiday': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'holiday_ford': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      comment: 'Holiday falling on rest day',
      defaultValue: '0.00'
    },
    'double_holiday': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'double_holiday_ford': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      comment: 'Double Holiday falling on rest day',
      defaultValue: '0.00'
    },
    'regular_day_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'special_day_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'special_day_ford_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'holiday_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'holiday_ford_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'double_holiday_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'double_holiday_ford_amount': {
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
    tableName: "payroll_working_days",
    timestamps: false
  });

  PayrollWorkingDays.associate = (models) => {
    PayrollWorkingDays.belongsTo(models.Payrolls, {
      foreignKey: 'payroll_id',
      as: 'payrolls'
    });
    PayrollWorkingDays.belongsTo(models.Employees, {
      foreignKey: 'employee_id',
      as: 'employees'
    });
    PayrollWorkingDays.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  return PayrollWorkingDays;
};