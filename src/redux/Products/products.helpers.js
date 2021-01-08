import { put } from 'redux-saga/effects';
import { firestore, firestorage } from './../../firebase/utils';
//firestore gives us access to the data in firebase

export const handleAddProduct = product => {
    console.log(product)
    const { productName } = product;
    return new Promise((resolve, reject) => {
        //go into the firestore, go into the coolect products, go into the 
        // document, set it as the passed in product, then do a resolve if it works
        // a reject if it does not
        firestore
            .collection('products')
            .doc(`${productName}`)
            .set(product)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
        });
    }
export const handleEditProduct = product => {
    const { newProductCategory,
        newProductPrice,
        newProductDesc,
        id} = product;
    return new Promise((resolve, reject) => {
        //go into the firestore, go into the coolect products, go into the 
        // document, set it as the passed in product, then do a resolve if it works
        // a reject if it does not
        firestore
            .collection('products')
            .doc(id)
            .update( {
                productCategory: newProductCategory,
                productPrice: newProductPrice,
                productDescription: newProductDesc})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
        });
    }
export const handleSetImage = newurl => {

    const { url, id } = newurl;

    return new Promise((resolve, reject) => {
        //go into the firestore, go into the coolect products, go into the 
        // document, set it as the passed in product, then do a resolve if it works
        // a reject if it does not
        firestore
            .collection('products')
            .doc(id)
            .update({productThumbnail: url})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
        });
    }
export const handleUploadImage = image => {
    console.log("adsads")

    const { thisImage, name, id} = image;
    const uploadTask = firestorage.ref(`images/${name}`).put(thisImage);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                firestorage
                    .ref('images')
                    .child(name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        resolve(url)
                        put(handleSetImage({url, id}))
                        
                    })
                    .catch(err =>{
                        console.log(err)
                        reject(err)
                })
            }
        );
    });
}

export const handleFetchProducts = ( { filterType, startAfterDoc, presistProducts=[] }) => {
    return new Promise((resolve, reject) => {
        //goes into firestore, collects the data and puts it into the
        //productsArray and returns it

        //
        const pageSize = 6;
        
        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if(filterType) ref = ref.where('productCategory','==',filterType)
        //if startAfterDoc exisits, then we hit laod more, so chain on more
        //basically starAfterDoc is the document that it will load 6 more of
        //after that point
        if(startAfterDoc) ref = ref.startAfter(startAfterDoc);
        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;
                const data = [
                ...presistProducts,
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            //we reutrn an array with a object with all the data, the last element 
            //loaded, and if it is the last page or not
            resolve({ 
                data, 
                queryDoc: snapshot.docs[totalCount -1],
                isLastPage: totalCount < 1
            });
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

export const handleFetchProduct = productID => {
    return new Promise((resolve, reject) => {
        firestore
        .collection('products')
        .doc(productID)
        .get()
        .then(snapshot => {
            if(snapshot.exists) {
                resolve(
                    snapshot.data()
                );
            }
        })
        .catch(err => {
            reject(err)
        })
    })

}