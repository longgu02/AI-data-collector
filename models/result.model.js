const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    score: {
        type: Number, 
    },
    algorithm: {
        type: String,
        enum: ['minimax', 'expectimax', 'mcts']
    },
    maxDepth: {
        type: Number, 
    },
    iterations: {
        type: Number,
    },
    simulationDepth: {
        type: Number,
    },

});

module.exports = mongoose.model("Result", resultSchema);
