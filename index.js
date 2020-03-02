require('./config/config');
const express = require('express');
const exphbs  = require('express-handlebars');
const handlebars  = require('handlebars');
const path    = require('path');
const morgan  = require('morgan');
const SHA256  = require("crypto-js/sha256");
const flash     = require('express-flash')
const cookieParser = require('cookie-parser');
const session   = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database }  = require('./keys');
//initialization
const app = express();

//settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
//app.set('view engine', 'handlebars');
//app.engine('handlebars', exphbs());
app.engine('.hbs', exphbs({
  defaultdLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(morgan('dev'));
app.use(cookieParser('BlockChainVote'))
app.use(session({
    secret: 'BlockChainVote',
    resave: false,
    saveUninitialized: false,
    store : new MySQLStore(database),
    cookie: { maxAge: 60000 }
}))


//Global Variables
app.use((req, res, next) =>{
  app.locals.success = req.flash('success');
  next();
});


//Routers
app.use(require('./routes'));
app.use('/votacion'    , require('./routes/Votacion'));
app.use('/candidatos'  , require('./routes/Candidatos'));
app.use("/estudiantes" , require('./routes/estudiantes'));

//public
app.use(express.static(path.join(__dirname, 'public')));
//star the server}

app.listen(process.env.PORT, () =>{
  console.log('Servidor Corriendo Puerto',process.env.PORT)
});
