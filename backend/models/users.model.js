module.exports = (sequelize, Sequelize) => {
  const USERS = sequelize.define("users", {
    usr_identification: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    usr_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    usr_email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    usr_password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    usr_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    usr_token: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    usr_created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  });
  return USERS;
};
