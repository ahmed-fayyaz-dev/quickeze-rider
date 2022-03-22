import { faker } from '@faker-js/faker';

let productId = Math.random();
let arr = [];
//  Order Status = 0 = notRecieved, 1 = preparing, 2 = dispatched,
//                 3 = Recieved, 4 = completed.

for (var i = 0; i < 200; i++) {
    arr.push({
        orderId: faker.datatype.uuid(),
        creationTime: faker.date.recent(),
        orderName: faker.company.companyName(),
        orderImage: faker.image.business(),
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
                productImage: faker.image.food(),
            },
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food(),
            },
        ],
        totalPrice: faker.commerce.price(),
        orderStatus: faker.datatype.number({ min: 0, max: 4 }),
    });
}

var ordersArr = arr;

// status "error"/"success"
// in case of error show message
export var orderData = {
    orders: ordersArr,
    status: 'success',
    message: 'successfully Fetched',
};

export function getOrdersFromOffsetId(id, limit) {
    let tempArr = [];
    var tempIndex = 0;
    // In case of id = 0/null it will give from the start of arr i.e 0
    switch (id) {
        case 0:
            tempIndex = 0;
            break;
        default:
            tempIndex = ordersArr.findIndex(v => v.orderId === id);
            break;
    }

    let endingIndex = tempIndex + limit;

    for (let index = tempIndex; index < endingIndex; index++) {
        tempArr.push(ordersArr[index]);
    }

    return {
        orders: tempArr,
        status: 'success',
        message: 'successfully Fetched',
    };
}
