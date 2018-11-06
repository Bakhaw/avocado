import React, { Component } from 'react';

// TODO update to @material-ui/core/
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

import ChooseSignType from '../Forms/ChooseSignType';
import ChooseRegisterType from '../Forms/ChooseRegisterType';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';
import Spinner from '../../Spinner';

import styles from './styles';

import { withContext } from '../../../Context/AppStateProvider';

class StepperComp extends Component {

  state = {
    loading: false,
    stepIndex: 0,
    stepsNumber: 3,
    signIn: false,
    signUp: false
  };

  timeOut = (cb) => {
    this.setState({ loading: true }, () => {
      this.timer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.timeOut(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
      }));
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.timeOut(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
        signIn: false
      }));
    }
  };

  toggleSignIn = () => {
    this.handleNext();
    this.setState({ signIn: true })
  }

  goToSignUp = () => {
    this.timeOut(() => this.setState({
      loading: false,
      signIn: false,
      stepIndex: 1
    }));
  }

  goToSignIn = () => {
    this.timeOut(() => this.setState({
      loading: false,
      signIn: true,
      stepIndex: 1
    }));
  }

  getStepContent(stepIndex) {
    const { signIn } = this.state;
    switch (stepIndex) {
      case 0:
        return <ChooseSignType handleNext={this.handleNext}
          toggleSignIn={this.toggleSignIn} />
      case 1:
        if (signIn) {
          return <LoginForm handlePrev={this.handlePrev}
            handleNext={this.handleNext}
            goToSignUp={this.goToSignUp} />;
        } else {
          return <ChooseRegisterType handleNext={this.handleNext}
            handlePrev={this.handlePrev} />;
        }
      case 2:
        return <RegisterForm handlePrev={this.handlePrev}
          handleNext={this.handleNext}
          goToSignIn={this.goToSignIn} />;
    }
  }

  render() {
    const { loading, stepIndex, stepsNumber } = this.state;
    const { appLoading } = this.props.contextState;

    if (appLoading) return <div style={{ height: '100vh' }}><Spinner /></div>;

    return (
      <div style={styles.container}>
        <ExpandTransition loading={loading} open={true}>
          {this.getStepContent(stepIndex)}
        </ExpandTransition>
        <Stepper activeStep={stepIndex}>
          {[...Array(stepsNumber)].map((d, i) => <Step key={i}><StepLabel /></Step>)}
        </Stepper>
      </div>
    );
  }
}

export default withContext(StepperComp);