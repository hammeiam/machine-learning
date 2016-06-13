var Perceptron = require('./Perceptron');

/*
2 input nodes, 1 hidden layer with 3 perceptrons, 1 output node
layers = [2, 3, 1]

*/

function FeedForwardNetwork(layers) {
  if(!layers || !(layers instanceof Array)){
    throw new TypeError('You must supply an array of layers')
    return
  }

  if(layers.length < 2){
    throw new Error('FeedForwardNetwork must have at least an input layer and an output layer')
    return
  }

  this.layers = layers.slice(1).map(function(layerNodeCount, i){
    // add nodes to each layer
    var nodes = [];
    for (var j = 0; j < layerNodeCount; j++) {
      nodes.push(new Perceptron(layers[i]));
    }

    return nodes;
  })
}

FeedForwardNetwork.prototype = {
  train: function train(inputArr, answerArr, learningRate){

  },

  process: function process(inputArr){
    return this.layers.reduce(function(prevLayerResults, currLayer, i){
      return currLayer.map(function(node){
        return node.process(prevLayerResults);
      })
    }, inputArr)
  }
}
a = new FeedForwardNetwork([2, 3, 3, 1])
console.log(a);
console.log(a.layers[0]);
console.log(a.layers[1]);
console.log(a.process([1,0]));

module.exports = FeedForwardNetwork;
