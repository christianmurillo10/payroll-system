'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payrolls = sequelize.define('Payrolls', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'basic_salary_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'fixed_allowance_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'daily_allowance_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'daily_rate_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_working_day_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_night_differential_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_overtime_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_other_salary_and_wages_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      comment: 'payroll_other_salaries_and_wages (taxable)',
      defaultValue: '0.00'
    },
    'total_tardiness_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'gross_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'total_non_taxable_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      comment: 'payroll_other_salaries_and_wages (non-taxable)',
      defaultValue: '0.00'
    },
    'total_deduction_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'net_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
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
    'date_from': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    'date_to': {
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
    tableName: "payrolls",
    timestamps: false
  });

  Payrolls.associate = (models) => {
    Payrolls.belongsTo(models.Employees, {
      foreignKey: 'employee_id',
      as: 'employees'
    });
    Payrolls.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  return Payrolls;
};