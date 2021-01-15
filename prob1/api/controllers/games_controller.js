const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getGames = function(req, res) {
  let isParamsErrors = false;
  const response = {
    status: 200,
    message: {}
  }
  let offset = 0;
  let count = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    console.log(count);
    count = parseInt(req.query.count);
  }
  if (isNaN(offset) || isNaN(count)) {
    response.status = 400;
    response.message = {message: "Offset and Count must be number"}
    isParamsErrors = true;
  }

  if (isParamsErrors) {
    res.status(response.status).json(response.message);
    return;
  }

  Game.find().skip(offset).limit(count).exec(function(err, games) {
    response.message = games;
    if (err) {
      response.status = 500;
      response.message = {message: err};
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.getGame = function(req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function(err, game) {
    const response = {
      status: 200,
      message: game
    }
    if (err) {
      response.status = 500;
      response.message = {message: err};
    } else {
      if (!game) {
        response.status = 404;
        response.message = {message: "Game ID not found"};
      }
    }
    res.status(response.status).json(response.message);
  });
}