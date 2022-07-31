const express = require('express')
const router = express.Router()
const {Transaction} = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware")

// router.post("/:id", validateToken, async(req, res) => {
//     const UserId = req.user.id
//     const Found = await Products.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
//     if(!Found){
//         return res.status(404).json({msg: "No Product found"})
//     } else{
//         // const cart = Found
//         // cart.UserId = UserId
//         // cart.ProductId = ProductId
//         await Cart.create({
//             titleParfum: Found.title,
//             urlParfum: Found.urlPic,
//             sumParfum: 1,
//             priceParfum: Found.priceMl,
//             ProductId: Found.id,
//             UserId: UserId,
//         })
//         res.status(200).json({msg: "Add Product Successfull"})
//     }
//     // res.json(Found.urlPic)
//     // con
// })

// // belum nampilin cart satu user 
// router.get("/", async(req, res) => {
//     // const UserId = req.user.id
//     // const Found = await Products.findAll({
//     //     where: {
//     //         UserId: UserId
//     //     }
//     // })
//     // if(!Found){
//     //    res.status(404).json({msg: "No Product found"})
//     // } else{
//     //     res.json(Found)
//     // }
//     const keranjang = await Cart.findAll()
//     res.json(keranjang)
// })

router.post("/add", async (req, res) => {
    const {fullName, alamat, noHp, harga, jumlah, kurir, totalHarga} = req.body
    await Transaction.create({
        fullName: fullName,
        totalHarga: harga*jumlah,
        alamat: alamat,
        noHp: noHp,
        kurir: kurir,
        totalHarga: totalHarga
    })
    res.json("Success")
});

module.exports = router