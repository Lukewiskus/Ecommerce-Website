import { firestore } from './../../firebase/utils';

//firestore gives us access to the data in firebase

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        //go into the firestore, go into the coolect products, go into the 
        // document, set it as the passed in product, then do a resolve if it works
        // a reject if it does not
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
        });
    }

export const handleFetchProducts = () => {
    return new Promise((resolve, reject) => {
        //goes into firestore, collects the data and puts it into the
        //productsArray and returns it
        firestore
            .collection('products')
            .get()
            .then(snapshot => {
                const productsArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                });
                resolve(productsArray);
            })
            .catch(err => {
                reject(err);
        })
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject ) => {
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(() => {
            resolve();
        })
        .catch(err => {
            reject();
        })
    });
}