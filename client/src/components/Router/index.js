import React, { Component, Fragment } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import LeftMenu from './LeftMenu';
import Navbar from './Navbar';
import Stepper from '../NotLogged/Stepper';
import Spinner from '../Spinner';

import Favoris from '../../screens/Favoris';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Produit from '../../screens/Produit';
import Produits from '../../screens/Produits';
import Recette from '../../screens/Recette';
import Recettes from '../../screens/Recettes';

import { withContext } from '../../Context/AppStateProvider';
import styles from './styles';

class Router extends Component {
  state = {
    open: false,
  };

  async componentDidMount() {
    await this.props.contextActions.getUserLogged();    
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { isUserLogged } = this.props.contextState;

    if (!isUserLogged) return <Stepper />;

    return (
      <HashRouter>
        <Fragment>
          <Navbar open={open} handleDrawerOpen={this.handleDrawerOpen} />
          <div className='router-layout'>
            <LeftMenu open={open} handleDrawerClose={this.handleDrawerClose} />

            <Switch>
              <Route path='/legumes/:productId' component={Produit}/>
              <Route path='/fruits/:productId' component={Produit}/>

              <Route path='/produits/:productType' component={Produits}/>
              <Route path='/recettes/:recetteId' component={Recette}/>
              <Route path='/profil/:memberId' component={Profile} />
              <Route path='/recettes' component={Recettes}/>
              <Route path='/favoris' component={Favoris}/>              
              <Route path='/' component={Home} />
            </Switch>
          </div>

        </Fragment>
      </HashRouter>
    );
  }
}

export default withContext(withStyles(styles, { withTheme: true })(Router));