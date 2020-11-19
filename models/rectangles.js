/* jshint indent: 2 */
module.exports = function (sequelize, Sequelize) {
  return sequelize.define(
    'rectangles',
    {
      rectangle_id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      width: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      colour: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      border_style: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      border_colour: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'rectangles',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'rectangle_id' }],
        },
      ],
    }
  );
};
