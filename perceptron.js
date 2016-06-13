function Perceptron(numberOfWeights) {
  this.weights = [];
  for (var i = 0; i < numberOfWeights; i++) {
    this.weights[i] = Perceptron.randomPosNegFloat()
  }
  this.bias = Perceptron.randomPosNegFloat();
}

Perceptron.randomPosNegFloat = function randomPosNegFloat(){
  return Math.random() * 2 - 1;
}

Perceptron.prototype = {
  heaviside: function heaviside(value){
    return value < 0 ? 0 : 1;
  },

  process: function process(inputs){
    var sum = this.weights.reduce(function(prevWeight, curWeight, i){
      return prevWeight + (curWeight * inputs[i]);
    }, this.bias)

    return this.heaviside(sum)
  },

  adjust: function adjust(inputs, delta, learningRate){
    this.weights = this.weights.map(function(w, i){
      return w + (inputs[i] * delta * learningRate);
    })
    this.bias += delta * learningRate;
  }
}

module.exports = Perceptron;
