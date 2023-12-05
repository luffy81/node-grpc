module.exports = (call, callback, next) => {
    console.log('Middleware 2: Performing additional processing');
    next();
};