import React, { Component } from 'react';

import Button from '../../Button';
import Header from './Header';
import Input from '../../Input';

class LoginForm extends Component {
    state = {
        username: {
            text: '',
            errForm: false,
            errMsg: ''
        },
        password: {
            text: '',
            errForm: false,
            errMsg: ''
        },
        canSubmit: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: { text: e.target.value }
        })
    }

    checkErrorsForm = (e) => {
        const { text } = this.state[e.target.name];

        if (text === '') {
            this.setState({
                [e.target.name]: {
                    text: this.state[e.target.name].text,
                    errForm: true,
                    errMsg: 'Le champ doit être rempli'
                }
            })
        }
    }

    checkSubmitForm = () => {
        const { password, username } = this.state;
        if (!username.errForm && !password.errForm) {
            this.setState({ canSubmit: true })
        } else {
            this.setState({ canSubmit: false, showErrMsg: true })
        }
    }

    render() {
        const { canSubmit, username, password } = this.state;
        const { handlePrev, goToSignUp } = this.props;
        
        return (
            <div className='form-container'>
                <Header title='SE CONNECTER' handlePrev={handlePrev} chevronLeft />
                <form action='/auth/login' method='post'>
                    <Input
                        inputText="Nom d'utilisateur"
                        name='username'
                        value={username.text}
                        errForm={username.errForm}
                        errMsg={username.errMsg}
                        onBlur={(e) => this.checkErrorsForm(e)}
                        onChange={(e) => this.handleChange(e)} />
                    <Input
                        inputText='Mot de passe'
                        type='password'
                        name='password'
                        value={password.text}
                        errForm={password.errForm}
                        errMsg={password.errMsg}
                        onBlur={(e) => this.checkErrorsForm(e)}
                        onChange={(e) => this.handleChange(e)} />
                    <p className='forgot-password'>Mot de passe oublié?</p>
                    <Button
                        buttonText='Se connecter'
                        onClick={this.checkSubmitForm}
                        type={canSubmit ? 'submit' : 'button'}
                        chevronRight
                    />
                </form>
                <p className='sign-link' onClick={goToSignUp}>Pas encore enregistré? Créer un compte</p>
            </div>
        );
    }
};

export default LoginForm;