// test.js
// get all order
const grpc = require("@grpc/grpc-js");
const client = require("./client");

client.productService.add(
    {
        title: "Title order 3",
        body: "Body content 3",
        postImage: "Image URL here",
    },
    (error, order) => {
        console.log('error:', error);
        if (error) {
            // throw error
            if (error.code === grpc.status.INVALID_ARGUMENT) {
                // Handle validation error
                const details = error.metadata.get('error-validation');
                console.error('Validation error:', details);
            } else {
                // Handle other errors
                console.error('Server error:', error);
            }
        };
        console.log("Successfully created a order:", order);
    }
);

/**
 * contoh implementasi stream server
 */

const call = client.productService.getAllStream({});
const productAll = [];
call.on('data', (response) => {
    console.log('Successfully get all product stream:', response);
    productAll.push(response);
});

call.on('end', () => {
    console.log('Streaming completed:', productAll);
});
