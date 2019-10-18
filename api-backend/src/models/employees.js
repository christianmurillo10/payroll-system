'use strict';
const bcrypt = require('../helpers/bcrypt-helper');

module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define('Employees', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'employee_no': {
      type: DataTypes.STRING(50), 
      allowNull: false
    },
    'firstname': {
      type: DataTypes.STRING(50), 
      allowNull: false
    },
    'middlename': {
      type: DataTypes.STRING(50), 
      allowNull: false
    },
    'lastname': {
      type: DataTypes.STRING(50), 
      allowNull: false
    },
    'primary_address': {
      type: DataTypes.STRING(100), 
      allowNull: false
    },
    'secondary_address': {
      type: DataTypes.STRING(100), 
      allowNull: true
    },
    'email': {
      type: DataTypes.STRING(50), 
      allowNull: false
    },
    'mobile': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'landline': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'tin_no': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'sss_no': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'philhealth_no': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'pagibig_no': {
      type: DataTypes.STRING(50),
      allowNull: true
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
    'user_id': {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'users',
        key: 'id'
      },
      comment: 'refd to users.id',
      allowNull: false
    },
    'birthdate': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    'date_start': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    'date_endo': {
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
    'is_active': {
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
    tableName: "employees",
    timestamps: false
  });

  Employees.associate = (models) => {
    Employees.belongsTo(models.PayFrequencies, {
      foreignKey: 'pay_frequency_id',
      as: 'payFrequencies'
    });
    Employees.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users'
    });
  };

  Employees.beforeCreate(async (value, options) => {
    value.password = await bcrypt.hashPassword(value.password);
  })

  return Employees;
};