const epxress = require('express')
const cors = require('cors')
const FileUpload = require('express-fileupload')
// const bcrypt = require('bcrypt')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const saltRounds = 10
const app = epxress()

app.use(epxress.json())
app.use(FileUpload())
app.use(cors())
app.use(epxress.static("public"))

const db = require('./models')

// Routers
const usersRouter = require("./routes/Users")
app.use("/auth", usersRouter)
const productsRouter = require("./routes/Products")
app.use("/product", productsRouter)
const cartsRouter = require("./routes/Cart")
app.use("/cart", cartsRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001")
    })
})

// app.use(epxress.json())
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     methods: ["GET", "POST"],
//     credentials: true
// }))

// // for cookies login
// app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended: true}))

// app.use(session({
//     key: 'userId',
//     secret: 'subscribe',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 24,
//     }
// }))
// // End

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: '',
//     database: 'parfume',
//     port: 3307,
// })

// app.post('/register', (req, res) =>{
//     const username = req.body.username
//     const email = req.body.email
//     const password = req.body.password

//     bcrypt.hash(password, saltRounds, (err, hash) =>{
//         if(err){
//             console.log(err)
//         }
//         db.query("INSERT INTO users (username, email, password) VALUES (?,?,?)",
//         [username, email, hash],
//         (err, result) => {
//             console.log(err)
//         }
//         )
//     })
//     if(err){
//         console.log(err)
//     }
// })

// app.get("/login", (req, res) => {
//     if(req.session.user){
//         res.send({loggedInd: true, user: req.session.user})
//     } else{
//         res.send({loggedInd: false})
//     }
// })

// app.post("/login", (req, res) =>{
//     const email = req.body.email
//     const password = req.body.password

//     db.query(
//         "SELECT * FROM users WHERE email = ?",
//         [email, password],
//         (err, result) => {
//             if(err){
//                 res.send({err: err})
//             }
//             if(result.length > 0){
//                 bcrypt.compare(password, result[0].password, (error, response) => {
//                     if(response){
//                         req.session.user = result
//                         console.log(req.session.user)
//                         res.send(result)
//                     } 
//                     else{
//                         res.send({message: "Wrong username/password combination"})
//                     }
//                 })
//             } else{
//                 res.send({message: `User doesn't exist`})
//             }
//         }
//     )
// })

