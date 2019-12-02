'use strict';
module.exports = (sequelize, DataTypes) => {
  const PayrollTardiness = sequelize.define('PayrollTardiness', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'undertime': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'half_day': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'sick_leave': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'vacation_leave': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'holiday': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'absent': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_absent': {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      comment: 'Scope: Sick Leave, Vacation Leave, Holiday, Absent',
      defaultValue: '0.00'
    },
    'undertime_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'half_day_amount': {
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
    'absent_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_absent_amount': {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      comment: 'Scope: Sick Leave, Vacation Leave, Holiday, Absent',
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
    tableName: "payroll_tardiness",
    timestamps: false
  });

  PayrollTardiness.associate = (models) => {
    PayrollTardiness.belongsTo(models.Payrolls, {
      foreignKey: 'payroll_id',
      as: 'payrolls'
    });
    PayrollTardiness.belongsTo(models.Employees, {
      foreignKey: 'employee_id',
      as: 'employees'
    });
    PayrollTardiness.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  return PayrollTardiness;
};