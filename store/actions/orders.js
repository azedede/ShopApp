import Order from "../../models/order";
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () => {

    return async dispatch => {

        try {
            //Get Orders 
            const response = await fetch('https://rn-complete-guide-3cfd6.firebaseio.com/orders/u1.json');

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json();
            const loadedOrders = [];

            //loop throught object to push to array for use
            for (const key in resData) {
                loadedOrders.push(new Order(
                    key,
                    resData[key].cartItem,
                    resData[key].totalAmount,
                    new Date (resData[key].date)// get data as object
                )
                );
            }
            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            throw err;
        }



    }
}

export const addOrder = (cartItem, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        //execute any async code we want
        const response = await fetch('https://rn-complete-guide-3cfd6.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItem, 
                totalAmount,
                date: date.toISOString()
            })
        })

        if(!response.ok){
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: { 
                id: resData.name,
                items: cartItem, 
                amount: totalAmount,
                date: date
            }
        });
    }

    // return {
    //     type: ADD_ORDER,
    //     orderData: { items: cartItem, amount: totalAmount }
    // }
}