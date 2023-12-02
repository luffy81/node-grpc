// test.js
// get all order
const client = require("./client");

client.orderService.getAll({}, (error, order) => {
    console.log('error:', typeof(error));
    if (error) throw error;
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

client.productService.getAll({}, (error, order) => {
    // console.log('error:', typeof(error));
    // if (error) throw error;
    console.log("Successfully get all product:", order);
});

client.productService.getByid(
    {
        id: 2,
    },
    (error, order) => {
        if (error) throw error;
        console.log("Successfully get a product item:", order);
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
