const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');
const CSRF = require('koa-csrf');
const path = require('path');
const views = require('koa-views')
const koaMount = require("koa-mount");

const app = new Koa();

const CONFIG = {
};
app.use(session(CONFIG, app));
app.use(views(path.join(__dirname,'./view'),{
	extension:'ejs'
}));

app.keys = [ 'a', 'b' ];
app.use(bodyParser());
const csrf = new CSRF({
	invalidTokenMessage: 'Invalid CSRF token',
	invalidTokenStatusCode: 403,
	excludedMethods: ["GET"],
	disableQuery: false
  });
  
app.use(csrf);
app.use(koaMount("/page", async(ctx)=>{
    await ctx.render('test', {csrf: ctx.csrf})
}));

app.use(koaMount("/rest", async(ctx)=>{
	console.debug("/rest");
    ctx.body = "success";
}));


app.listen(3000);
