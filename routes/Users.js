const express = require("express")
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require("bcrypt")
const {validateToken} = require("../middlewares/AuthMiddleware")

const {sign} = require('jsonwebtoken')

router.post("/", async (req, res) => {
    const {username, email, password} = req.body
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            email: email,
            password: hash,
        })
        res.json("Success")
    })
})

router.post("/login", async (req, res) => {
    const {username, password} = req.body
    const user = await Users.findOne({where: {
        username: username
    }})

    if(!user){
        res.json({error: "User Doesn't Exist"}) 
    } else {
        bcrypt.compare(password, user.password).then(async (match) => {
            if(!match){
                res.json({error: "Wrong Username or Password"})
            } else {
                const accessToken = sign({username: user.username, email: user.email, id: user.id}, "importantsecret")
                res.json({token: accessToken, username: username, id: user.id})
            }
        })
    }
})
router.get('/', async(req, res) => {
    const user = await Users.findAll()
    res.json(user)
})
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
  })

module.exports = router