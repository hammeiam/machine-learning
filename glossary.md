weight:
A value indicating the extent to which an input activation is considered by a neuron.
Can be positive or negative with no bounds.

bias:
A value connected to a layer of neurons through a weight (just like an input activation)
which serves to improve the accuracy of the activation function by shifting the function
to the left or right on a graph. More info:
http://stackoverflow.com/questions/2480650/role-of-bias-in-neural-networks

activation:
A value returned from a neuron (input activation, output activation)

activation function:
A function used to transform the activation level of neuron (weighted sum of inputs) to an
output signal (usually btw -1 and 1)

activation level:
In a neuron, the sum of that layer's bias and the product of an input times its corresponding weight for all inputs. (bias + E(i * w))

cost function / error function:
A function used to determine how far away from the correct answer the found solution was.
For this, the squared error function is used. To find the total error of the network,
take the sum of each output node's squared error. (E 1/2(target - output)^2)

gradient descent:
By looking at the derivative of our error function with respect to each weight,
we learn if we find a value at which the error resulting from the given weight is minimized.

derivative:
Note: the derivative of a function is identical to the partial derivative of
that function if it only has one parameter. 


stochastic/online gradient descent:
Rather than performing gradient descent with the mean of the descent of all parameters,
iterate through each parameter in arbitrary order and move towards the descent of just that
parameter. Is more performant when you have a large number of parameters.

backpropogation:
The process of

layer:
In a neural net, a set of neurons that have the same inputs and bias,
but do not communicate with each other. eg the output layer.

hidden layer:
Any layer of nodes between the input layer and the output layer.

Backprop steps:
- have an error function E 1/2(target - actual)^2 for all output nodes
- for each output, calculate the partial derivative of the error with respect to each weight
- perform gradient descent to determine how much that weight should be changed by
