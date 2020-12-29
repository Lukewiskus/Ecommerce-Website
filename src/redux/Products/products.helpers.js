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