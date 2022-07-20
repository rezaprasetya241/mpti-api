module.exports = (sequelize, DataTypes) => {

    const Products = sequelize.define("Products", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priceMl: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descripsi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stokMl: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        urlPic: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Products.associate = (models) => {
        Products.hasMany(models.Cart, {
            onDelete: "cascade",
        })
    }
    // Posts.associate = (models) => {
    //     Posts.hasMany(models.Comments, {
    //         onDelete: "cascade",
    //     })

        
    //     Posts.hasMany(models.Likes, {
    //         onDelete: "cascade",
    //     })
    // }
    return Products
}