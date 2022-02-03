// when css was added
const path = require('path');
const express = require('express');
const session = require = require('express-session');
// connect handlebars.js as template engine choice
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(sessionStore);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialzed: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// turn on routes
app.use(routes);
// after connecting css
app.use(express.static(path.join(__dirname, 'public')));


// turn on connection to db and server
// connection with false
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// If we change the value of the force property to true, then the database connection must sync with the model definitions and associations.
// By forcing the sync method to true, we will make the tables re-create if there are any association changes.
// sequelize.sync({ force: true }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
// });
