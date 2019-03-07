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
            {({ currentStep, numberOfSteps }) => (
              <header>
                {currentStep} of {numberOfSteps}
              </header>
            )}
          </Info>
          <Step>
            {({ nextStep }) => (
              <>
                <Fieldset>
                  <Field>
                    Field 1 @ Step 1
                    <input type="text" placeholder="Name" />
                  </Field>
                </Fieldset>
                <Fieldset>
                  <Field>
                    Field 2 @ Step 1
                    <input type="text" placeholder="Last name" />
                  </Field>
                </Fieldset>
                <button onClick={nextStep}>Next Step</button>
              </>
            )}
          </Step>
          <Step>
            {() => (
              <>
                <Fieldset>
                  <Field>Field 1 @ Step 2</Field>
                </Fieldset>
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
