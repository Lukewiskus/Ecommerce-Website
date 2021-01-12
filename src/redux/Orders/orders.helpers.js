import { FaRProject } from "react-icons/fa";
import { firestore } from './../../firebase/utils';

export const handleSaveorder = order => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .doc()
            .set(order)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            });
    });
};


export const handleGetUserOrderHistory = uid => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('orders').orderBy('orderCreatedDate');
        ref = ref.where('orderUserID', '==', uid);

        ref
            .get()
            .then(snapshot => {
                const data = [
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];

                resolve({ data });
            })
            .catch(err => {
                reject(err);
            });

    });
}

export const handleGetCompleteOrderHistory = props => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .get()
            .then(snapshot => {
                const data = [
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];

            resolve({data});
            })
            .catch(err => {
                reject(err);
        })
    })
}

export const handleGetOrder = orderID => {
    return new Promise((resolve, reject) => {
        firestore
        .collection('orders')
        .doc(orderID)
        .get()
        .then(snapshot => {
            if(snapshot.exists) {
                resolve({
                    ...snapshot.data(),
                    documentID: orderID
                })
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}