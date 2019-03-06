let crypto = require("crypto");
let dbMan = require('./QueryBuilder');

let db = new dbMan();

let psHash = (arr= []) =>{
    let hash = crypto.createHash("sha256");
    hash.update(arr[3]);
    arr[3] = hash.digest('hex');
    return arr;
};
let login = ()=>{};
let UserCol = ["uName","nSurname","uEmail","uPassword"];
let auth = async (user,operation)=>{
    let success = false;
    switch (operation.toLowerCase()) {
        case "put":
            user.vals = psHash(user.vals);
            db.insert("users",userCol,user.vals);
            break;
        case "post":

            break;
        case "delete":
            break;
        case "update":

    }
    return success;
};

module.exports = auth;