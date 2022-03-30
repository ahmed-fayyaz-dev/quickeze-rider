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

export const orderStatusArr = [
    {
        label: 'not Recieved',
        value: 0,
    },
    {
        label: 'Preparing',
        value: 1,
    },
    {
        label: 'Dispatched',
        value: 2,
    },
    {
        label: 'Recieved',
        value: 3,
    },
    {
        label: 'Completed',
        value: 4,
    },
];
