let crypto = require("crypto");
let dbMan = require('./QueryBuilder');

let db = new dbMan();

let psHash = (arr= []) =>{
    let hash = crypto.createHmac("sha256","salt");
    hash.update(arr['uPassword']);
    arr['uPassword'] = hash.digest('hex');
    return arr;
};
let login = async (user ={})=>{
    user = db.mute(user,[],['submit']);
    let res = await db.transaction(db.slct('id',"users",db.ex_key(user,[]),db.ex_val(user,[])));

};

let auth = async (user,operation)=>{
    let success = false;
    switch (operation.toLowerCase()) {
        case "put":
            user = psHash(user);
            user = db.mute(user,[],['submit']);
            let res = await db.transaction(db.insert("users",db.ex_key(user,[]),db.ex_val(user,[])));
            success =  (!isNaN(res));
            break;
        case "post":
            login(user);
            break;
        case "delete":
            break;
        case "update":

    }
    return success;
};

module.exports = auth;