var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;
var db=require('./Models/CreateUsers');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
var index=0;
var _session=false;

//script to run on every 2 hours so to update database to have data for increase/decrease in stock price.
//start
//This function will help to bring data for 
try{
setInterval(function() {  
    var arrofTimeStamp=["LP9","LP11","LP13","LP15","LP17","LP19"];
    db.updateData(arrofTimeStamp[index]);
    index++;
    if(index>=6){
        index=0;
    }
}, (1000*60*60*2));
}
catch(ex){
    console.log(ex);
}
//End


//this is to render index page for login
app.get('/', function(req, res) {
    try{
        if(_session==false){
            res.sendFile(path.join(__dirname, './views', 'index.html'));
        }
        else{
            res.sendFile(path.join(__dirname, './views', 'stock.html'));
        }
    }
    catch(ex){
        console.log(ex);
    }    
})

//this page will login after successfull registration or sign in
app.get('/stock.html', function(req, res) {
    try{
        if(_session){
            res.sendFile(path.join(__dirname, './views', 'stock.html')); 
        }
        else{
            res.sendFile(path.join(__dirname, './views', 'index.html')); 
        }
    }
    catch(ex){
        console.log(ex);
    }
    
})

//this page will show analysis of stock price in database and api call.
app.get('/flot.html', function(req, res) {
    try{
        if(_session){
            res.sendFile(path.join(__dirname, './views', 'flot.html'));
        }
        else{
            res.sendFile(path.join(__dirname, './views', 'index.html'));
        }
    }
    catch(ex){
        console.log(ex);
    }  
})

//this page will show tables of records
app.get('/tables.html', function(req, res) {
    try{
        if(_session){
            res.sendFile(path.join(__dirname, './views', 'tables.html'),{data: req.body});
        }
        else{
            res.sendFile(path.join(__dirname, './views', 'index.html'));
        }
    }
    catch(ex){
        console.log(ex);
    }  
})

app.get('/logout.html', function(req, res) {
    try{
        _session=false;
        res.sendFile(path.join(__dirname, './views', 'index.html'));
    }
    catch(ex){
        console.log(ex);
    }
})

app.post('/stock', function(req, res) {
    try{
        if(_session==false){
            if(!!req.body.emailLogin){
                db.authorizeUser(req.body,function(result){
                    if(result){
                        _session=true;
                        res.sendFile(path.join(__dirname, './views', 'stock.html'));
                    }
                    else{
                        res.send('Wrong EmailId or Password !!');
                    }
                })
            }else{
                db.CreateUsers(req.body,function(result){
                    if (result) {   
                            _session=true;
                            res.sendFile(path.join(__dirname, './views', 'stock.html'));
                        } else {
                        res.send("Error occured !! May be credentials already used for 'email'");                
                        }
                })
            }       
        }
        else{
            res.end("Already Signed In. :)")
        }
    }
    catch(ex){
        console.log(ex);
    }
 
})
app.get('/getCompanyDetails', function(req, res) {
    try{
        if(_session==true){
            db.getCompanyDetails(res,function(result){
                if(result){               
                }
            })          
        }  
    }
    catch(ex){
        console.log(ex);
    }
})

app.get('/getCompanyDetailsByName', function(req, res) {
    try{
        if(_session==true){
            db.getCompanyDetailsByName(res,function(result){
                if(result){               
                }
            })          
        } 
    }
    catch(ex){

    }

})


app.listen(process.env.PORT || 5000, function() {
    console.log("Server Running......");
})