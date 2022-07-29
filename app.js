const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res) {
const firstName= req.body.firstName;
const lastName= req.body.lastName;
const email= req.body.email;
const data={
  members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData= JSON.stringify(data);

const url= "https://us14.api.mailchimp.com/3.0/lists/a59d26d193";

const options= {
  method:"POST",
  auth: "Rajkuvarjit:bc4d3e5036358e2c0b1023955a325b88-us14"
};

const requests= https.request(url,options,function(response){
  response.on("data",function(data){
    const feedbackData=JSON.parse(data);
    console.log(feedbackData);
    const status = response.statusCode;
    if(status===200){
      res.sendFile(__dirname +"/success.html");
    }else{
      res.send(__dirname +"/failure.html");
    }
  });
});

requests.write(jsonData);
requests.end();

});


app.listen(3000,function(){
  console.log("server is running on port 3000");
});


//const url="https://us14.api.mailchimp.com/3.0/list/a59d26d193";
//auth: "Rajkuvar:bc4d3e5036358e2c0b1023955a325b88-us14"
