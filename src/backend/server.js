const app = require("./app");
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

//Handle uncaught exception
process.on('uncaughtException', err => {
  console.log(`ERROR ${err.stack}`);
  console.log(`Shuting down server due to uncaught exception`);
  process.exit(1)
}) 
//setting up config file
dotenv.config({path:'src/backend/config/config.env'});


//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER IS STARTED ON PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

//Handler unhandled promise rejection
process.on('unhandledRejection',err =>{
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server due to unhandled promise rejection`);
  server.close(() =>{
    process.exit(1)
  })
})
