const grpc = require("@grpc/grpc-js");
const protoLoader = require('@grpc/proto-loader');

const OrderService   = require('./services/order.service');
const ProductService = require('./services/product.service');

const PROTO_PATH = require('./protos');
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const protos = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// Add orderProto and productProto to the gRPC server
server.addService(protos.OrderService.service, new OrderService());
server.addService(protos.ProductService.service, new ProductService());

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server at port:", port);
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
    }
);