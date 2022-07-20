const express = require('express')
const {
    getProducts, 
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
    } = require('../controllers/ProductController')
const router = express.Router()
const {Products} = require('../models')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const e = require('express')

// router.get('/products', getProducts)
router.get('/products', async (req, res) => {
    const product = await Products.findAll()
    res.json(product)
})
router.get('/products/:id', async (req, res) => {
    try {
        const response = await Products.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
})
router.post('/', async (req, res) => {
        if(req.files === null){
            return res.status(400).json({msg: "No File Uploaded"})
        } else{
            const title = req.body.title
            const priceMl = req.body.priceMl
            const descripsi = req.body.descripsi
            const stokMl = req.body.stokMl
            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            const fileName = file.md5 + ext
            const image = fileName
            const urlPic = `${req.protocol}://${req.get("host")}/images/${fileName}`
            const allowedType = ['.png', '.jpg', '.jpeg']
    
            if(!allowedType.includes(ext.toLowerCase())){
                return res.status(422).json({msg: "Invalid image"})
            }
            if(fileSize > 5000000){
                return res.status(422).json({msg: "Image must be less than 5 MB"})
            }
            else{
                file.mv(`./public/images/${fileName}`, async(err) => {
                    if(err){
                        return res.status(500).json({msg: err.message})
                    }else{
                        try {
                            await Products.create({
                                title: title,
                                image: image,
                                priceMl: priceMl,
                                descripsi: descripsi,
                                stokMl: stokMl,
                                urlPic: urlPic
                            })
                            res.json("Product created successfuly")
                        } catch (error) {
                            console.log(error.message)
                        }
                    }
                })
            }
        }
})
router.patch('/products/:id', async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!product){
        return res.status(404).json({msg: "No Data found"})
    } 
    else{
        let fileName = ""
        if(req.files === null){
            fileName = product.image
        }
        else{
            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg', '.mp4']
            if(!allowedType.includes(ext.toLowerCase())){
                return res.status(422).json({msg: "Invalid image"})
            }
            if(fileSize > 5000000){
                return res.status(422).json({msg: "Image must be less than 5 MB"})
            } else{
                const filepath = `./public/images/${product.image}`
                fs.unlinkSync(filepath)
                file.mv(`./public/images/${fileName}`, (err) => {
                    if(err){
                        return res.status(500).json({msg: err.message})
                    }
                })
            }

        }
        const title = req.body.title
        const priceMl = req.body.priceMl
        const descripsi = req.body.descripsi
        const stokMl = req.body.stokMl
        const urlPic = `${req.protocol}://${req.get("host")}/images/${fileName}`
        try {
            await Products.update({
                title: title,
                image: fileName,
                priceMl: priceMl,
                descripsi: descripsi,
                stokMl: stokMl,
                urlPic: urlPic
            }, {where: {
                id: req.params.id
            }})
            res.status(200).json({msg: "Product Updated Success"})
         } catch (error) {
            console.log(error.message)
        }
    }
    

})
router.delete('/products/:id', async(req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!product){
        return res.status(404).json({msg: "No Data Found"})
    }else{
        try {
            // delete file in folder
            // D:\project\mpti\server\public\images
            const filepath = `./public/images/${product.image}`
            fs.unlinkSync(filepath)

            // delete file in database
            await Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Product Deleted Success"})
        } catch (error) {
            console.log(error.message)
        }
    }
})

// router.post("/", async (req, res) => {
//     const {title, priceMl,descripsi, stokMl, urlPic} = req.body
//     await Products.create({
//         title: title,
//         priceMl: priceMl,
//         descripsi: descripsi,
//         stokMl: stokMl,
//         urlPic: urlPic
//     })
//     res.json("success")
// })



module.exports = router