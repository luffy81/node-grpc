// userService.js
const order = [
    { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
];

class UserService {
    constructor() { }

    getUserById(call, callback) {
        // Implementation logic for getUserById
    }

    getAll(_, callback) {
        callback(null, { order });
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
        let _order = { id: Date.now(), ...call.request };
        order.push(_order);
        callback(null, _order);
    }
}

module.exports = UserService;