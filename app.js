const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
 var fname=req.body.firstname;
 var lname=req.body.lastname;
 var em=req.body.email;

 var data={
     members:[
         {
             email_address: em,
             status: "subscribed",
             merge_feilds:{
                 FNAME: fname,
                 LNAME: lname
             }
         }
     ]
 };
 var jsondata=JSON.stringify(data);
 const url="https://us1.api.mailchimp.com/3.0/lists/c54e247124";

 const options={
     method: "POST",
     auth:"sidkhuntia:980a5e88ed8ab7f86918ad50f6e6057c-us1"
 }

const request= https.request(url,options,function(response){
    response.on("data",function(data){
        console.log(JSON.parse(data));
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html"); 
        }
    });
});
    request.write(jsondata);
    request.end();

});


app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 5000,function(){
    console.log("Sever is running at port:5000 ");
});

// API Key
// 980a5e88ed8ab7f86918ad50f6e6057c-us1

//List id
//c54e247124