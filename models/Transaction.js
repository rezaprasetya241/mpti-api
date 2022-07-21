module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define("Transaction", {
        namaParfum: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        buktiTf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlBuktiTf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalHarga: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        noHp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Cart
}