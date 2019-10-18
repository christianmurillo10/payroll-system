'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeSalariesAndAllowances = sequelize.define('EmployeeSalariesAndAllowances', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'salary_amount': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: '0.00'
    },
    'allowance_amount': {
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
    'date_issued': {
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
    'is_current': {
      type: DataTypes.SMALLINT(1),
      comment: '0=No 1=Yes',
      allowNull: false,
      defaultValue: '1'
    },
    'is_deleted': {
      type: DataTypes.SMALLINT(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: "employee_salaries_and_allowances",
    timestamps: false
  });

  EmployeeSalariesAndAllowances.associate = (models) => {
    EmployeeSalariesAndAllowances.belongsTo(models.Employees, {
      foreignKey: 'employee_id',
      as: 'employees'
    });
    EmployeeSalariesAndAllowances.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  EmployeeSalariesAndAllowances.associate = (models) => {};

  return EmployeeSalariesAndAllowances;
};