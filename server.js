
// Almost idential to:
// https://github.com/grpc/grpc/blob/master/examples/node/greeter_server.js

var PROTO_PATH = __dirname + '/sample.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

var largeText = '';
for (var i = 0; i < 10 * 1000; i++) {
  largeText += '0123456789';
  // largeText will be 10 * 10 * 1000 = 100k
}

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  // Create a very large response.
  callback(null, {message: largeText});
}

setInterval(function() {
  console.log(JSON.stringify(process.memoryUsage()));
}, 10 * 1000);

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addProtoService(hello_proto.Greeter.service, {sayHello: sayHello});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
