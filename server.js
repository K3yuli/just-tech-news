const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// when css was added
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// after connecting css
app.use(express.static(path.join(__dirname, 'public')));


// connect handlebars.js as template engine choice
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


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
