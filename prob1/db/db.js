const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/GamesDB";

require("../api/models/game_model");

mongoose.connect(dbURL);

mongoose.connection.on("connected", function() {
  console.log("Mongo connect to " + dbURL);
})
mongoose.connection.on("disconnected", function() {
  console.log("Mongo disconnected");
})
mongoose.connection.on("error", function(err) {
  console.log("Mongo connection error " + err);
})

process.on("SIGINT", function() {
  mongoose.connection.close(function(){
    console.log("Mongo disconnected by app termination");
    process.exit(0);
  });
})
process.on("SIGTERM", function() {
  mongoose.connection.close(function(){
    console.log("Mongo disconnected by app termination");
    process.exit(0);
  });
})
process.once("SIGUSR2", function() {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected by app termination");
    process.kill(process.pid, "SIGUSR2");
  });
})