/*
  weight: strength of the connection btw an input and the neuron
  bias: impacts the value at which our outputActivation fn returns 0
    http://stackoverflow.com/questions/2480650/role-of-bias-in-neural-networks
  outputActivation: some function that transforms the preactivation into a result
*/

function Neuron(numberOfWeights) {
  numberOfWeights = numberOfWeights || 1;
  this.weights = [];
  for (var i = 0; i < numberOfWeights; i++) {
    this.weights[i] = Neuron.randomPosNegFloat();
  }
  this.bias = Neuron.randomPosNegFloat();
  this.value = 0;
}

Neuron.randomPosNegFloat = function randomPosNegFloat(){
  return Math.random() * 2 - 1;
}

// Output Activation Functions
Neuron.oafs = {
  heavisideStepFn: function heavisideStepFn(value){
    // useful for single-layer perceptrons where data is linearly seperable
    // http://stackoverflow.com/a/34470478/2179701
    return value < 0 ? 0 : 1;
  },

  sigmoid: function sigmoid(value){
    // plots a value to a point on a curve, btw 0 & 1
    // https://en.wikipedia.org/wiki/Logistic_function
    return 1 / (1 + Math.pow(Math.E, -1 * value));
  },

  tanh: function tanh(value){
    // plots a value to a point on a curve, btw -1 & 1
    return (Math.pow(Math.E, 2 * value) - 1) / (Math.pow(Math.E, 2 * value) + 1)
  }
}

Neuron.prototype = {
  preactivation: function preactivation(inputs){
    // sum the bias and product of all inputs and their corresponding weights
    return this.weights.reduce(function(prevValue, curWeight, i){
      return prevValue + (curWeight * inputs[i]);
    }, this.bias)
  },

  outputActivation: Neuron.oafs.sigmoid,

  process: function process(inputs){
    // the result of running the preactivation through our output activation function.
    var sum = this.preactivation(inputs);
    this.value = this.outputActivation(sum);

    return this.value;
  },

  adjust: function adjust(inputs, delta, learningRate){
    // implementation of the Widrow-Hoff Learning Rule
    learningRate = learningRate || 0.1;
    this.weights = this.weights.map(function(w, i){
      return w + (inputs[i] * delta * learningRate);
    })
    // TODO: move bias out of neuron, into FFN layer
    // http://stats.stackexchange.com/questions/185911/why-are-bias-nodes-used-in-neural-networks
    this.bias += delta * learningRate;
  }
}

var a = new Neuron(2)
for (var i = 0; i < 2000; i++) {
  var inputs;
  inputs = [0,0]
  a.process(inputs)
  a.adjust(inputs, 0 - a.value)

  inputs = [0,1]
  a.process(inputs)
  a.adjust(inputs, 0 - a.value)

  inputs = [1,0]
  a.process(inputs)
  a.adjust(inputs, 0 - a.value)

  inputs = [1,1]
  a.process(inputs)
  a.adjust(inputs, 1 - a.value)
  if(i % 400 === 0){
    console.log('Itr ', i);
    console.log(a.value);
    console.log(a.weights);
    console.log(a.bias);
    console.log(' ');
  }
}
console.log(a.process([1,1]));
console.log(a.process([0,1]));
console.log(a.process([1,0]));
console.log(a.process([0,0]));


module.exports = Neuron;
