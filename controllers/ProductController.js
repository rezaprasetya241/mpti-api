const {Product} = require("../models")
const path = require('path')

const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll()
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}
const saveProduct = (req, res) => {
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
                        await Product.create
                    } catch (error) {
                        
                    }
                }
            })
        }
    }
}
const updateProduct = (req, res) => {

}
const deleteProduct = (req, res) => {

}

module.exports = {getProducts, getProductById, saveProduct, updateProduct, deleteProduct}