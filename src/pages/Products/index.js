import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { addProduct } from './../../redux/Cart/cart.actions';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/Loadmore';
import Product from './Product';
import FormSelect from './../../components/forms/FormSelect';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const Products = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    //useParams lets you deconstruct variables to use elsewhere
    const { filterType } = useParams();
    const { products } = useSelector(mapState);
    
    //products is a objectm so you have to destucture it from the objext to use it
    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        console.log(filterType);
        dispatch(fetchProductsStart({ filterType })
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/products/${nextFilter}`);
    };

    const handleAddToCart = (product) => {
        if(!product) return;
        dispatch(addProduct(product))
        history.push('/cart')
    };

    if(!Array.isArray(data)) return null;

    const configFilters = {
        defaultValue: filterType,
          options: [{
            name: 'Show All',
            value: ''
          }, {
            name: 'Wallet',
            value: 'Wallet'
          }, {
          name: 'Tote Bags',
          value: 'Tote-Bags'
          }, {
          name: 'Guitar Straps',
          value: 'Guitar-Straps'
          }, {
          name: 'Belts',
          value: 'Belts'
      }, {
          name: 'Other',
          value: 'Other'
      }], handleChange: handleFilter
      };

      const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({ 
                filterType,
                startAfterDoc: queryDoc,
                presistProducts: data
            })
        )
      };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore
    }

    if(data.length < 1){
        return (
            <div className="noResults">
                <h1>
                    Browse Products
                </h1>
                <FormSelect {...configFilters} />
                <p>
                    No Search Results
                </p>
            </div>
        );
    }
    return(
        <div>
            <div className="search">
            <FormSelect {...configFilters} />
            </div>
            <div className="productWrapper">
                
            {data.map((products, index) => {
                const { documentID, productThumbnail, productName, productPrice } = products;
                //this check makes sure we have all three important components
                if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null;

                return(
                    <div className="cell">
                        <Link to={`/product/${documentID}`}>
                <img src={productThumbnail} alt={productName} />
                </Link>
                        <div>
                            <table>
                                <tbody>
                                    <tr className="productName">
                                        <td>
                                        <Link to={`/product/${documentID}`}>
                                        <h1>
                                        {productName}
                                        </h1>
                                        </Link>
                                        </td>
                                        <td className="price">
                                            <h1>
                                            ${productPrice}
                                            </h1>
                                        </td>
                                    </tr>
                                
                                </tbody>
                            </table>
                            <Button onClick={() => handleAddToCart(products)}>
                                Add To Cart
                            </Button>
                        </div>
                    </div>
                );
            })}         

        </div>
        <div id="loadBtn">
        {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )} 
            </div>
        </div>


    );
};

export default Products;