let myOrderList = [];

export const AddToMyOrders = item => {
    myOrderList = [item, ...myOrderList];
    console.log('MyOrders', myOrderList);
};
