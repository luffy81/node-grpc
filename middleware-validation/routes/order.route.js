// Define middleware functions
// Apply multiple middleware to your specific gRPC service method
const applyMiddleware = (methodHandler, middlewares) => {
    return (call, callback) => {
        const executeMiddleware = (index) => {
            if (index < middlewares.length) {
                middlewares[index](call, callback, () => executeMiddleware(index + 1));
            } else {
                methodHandler(call, callback);
            }
        };

        executeMiddleware(0);
    };
};

const authMiddleware = require('../middleware/auth');
const requestMiddleware = require('../middleware/request');
const performingMiddleware = require('../middleware/performing');

const OrderService = require('../services/order.service');
const orderService = new OrderService();

module.exports = {
    GetAll: applyMiddleware(orderService.getAll, [requestMiddleware, performingMiddleware, authMiddleware]),
    GetByid: orderService.getByid,
    Add: orderService.add,
    Edit: orderService.edit,
    Delete: orderService.delete,
}