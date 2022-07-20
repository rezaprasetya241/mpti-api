module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define("Cart", {
        titleParfum: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlParfum: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sumParfum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priceParfum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })

    return Cart
}