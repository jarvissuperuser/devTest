var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbcon = require("./sql_con_man");
let fs = require("fs-extra");
var app = express();


async function term_run(cmd,args) {
  if(!await fs.pathExists("db.ready")){
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";
    console.log("db.done");
    fs.writeFileSync("db.ready","yes");
  }
  else
  {
    console.log("db,done");
    //child.kill(0)
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let db = new dbcon("app.db");
let data = fs.readFileSync("startup");
db.multiquery(data.toString())
    .then((read)=>{
      term_run('sh',["post.exec.sh"])
    })
    .catch((e)=>{console.error(e)});
//db init

module.exports = app;
