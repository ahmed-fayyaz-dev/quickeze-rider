import { faker } from '@faker-js/faker';

let latBoundaryMin = 25.3894007;
let latBoundaryMax = 35.3894007;

let longBoundaryMin = 67.3532207;
let longBoundaryMax = 74.3532207;

let productId = Math.random();
let arr = [];
//  Order Status = 0 = notRecieved, 1 = preparing, 2 = dispatched,
//                 3 = Recieved, 4 = completed.

for (var i = 0; i < 20; i++) {
    arr.push({
        orderId: faker.datatype.uuid(),
        orderNumber: faker.datatype.hexaDecimal(9),
        creationTime: faker.date.recent(),
        orderName: faker.company.companyName(),
        orderImage: faker.image.imageUrl(300, null, 'food', true),
        destination: {
            longitude: faker.address.longitude(
                longBoundaryMax,
                longBoundaryMin,
            ),
            latitude: faker.address.latitude(latBoundaryMax, latBoundaryMin),
        },
        destinationGeoHash: {},
        destinationAddress: faker.address.streetAddress(),
        destinationNumber: faker.phone.phoneNumber(),
        source: {
            longitude: faker.address.longitude(
                longBoundaryMax,
                longBoundaryMin,
            ),
            latitude: faker.address.latitude(latBoundaryMax, latBoundaryMin),
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
                productUnit: faker.datatype.number(8),
            },
            {
                productId: productId++,
                productName: faker.commerce.productName(),
                product: faker.commerce.product(),
                productDescription: faker.commerce.productDescription(),
                productPrice: faker.commerce.price(),
                productImage: faker.image.food(),
                productUnit: faker.datatype.number(8),
            },
        ],
        subTotalPrice: faker.commerce.price(),
        deliveryFee: faker.commerce.price(70, 200),
        totalPrice: faker.commerce.price(),
        currencyCode: faker.finance.currencyCode(),
        orderStatus: faker.datatype.number({ min: 0, max: 3 }),
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
    var tempIndex = null;
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

    if (endingIndex >= ordersArr.length - 1) {
        return {
            status: 'error',
            message: '⚠️ There are no more orders!',
        };
    }

    for (let index = tempIndex; index <= endingIndex; index++) {
        tempArr.push(ordersArr[index]);
    }

    return {
        orders: tempArr,
        status: 'success',
        message: 'successfully Fetched',
    };
}
