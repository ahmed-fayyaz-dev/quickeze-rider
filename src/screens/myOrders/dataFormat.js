let myOrderList = [];

export const AddToMyOrders = item => {
    if (myOrderList.includes(item)) {
        return '⚠️ Error : Already Added !';
    } else {
        myOrderList = [item, ...myOrderList];
        console.log('MyOrders', myOrderList);
        return '✅ Addedd SuccessFully';
    }
};
