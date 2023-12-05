module.exports = (call, callback, next) => {
    console.log('Middleware 1: Request received');
    next();
};