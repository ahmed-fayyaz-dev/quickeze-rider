import { faker } from '@faker-js/faker';

let id = 1;
let productId = Math.random();
//  Order Status = 0 = notRecieved, 1 = preparing, 2 = dispatched,
//                 3 = Recieved, 4 = completed.

var ordersArr = [
    {
        orderId: id++,
        orderName: faker.company.companyName(),
        orderImage: faker.image.business,
        destination: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        },
        destinationGeoHash: {},
        destinationAddress: faker.address.streetAddress(),
        destinationNumber: faker.phone.phoneNumber(),
        source: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        },
        sourceGeoHash: {},
        sourceAddress: faker.address.streetAddress(),
        sourceNumber: faker.phone.phoneNumber(),
        products: [
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food,
            },
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food,
            },
        ],
        totalPrice: faker.commerce.price(),
        orderStatus: faker.datatype.number({ min: 0, max: 4 }),
    },
    {
        orderId: id++,
        orderName: faker.company.companyName(),
        orderImage: faker.image.business,
        destination: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        },
        destinationGeoHash: {},
        destinationAddress: faker.address.streetAddress(),
        destinationNumber: faker.phone.phoneNumber(),
        source: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        },
        sourceGeoHash: {},
        sourceAddress: faker.address.streetAddress(),
        sourceNumber: faker.phone.phoneNumber(),
        products: [
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food,
            },
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food,
            },
        ],
        totalPrice: faker.commerce.price(),
        orderStatus: faker.datatype.number({ min: 0, max: 4 }),
    },
    {
        orderId: id++,
        orderName: faker.company.companyName(),
        orderImage: faker.image.business,
        destination: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        },
        destinationGeoHash: {},
        destinationAddress: faker.address.streetAddress(),
        destinationNumber: faker.phone.phoneNumber(),
        source: {
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        },
        sourceGeoHash: {},
        sourceAddress: faker.address.streetAddress(),
        sourceNumber: faker.phone.phoneNumber(),
        products: [
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food,
            },
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food,
            },
        ],
        totalPrice: faker.commerce.price(),
        orderStatus: faker.datatype.number({ min: 0, max: 4 }),
    },
];

// status "error"/"success"
// in case of error show message
export var orderData = {
    orders: ordersArr,
    status: 'success',
    message: 'success Fully Fetched',
};
