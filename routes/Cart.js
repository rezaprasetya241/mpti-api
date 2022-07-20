const express = require('express')
const router = express.Router()
const {Cart, Products} = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware")

router.get("/carts/:id", async(req, res) => {
    const id = req.params.id
    // const UserId = req.user.id
    const cart = await Products.findOne({
        where: {
            id: id
        }
    })
    res.json(cart)
    // con
})


module.exports = router