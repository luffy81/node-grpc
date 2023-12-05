// Middleware function to authenticate requests
const grpc = require("@grpc/grpc-js");

module.exports = (call, callback, next) => {
    // Implement your authentication logic here
    // For example, check the user's credentials
    if (call.metadata.get('authorization')[0] === 'your_secret_token') {
        next();
    } else {
        callback({
            code: grpc.status.UNAUTHENTICATED,
            details: 'Authentication failed',
        });
    }
};