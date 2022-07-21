const express = require('express')
const {Transaction} = require('../models')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.post('/', async (req, res) => {
    if(req.files === null){
        return res.status(400).json({msg: "No File Uploaded"})
    } else{
        const namaParfum= req.body.namaParfum
        const file= req.files.file
        const ext = path.extname(file.name)
        const fileName = file.md5 + ext
        const buktiTf = fileName
        const urlBuktiTf = `${req.protocol}://${req.get("host")}/bukti/${fileName}`
        const allowedType = ['.png', '.jpg', '.jpeg']
        const harga= req.body.harga
        const jumlah= req.body.jumlah
        const totalHarga= req.body.totalHarga
        const email= req.body.email
        const alamat= req.body.alamat
        const noHp= req.body.noHp

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

module.exports = router