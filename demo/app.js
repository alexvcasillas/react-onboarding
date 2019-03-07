import React from 'react';
import { Onboarding, Info, Step, Fieldset, Field } from '../dist/react-onboarding';

class App extends React.Component {
  onOnboardingComplete = () => {
    console.log('Form completed');
  };

  render() {
    return (
      <>
        <Onboarding>
          <Info>
            {({ currentStep, numberOfSteps, onboarding }) => (
              <>
                <header>
                  {currentStep} of {numberOfSteps}
                </header>
              </>
            )}
          </Info>
          <Step name="full-name">
            {({ nextStep }) => (
              <>
                <Field name="name" type="text">
                  {({ type, value, onChange }) => (
                    <input type={type} placeholder="Name" value={value} onChange={onChange} />
                  )}
                </Field>
                <Field name="last-name" type="text">
                  {({ type, value, onChange }) => (
                    <input type={type} placeholder="Last name" value={value} onChange={onChange} />
                  )}
                </Field>
                <button onClick={nextStep}>Next Step</button>
              </>
            )}
          </Step>
          <Step name="aditional-details">
            {() => (
              <>
                <Field name="email" type="email">
                  {({ type, value, onChange }) => (
                    <input type={type} placeholder="Email" value={value} onChange={onChange} />
                  )}
                </Field>
                <button onClick={this.onOnboardingComplete}>Complete!</button>
              </>
            )}
          </Step>
        </Onboarding>
      </>
    );
  }
}

export default App;
