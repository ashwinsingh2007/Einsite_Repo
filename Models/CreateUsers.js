"use strict"
const crypto = require('crypto'); 
var Client = require('node-rest-client').Client;
var mysql = require('mysql');
//Config here.
//Config the host,user,password,database credentials here.
var con = mysql.createPool({
    connectionLimit: 10,
    host: "",
    user: "",
    password: "",
    database: ""
});
var CreateUsers = function(body,callback) {
    var firstname= body.firstname;
    var lastname = body.lastname; 
    var email = body.email;
    var password = body.password;
 
    var cipher = crypto.createCipher('aes192', 'password');  
    var encryptedPassword = cipher.update(password, 'utf8', 'hex');  
    encryptedPassword += cipher.final('hex');  
    var query = "insert into stockusers values ('" + firstname + "','" + lastname + "','" + email + "','" + encryptedPassword + "');"
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
          callback(false);
        } else {
            console.log("Succesfull User Account Created !!");
            callback(true);
        }
    })
}
var insertData = function(APIData,TimeStamp,callback) {
    for(var ind=0;ind<APIData.length;ind++){
        console.log(APIData[ind].t);
        var Ticker=APIData[ind].t;
        var lastprice=APIData[ind].l;
        var query = "update `table 1` set `"+TimeStamp+"`="+lastprice+" where Symbol='"+Ticker+"'";
        console.log(query);
       con.query(query, function(err, result) {
            if (err) {
                console.log(err);
            callback(false);
            } else {
                console.log("Succesfull User Account Created !!");
                callback(true);
            }
        })
    }
 
}
var updateData = function(index){
    var query = "select Symbol from `table 1`";
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            var url="http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A";
            console.log(result.length);
            for(var ind=0;ind<200;ind++){
                if(ind==result.length-1){
                    url=url+result[ind].Symbol;  
                }else{
                    url=url+result[ind].Symbol+","
                }               
            }
            console.log(url);
            var client = new Client();
            var APIdata=null;
            client.get(url,
            function (data, response) {
                console.log(data.toString());                       
                APIdata=data.toString().split('//')[1];
                APIdata=JSON.parse(APIdata);
                console.log(APIdata);
                insertData(APIdata,index,function(result){               
                });
            })
        }
    })

}
var authorizeUser=function(body,callback){  
    var password = body.passwordLogin;  
    var query = "select password from stockusers where email='"+body.emailLogin+"'";

    console.log(query);
    con.query(query, function(err, result) {
        if (err || result.length <= 0) {
            console.log(err);
            callback(false);
        } else {
            var decipher = crypto.createDecipher('aes192', 'password');  
            var encrypted = result[0].password;  
            var decrypted = decipher.update(encrypted, 'hex', 'utf8');  
            decrypted += decipher.final('utf8');   
            if(decrypted==password){
                console.log(result);
                console.log("Succesfull User Account found !!");
                callback(true);
            }else{
                callback(false);
            }
            
        }
    })
}
var getCompanyDetails=function(res,callback){
    var query = "select * from `table 1` limit 1000;"
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            res.setHeader("Content-Type", "text/json");
            console.log(result);
            res.send(result);
            callback(true);
        }
    })
}
var getCompanyDetailsByName=function(res,callback){
    var query = "select * from `table 1` where name like "+
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            res.setHeader("Content-Type", "text/json");
            console.log(result);
            res.send(result);
            callback(true);
        }
    })
}
exports.CreateUsers=CreateUsers;
exports.insertData=insertData;
exports.updateData=updateData;
exports.authorizeUser=authorizeUser;
exports.getCompanyDetails=getCompanyDetails;
exports.getCompanyDetailsByName=getCompanyDetailsByName;
