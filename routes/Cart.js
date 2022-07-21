const express = require('express')
const router = express.Router()
const {Cart, Products} = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware")

router.post("/:id", validateToken, async(req, res) => {
    const UserId = req.user.id
    const Found = await Products.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!Found){
        return res.status(404).json({msg: "No Product found"})
    } else{
        // const cart = Found
        // cart.UserId = UserId
        // cart.ProductId = ProductId
        await Cart.create({
            titleParfum: Found.title,
            urlParfum: Found.urlPic,
            sumParfum: 1,
            priceParfum: Found.priceMl,
            ProductId: Found.id,
            UserId: UserId,
        })
        res.status(200).json({msg: "Add Product Successfull"})
    }
    // res.json(Found.urlPic)
    // con
})
router.get("/", async(req, res) => {
    
})

module.exports = router