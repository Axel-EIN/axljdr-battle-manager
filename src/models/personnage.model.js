export default (sequelize, DataTypes) => {
    sequelize.define(
        'Personnage',
        {
            nom: {
                type: DataTypes.STRING,
                allowNull: false
            },
            prenom: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            illustration: {
                type: DataTypes.STRING,
                allowNull: true
            },
            portrait: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamp: true,
        }
    );
};