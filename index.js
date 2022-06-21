require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var port = server.listen(process.env.PORT || 6969);
const Result = require('./models/result.model');
const { exportResultToExcel } = require('./utils/exportData.js'); 
const { exportAllResultToExcel } = require('./utils/exportData.js');
const cors = require('cors');

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://phamlong:12112002@cluster1.pphau.mongodb.net/ai2048?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas.");
  })
  .catch((err) => {
    console.log("Error occurred connecting to MongoDB Atlas", err);
  });

app.get('/', (req, res) => {
  res.send("Hello, World!"); 
})

app.post('/api/v1/add-result/minimax', async (req, res) => {
  try{
    const result = new Result({
        score: req.body.score,
        algorithm: "minimax",
        maxDepth: req.body.maxDepth,
        iterations: req.body.iterations,
        simulationDepth: req.body.simulationDepth,
        maxTile: req.body.maxTile
    })

    await result.save();
    console.log(result);
    res.json({message: "Successfully", result});
  }catch(err){
    res.json({message: err});
    return;
  }
})

app.post('/api/v1/add-result/expectimax', async (req, res) => {
  try{
    const result = new Result({
        score: req.body.score,
        algorithm: "expectimax",
        maxDepth: req.body.maxDepth,
        iterations: req.body.iterations,
        simulationDepth: req.body.simulationDepth,
        maxTile: req.body.maxTile
    })

    await result.save();
    console.log(result);
    res.json({message: "Successfully", result});
  }catch(err){
    res.json({message: err});
  }
})

app.post('/api/v1/add-result/mcts', async (req, res) => {
  try{
    const result = new Result({
        score: req.body.score,
        algorithm: "mcts",
        maxDepth: req.body.maxDepth,
        iterations: req.body.iterations,
        simulationDepth: req.body.simulationDepth,
        maxTile: req.body.maxTile
    })

    await result.save();
    console.log(result);
    res.json({message: "Successfully", result});
  }catch(err){
    res.json({message: err});
  }
})

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

app.get('/api/v1/get-results', async (req,res) => {
  const options = {
      "method": "GET",
  };

  var results = await Result.find({});
  
      const workSheetColumnName = [
          "Score",
          "Algorithm",
          "Max depth",
          "Iterations",
          "Simulation depth",
          "Max tile"
      ]
      const workSheetName = "Results";
      const filePath = './outputFiles/' + "results" + ".xlsx";
      exportAllResultToExcel(results, workSheetColumnName, workSheetName, filePath);
      res.json({message: 'Results exported successfully'});
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})