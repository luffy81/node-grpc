// productService.js
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
        let _order = { id: Date.now(), ...call.request };
        order.push(_order);
        callback(null, _order);
    }
}

module.exports = ProductService;