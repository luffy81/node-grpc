// grpcClient.js
const grpc = require("@grpc/grpc-js");
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATHS = require('./protos');
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATHS, options);
// const protos = grpc.loadPackageDefinition(packageDefinition).OrderService;
const protos = grpc.loadPackageDefinition(packageDefinition);

module.exports.orderService = new protos.OrderService('localhost:50051', grpc.credentials.createInsecure());
module.exports.productService = new protos.ProductService('localhost:50051', grpc.credentials.createInsecure());