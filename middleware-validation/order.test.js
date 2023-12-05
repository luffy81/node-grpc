// test.js
// get all order
const grpc = require("@grpc/grpc-js");
const client = require("./client");

client.orderService.getAll({}, (error, order) => {
    console.log('error:', typeof (error));
    if (error) {
        // Check if the error is a gRPC status object
        if (error.code !== undefined && error.details !== undefined) {
            console.error('gRPC Error:');
            console.error('HTTP Status:', error.code);
            console.error('gRPC Status Code:', error.details);

            // Handle the error based on the status code
            switch (error.code) {
                case grpc.status.NOT_FOUND:
                    console.error('Resource not found');
                    break;
                case grpc.status.PERMISSION_DENIED:
                    console.error('Permission denied');
                    break;
                // Add more cases as needed
                default:
                    console.error('Unknown error');
                    break;
            }
        } else {
            // Handle non-gRPC errors
            console.error('Non-gRPC error:', error);
        }
    }

    console.log("Successfully get all order:", order);
});

// add a order
client.orderService.add(
    {
        title: "Title order 3",
        body: "Body content 3",
        postImage: "Image URL here",
    },
    (error, order) => {
        if (error) throw error;
        console.log("Successfully created a order:", order);
    }
);

// edit a order
client.orderService.edit(
    {
        id: 2,
        body: "Body content 2 edited.",
        postImage: "Image URL edited.",
        title: "Title for 2 edited.",
    },
    (error, order) => {
        if (error) throw error;
        console.log("Successfully edited a order:", order);
    }
);

// delete a order
client.orderService.getByid(
    {
        id: 2,
    },
    (error, order) => {
        if (error) throw error;
        console.log("Successfully get a order item:", order);
    }
);

// delete a order
client.orderService.delete(
    {
        id: 2,
    },
    (error, order) => {
        // if (error) throw error;
        console.log("Successfully deleted a order item.");
    }
);
