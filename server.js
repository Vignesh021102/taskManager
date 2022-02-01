const express = require("express");
const randomString = require("./modules/randomString")
const findAndReplace = require("./modules/findAndReplace")
const fs = require("fs");
const sort = require("./modules/sort")
const findUser = require("./modules/findUser")


var app = express();
app.use("/public",express.static("taskManagerWithServer/signinAndLogin"));
app.use("/user",express.static("taskManagerWithServer/mainPage"));
app.use(express.json())



app.post("/addT",(req,res)=>{
    const ID = req.headers.cookie.match(/\d+/)[0]
    
    let Obj = {};
    let path = __dirname+"/Data.json";
    fs.readFile(path,(err,data)=>{
        if(err) return console.log(err);
        data = data.toString();
        data = JSON.parse(data);

        let obj = req.body;
        obj.id = randomString(10,true);
        findUser(data,ID).tasks.push(obj)
        sort(findUser(data,ID))
        data = JSON.stringify(data);
        fs.writeFile(path,data,(err)=>{if(err)console.log(err)
        res.send(data)
        res.end()
        })
    })
})

app.get("/getTs",(req,res)=>{
    const ID = req.headers.cookie.match(/\d+/)[0]
    
    let path = __dirname+"/Data.json";
    fs.readFile(path,(err,data)=>{
        if(err) return console.log(err);
        data = data.toString();
        data = JSON.parse(data)
        res.send(findUser(data,ID));
        res.end()
    })
})

app.post("/updateT",(req,res)=>{
    const ID = req.headers.cookie.match(/\d+/)[0];

    let path = __dirname+"/Data.json"
    fs.readFile(path,(err,data)=>{
        if(err) return console.log(err);
        data = data.toString();
        data = JSON.parse(data);
        findAndReplace(findUser(data,ID),req.body);
        sort(findUser(data,ID))
        res.send(findUser(data,ID));
        data = JSON.stringify(data);
        fs.writeFile(path,data,(err)=>{
            if(err)console.log(err);
        });
        res.end()
    })
});

app.post("/deleteT",(req,res)=>{
    const ID = req.headers.cookie.match(/\d+/)[0];

    let path = __dirname+"/Data.json"
    fs.readFile(path,(err,data)=>{
        if(err) return console.log(err);
        data = data.toString();
        data = JSON.parse(data);
        let obj = findUser(data,ID)
        sort(findUser(data,ID))
        for(let i in obj.tasks){
            if(obj.tasks[i].id == req.body.id){
                obj.tasks.splice(i,1);
            }
        }

        res.send(findUser(data,ID));
        data = JSON.stringify(data);
        fs.writeFile(path,data,(err)=>{
            if(err)console.log(err);
            res.end()
        });
        
    })
});

app.post("/signIn",(req,res)=>{
    let obj = req.body;
    obj.id = randomString(15,true);
    obj.tasks = [];
    res.send({id:obj.id});
    let path = __dirname+"/Data.json"
    fs.readFile(path,(err,data)=>{
        if(err) return console.log(err);
        data = data.toString();
        data = JSON.parse(data);
        data.users.push(obj);
        data = JSON.stringify(data)
        fs.writeFile(path,data,(err)=>{
            if(err)console.log(err);
        });
    });
});
app.post("/findId",(req,res)=>{
    let isFound = false; 
    fs.readFile(__dirname+"/Data.json",(err,data)=>{
        if(err)return console.log(err);
        data = data.toString();
        data = JSON.parse(data);
        data.users.forEach((x)=>{
            if(x.name === req.body.name && x.password === req.body.password){
                //console.log(x);
                isFound = true;
                res.send({id:x.id});
                res.end();
            }
        })
        if(!isFound){
            res.send({id:undefined});
            res.end();
        }
    })
})


const port = 500;
app.listen(port,(err)=>{
    if(err)console.log(err);
    console.clear();
    console.log(`starting port at ${port} http://localhost:${port}/public`)
});
