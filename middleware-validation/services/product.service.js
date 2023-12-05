// productService.js
const grpc = require("@grpc/grpc-js");
const { validate, ValidationError } = require('../validations/product.validation');

const order = [
    { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
];

const product = [
    { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
];

class ProductService {
    constructor() { }

    getUserById(call, callback) {
        // Implementation logic for getUserById
    }

    getAllStream(call) {
        for (const iterator of product) {
            call.write(iterator);
        }
        // for (let i = 1; i <= 5; i++) {
        //     call.write({ message: `Data ${i}` });
        // }
        call.end();
    }

    getAll(_, callback) {
        callback(null, { product });
    }

    getByid(_, callback) {
        const orderId = _.request.id;
        const orderItem = order.find(({ id }) => orderId == id);
        callback(null, orderItem);
    }

    delete(_, callback) {
        const orderId = _.request.id;
        order = order.filter(({ id }) => id !== orderId);
        callback(null, {});
    }

    edit(_, callback) {
        const orderId = _.request.id;
        const orderItem = order.find(({ id }) => orderId == id);
        orderItem.body = _.request.body;
        orderItem.postImage = _.request.postImage;
        orderItem.title = _.request.title;
        callback(null, orderItem);
    }

    add(call, callback) {
        try {
            const req = call.request;
            validate(req);

            // Validation passed, continue processing
            let _order = { id: Date.now(), ...req };
            order.push(_order);
            callback(null, _order);
        } catch (error) {
            console.log('error:', error)
            if (error instanceof ValidationError) {
                const errorMetadata = new grpc.Metadata();
                errorMetadata.add('error-validation', JSON.stringify(error.details) );
                // Custom validation error handling
                return callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    details: 'Validation error',
                    // metadata: { details: JSON.stringify(error.details) },
                }, null, errorMetadata);
            } else {
                // Handle other errors
                console.error(error);
                return callback({
                    code: grpc.status.UNKNOWN,
                    details: 'Internal Server Error',
                });
            }
        }
    }
}

module.exports = ProductService;