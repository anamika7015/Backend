// const { log } = require('console')
// const http = require('http') // server creation
// const server = http.createServer((req,res)=>{

//     // console.log(req.url);  //create route by defalut (/)

//     if(req.url == "/about"){
        
//         res.end("the about page")  // find any kind of request then give response hello world
//     }
//     if(res.url == "/profile"){
//         res.end("the profile page")
//     }

    
// }
// )

// server.listen(3000)


/////////////////////////// express /////////////////////////////////
const express = require('express');
const morgan = require('morgan')
const app = express()

const userModel = require('./models/user')
const dbConnection = require('./config/db')

app.use(morgan('dev'))

app.set("view engine",'ejs')
app.get('/',
    
//     (req,res,next)=>{

//     const a= 5 ;
//     const b= 10;
//     console.log(a+b);
//     next()
    
// },


(req,res)=>{
    res.render('index')
})

app.use(express.json())                 //start
app.use(express.urlencoded({extended:true}))  // built in middleware
app.use(express.static("public"))


// app.use((req,res,next)=>{
//     console.log("this is middleware");
//     res.send(" inside middleware")
    
// })

app.get('/', (req,res) =>
{
    res.send("hello world")
})
app.get('/about',(req,res)=>{
    res.send("about page")
})
app.get('/register',(req,res)=>{
    res.render("register")
})

app.post('/register',async(req,res)=>{
    const{username, email, password}= req.body

    await userModel.create({
        username : username,
        email : email,
        password : password
    })
    res.send("data recieved")
    
}),

// app.get('/get-form-data',(req,res)=>{
//     console.log(req.query);          //inthis data are shows in url and work for server to frontend
//     res.send('data recieved')
    
// })

 app.get('/get-users',(req , res) =>
 {
//     userModel.find().then((users)=>{
//         res.send(users)        // this method is used to read the data from database
//     })

////////////another method//////////////////////

userModel.findOne({
    username: 'a'
}).then((user)=>{
res.send(user)
})
 })


 //////////////////////update///////////////////

 app.get('/update-user',async(req,res)=>{
   await userModel.findOneAndUpdate({
        username :'a'
    },{
        email: "c@1323"
    })
    res.send("user updated")
 })


 ///////////////////////DELETE OPERATION///////////////////

 app.get('/delete-user',async(req,res)=>{
          await userModel.findOneAndDelete({
            username : "a"
          })
          res.send("user deleted")
 })

app.post('/get-form-data',(req,res)=>{
    console.log(req.body);              //dont show data in url and work for frontend to backend
    res.send('data recieved')
    
})




app.listen(3000)