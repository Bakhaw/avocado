import React, { Component } from 'react';
import axios from 'axios';

import Button from '../../Button';
import Header from './Header';
import Input from '../../Input';

class RegisterForm extends Component {
  state = {
    canSubmit: false,
    username: {
      text: '',
      errForm: false,
      errMsg: ''
    },
    displayName: {
      text: '',
      errForm: false,
      errMsg: ''
    },
    email: {
      text: '',
      errForm: false,
      errMsg: ''
    },
    password: {
      text: '',
      errForm: false,
      errMsg: ''
    },
    confirmPassword: {
      text: '',
      errForm: false,
      errMsg: ''
    },
  }

  handleChange = (e) => this.setState({ [e.target.name]: { text: e.target.value } })

  checkNamesErrors = () => {
    const { displayName, username } = this.state;
    if (username.text === '' || displayName.text === '') return;

    if (username.text === displayName.text) {
      this.setState({
        displayName: {
          text: displayName.text,
          errForm: true,
          errMsg: "Le nom d'affichage doit être différent du nom d'utilisateur!"
        }
      })
    }
  }

  checkPasswordsErrors = () => {
    const { confirmPassword, password } = this.state;
    if (password.text === '' || confirmPassword.text === '') return;

    if (password.text !== confirmPassword.text) {
      this.setState({
        confirmPassword: {
          text: confirmPassword.text,
          errForm: true,
          errMsg: "Les mots de passe doivent correspondre!"
        }
      })
    }
  }

  // ! Need to do this working!!
  signUp = (e) => {
    e.preventDefault();
    axios
      .post('/auth/signup', {
        auth: { username: this.state.username, password: this.state.password }
      })
      .then(res => console.log(res));
  }

// TODO DISABLED PROPS BUTTON

  render() {
    const { canSubmit, username, displayName, email, password, confirmPassword } = this.state;
    const { handlePrev, handleNext, goToSignIn } = this.props;

    return (
      <div className='form-container'>
        <Header title='INSCRIPTION' handlePrev={handlePrev} chevronLeft />
        <form action='/auth/signup' method='post'>
          <Input inputText="Nom d'utilisateur"
            type='text'
            name='username'
            value={username.text}
            onChange={(e) => this.handleChange(e)}
            onBlur={this.checkNamesErrors}
            errForm={username.errForm}
            errMsg={username.errMsg} />
          <Input inputText="Nom d'affichage"
            type='text'
            name='displayName'
            value={displayName.text}
            onChange={(e) => this.handleChange(e)}
            onBlur={this.checkNamesErrors}
            errForm={displayName.errForm}
            errMsg={displayName.errMsg} />
          <Input inputText='Email'
            type='email'
            name='email'
            value={email.text}
            onChange={(e) => this.handleChange(e)} />
          <Input inputText='Mot de passe'
            type='password'
            name='password'
            value={password.text}
            onChange={(e) => this.handleChange(e)}
            onBlur={this.checkPasswordsErrors}
            errForm={password.errForm}
            errMsg={password.errMsg} />
          <Input inputText='Confirmer le mot de passe'
            type='password'
            name='confirmPassword'
            value={confirmPassword.text}
            onChange={(e) => this.handleChange(e)}
            onBlur={this.checkPasswordsErrors}
            errForm={confirmPassword.errForm}
            errMsg={confirmPassword.errMsg} />
          <Button
            // disabled={!canSubmit}
            buttonText='Créer un compte'
            // onClick={handleNext}
            type='submit'
            chevronRight />
        </form>
        <p className='sign-link' onClick={goToSignIn}>Déjà enregistré? Se connecter</p>
      </div>
    )
  }
};

export default RegisterForm;