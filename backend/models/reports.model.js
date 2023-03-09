module.exports = (sequelize, Sequelize) => {
  const REPORTS = sequelize.define("users", {
    rpt_identification: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    rpt_email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    rpt_route: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    rpt_kilometer: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rpt_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rpt_description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    rpt_created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  });
  return REPORTS;
};
