const express=require("express")
const app=express()
const bodyParse=require("body-parser");
const https=require("https");
const { STATUS_CODES } = require("http");
app.use(bodyParse.urlencoded({extended:true}))
app.set("view engine","ejs");


app.use(express.static("public"))
let city="";
let temp="";
let cloud="";


app.get("/",function(req,res){
    res.render("index",{city:city,temperature:temp,cloud:cloud})
})

app.get("/failure",function(req,res){
    res.render("failure")
})

app.post("/",function(req,res){
    let country=req.body.city;
    city=country;
    let temperature="";
    let descript="";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ country +"&appid=e1831d2456f2011fc4c6e04ae36c8bb2&units=metric";
    https.get(url,function(response){
       if(response.statusCode===200){
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            temperature=weatherData.main.temp;
            descript=weatherData.weather[0].description;
            temp=temperature;
            cloud=descript;
            
            res.redirect("/")
        })
       }
       else{
        res.redirect("/failure")
       }
       
    })
    
})

app.listen(3000,function(){
    console.log("the server is running on port 3000")
})