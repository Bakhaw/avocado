import React, { Component } from 'react';
import axios from 'axios';

import LayoutContainer from '../../components/LayoutContainer';
import ProductCard from '../../components/ProductCard';

class Produit extends Component {

  state = {
    product: []
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { productId } = this.props.match.params;
    const request = await axios.get(`/products/product/${productId}`);
    const product = await request.data;
    this.setState({ product })
  }

  render() {
    const { product } = this.state;
    return (
      <LayoutContainer>
        <p>Page Produit</p>
        <div className='product-container'>
          <ProductCard item={product} infosBars={true} />
        </div>
      </LayoutContainer>
    );
  }
}

export default Produit;