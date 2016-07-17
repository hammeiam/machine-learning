var Neuron = require('./Neuron');

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
      // layers[i] is the number of outputs from the previous layer
      nodes.push(new Neuron(layers[i]));
    }

    return nodes;
  })
}

FeedForwardNetwork.cost = function cost(value){
  // where value is a vector (0-1) from an output activation
  return -1 * Math.log(value)
}

FeedForwardNetwork.prototype = {
  train: function train(inputArr, answerArr, learningRate){
    // calculate error
    var rmse = 0; // root mean square error
    var resultArr = this.process(inputArr);
    for (var i = 0; i < resultArr.length; i++) {
      var delta = answerArr[i] - resultArr[i];
      rmse += delta * delta;
    }
    rmse /= resultArr.length;
    rsme = Math.sqrt(rsme);

    // adjust output layer


    // adjust hidden layers
  },

  totalError: function totalError(answerArr){
    var outputLayer = this.layers[this.layers.length - 1];
    return outputLayer.reduce(function(prevNodeError, node, i){
      return node.error(answerArr[i]) + prevNodeError;
    }, 0)
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
// console.log(a);
// console.log(a.layers[0]);
// console.log(a.layers[1]);
console.log(a.process([1,0]));
console.log('err');
console.log(a.totalError([1]));

module.exports = FeedForwardNetwork;
