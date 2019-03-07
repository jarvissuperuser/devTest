let fs = require("fs-extra")

function term_run(cmd,args) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";
    fs.writeFileSync('db.ready',"yes");
    child.kill(0);
}

term_run( "sh", ["post.exec.sh"]);