const Sequelize = require('sequelize');

var sequelize = new Sequelize('d49eqe7m7bcr7n', 'wpyodtdrharafm', '4e66a57695c822bed35ee49d0889e0689c1a40b3e6209a968ae1766b675b430c', {     
    host: 'ec2-107-22-183-40.compute-1.amazonaws.com',     
    dialect: 'postgres',     
    port: 5432,     dialectOptions: {         
        ssl: true     
    },
    operatorsAliases: false
}); 

sequelize
.authenticate()
.then(function() {
    console.log('Connection has been established successfully.');
})
.catch( (err) => {
    console.log('Unable to connect to the database:', err);
});

const Reports = sequelize.define('Reports', {
    location :
    {
        latitude : Sequelize.DOUBLE,
        longtitude : Sequelize.DOUBLE,
        locationName : Sequelize.String
    },

    type : Sequelize.String,
    message : Sequelize.String,
    datePosted : Sequelize.DATE,
    resolved : Sequelize.BOOLEAN,
    upvote : Sequelize.INTEGER,
    downvote : Sequelize.INTEGER
});

