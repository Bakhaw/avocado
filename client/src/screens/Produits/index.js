import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

import LayoutContainer from '../../components/LayoutContainer';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';

import { withContext } from '../../Context/AppStateProvider';

class Produits extends Component {

  state = {
    pageTitle: '',
    products: []
  }

  async componentDidMount() {
    this.setPageTitle();
    this.getProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setPageTitle();
      this.getProducts();
    }
  }

  setPageTitle = () => {
    const { pathname } = this.props.location;
    let pageTitle;
    if (pathname === '/produits/legumes') pageTitle = 'Nos Légumes';
    if (pathname === '/produits/fruits') pageTitle = 'Nos Fruits';
    this.setState({ pageTitle });
  }

  getProducts = async () => {
    const { toggleAppLoading } = this.props.contextActions;
    await toggleAppLoading(true);

    const productCategory = this.props.location.pathname.slice('10');
    const request = await axios.get(`/products/${productCategory}`);
    const products = await request.data;

    await this.setState({ products })
    await toggleAppLoading(false);
  }

  render() {
    const { pageTitle, products } = this.state;
    const { appLoading } = this.props.contextState;
    const productCategory = this.props.location.pathname.slice('10');

    if (appLoading) {
      return (
        <LayoutContainer>
          <Spinner />
        </LayoutContainer>
      )
    }

    return (
      <LayoutContainer>
        <Typography className='layout-title' variant='title'>{pageTitle}</Typography>
        <div className='products-container'>
          {products
            // .filter(product => product.name.toLowerCase().indexOf(searchBar.toLowerCase()) !== -1)
            .map((product, i) => {
              return (
                <Link key={i}
                  to={`/${productCategory}/${product._id}`}
                  params={{ productId: product._id }}>
                  <ProductCard item={product} infosBars={false} />
                </Link>
              )
            })}
        </div>
      </LayoutContainer>
    )
  }
}

export default withContext(Produits);