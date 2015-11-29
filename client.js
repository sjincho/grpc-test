
// Almost idential to:
// https://github.com/grpc/grpc/blob/master/examples/node/greeter_client.js

var PROTO_PATH = __dirname + '/sample.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

function main() {
  var client = new hello_proto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());
  function doSayHello() {
    process.stdout.write('.');
    client.sayHello({name: 'hello'}, function() {
      setTimeout(doSayHello, 50);
    });
  }
  doSayHello();
}

main();
