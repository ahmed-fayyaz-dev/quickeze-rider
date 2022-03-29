let myOrderList = [];

export const AddToMyOrders = async item => {
    if (myOrderList.includes(item)) {
        return '⚠️ Error : Already Added !';
    } else {
        myOrderList = [item, ...myOrderList];
        console.log('MyOrders', myOrderList);
        return '✅ Addedd SuccessFully';
    }
};

export const getMyOrders = () => {
    return {
        myOrders: myOrderList,
        status: 'success',
        message: 'successfully Fetched',
    };
};

export const getMoreMyOrders = () => {
    return {
        status: 'error',
        message: '⚠️ No more Orders to Load',
    };
};
