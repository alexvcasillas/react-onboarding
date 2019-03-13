# Onboarding

- [Motivation](#motivation)
- [Demo](#demo)
- [Why Onboarding?](#why-onboarding)
- [What Onboarding is not](#what-onboarding-is-not)
- [Installation](#installation)
- [Onboarding components](#onboarding-components)

# Motivation

TLDR; **Onboarding** is an open source library that aims to create a robust onboarding system for your web application without any headaches or having to manage complex form logics.

After working for long days building onboarding applications for clients and companies and their clients; having to build almost the same over and over again but adapting the logic for each of the use cases, I though that maybe we could have some generic solution easy to import in whatever project we're working on and being able to easily declare specific onboarding logics like validations and related stuff, that's why this project started taking shape and became what's nowdays: **Onboarding**.

We also knew that the user would like to use any UI component library so we have to develop **Onboarding** as generic as possible and providing the enough abstractions to link the internal logic of this library with the logic of a UI component, like field statuses, triggers, event handlers, etc. This way we came up with a, as much as generic as we could, solution. We developed some components that will provide you with the logic needed to build the onboarding process. Using this components should be as simple and straightforward as to put them into your React application without doing any configurations or other related stuff. We tried to keep things as simple as possible within some reasonable React limitations.

# Demo

If you would like to take a look at what **Onboarding** could do for you, you should take a look at this demo:

Reactive Labs demo | [https://onboarding-demo.reactive-labs.com/](https://onboarding-demo.reactive-labs.com/)

If you've created some open-source project that relies on **Onboarding** and would like to showcase your project here, feel free to send a PR with the link to your website/demo.

# Why Onboarding?

Currently there are formidable solutions in the React ecosystem to handle form's state and logic but we haven't found a solution that let you deal with a full onboarding process, and putting together this solutions could give you a hard time and maybe you could end up giving up. **Onboarding** is a complete solution that will delight you from the beginning to the end of your onboarding application development process. **Onboarding** will provide you all of the tools that you could need to create a delightful onboarding experience for your company or any project that you wanted to use it on.

# What onboarding is not

**Onboarding** doesn't provide any UI components, it only provides with logical components that you would use in your application and then you'll tie your UI components to **Onboarding**'s logical components. So, if you're here thinking that this is an UI library for React, we have to tell you that this is not what you're looking for. Or maybe it is and you can take a look around and realize that this is what you need for your project.

# Installation

NPM

```
npm i --save @reactive-labs/onboarding
```

Yarn

```
yarn add @reactive-labs/onboarding
```

# Onboarding components

**Onboarding** provides you a series of components that you will combine to generate the full onboarding experience. Those components are:

- [Onboarding component](#onboarding-component)
- [Step component](#step-component)
- [Field component](#field-component)
- [Info component](#info-component)
- [End component](#end-component)

## Onboarding component

The Onboarding Component is what you'll need at the top-level of your application. It's that one that will be in charge of handling the Step generations and dealing with rendering Steps, Infos, End components and rending everything that's not related to a particular step or end page.

```
import { Onboarding } from '@reactive-labs/onboarding';

<Onboarding>
  ...
</Onboarding>
```

It won't take any props so you just drop it there and it will start working out of the box for you.

## Step component

The Step component is what you will have to include within an Onboarding component to tell the system that you would want a step to be rendered and therefore, displayed in the browser.

```
import { Step } from '@reactive-labs/onboarding';

<Step name="user-details">
  {({ nextStep, prevStep, validStep, finish }) => (
    ...
  )}
</Step>
```

The Step component that's a single prop that's called `name` and it has to be a unique identifier of this step as it would be used later on to fill the data that's gonna be provided to you at the end or any point of the onboarding process.

As you can see, the Step component is a component that takes a function as a child and provides you with data a logical functions that we're gonna describe right now:

- nextStep
  - type: Function
  - description: This property will let you navigate to the next step of the onboarding process.
  - Gotchas: this function won't let you move forwards to the next step if the step is not valid, meaning that the fields within this step have processed and valid.
- prevSte
  - type: Function
  - description: this function will let you navigate to the previous step of the onboarding process.
  - Gotchas: none.
- validStep
  - type: Boolean
  - description: this boolean variable will tell you if this step is valid or not, meaning that all the fields within this step that required validation are fulfilling it.
- finish
  - type: Function
  - description: this function will let you finish the current form. When this function is called, the End component that is within the Onboarding component will be rendered instead of anything else.

## Field component

The Field component is what you will have to include within a Field component to tell the system that this is a field that could have validations attached to them to deal with your business logic.

```
import { Step } from '@reactive-labs/onboarding';

<Field name="email" type="email" validations={}>
  {({ type, value, onChange, onFocus, onBlur, onEnter, valid, error }) => (
    ...
  )}
</Field>
```

The field component that's various props as:

- name
  - type: String
  - description: a unique identifier of this field that will be user later on to give you back the data.
- type
  - type: String
  - description: this will define the value type of this field, meaning that if you provide a type of number, we will give you at the end of the process a value with a typeof as the same as you've defined here. This prop is passed down to the child function exactly as you have declared it.
- validations
  - type: Validations[]
  - description: this property takes an array with the shape of a Validation object. We will explain this with more detail in a section bellow.

As you can see, the Field component is a component that takes a function as a child and provides you with data a logical functions that we're gonna describe right now:

- type
  - type: String
  - description: this will tell you the type of the field you're setting. This will be the exactly same value at the `type` prop you had defined previously.
- value
  - type: String
  - description: this is the actual value of this field. You would pass this value property to your UI component to display it.
- onChange
  - type: Function
  - description: this function will be in charge to update the value of the field. You can tie it to your UI component as you with. As an example, you can pass this function to the `onChange` prop of an input element and it will update the property value of the field component for you. This function will also be in charge of running all of the validations that are linked to the "change" event.
- onFocus
  - type: Function
  - description: this function will be in charge to trigger all of the "focus" validations that you could have declared in the validations prop. You can link this function to an input's "onFocus" property.
- onBlur
  - type: Function
  - description: this function will be in charge to trigger all of the "blur" validations that you could have declared in the validations prop. You can link this function to an input's "onBlur" property.
- onEnter
  - type: Function
  - arguments: Function?.
  - description: this function will be in charge of running all of the "enter" validations that you could have declared in the validations prop. You can link this function to an input's "onKeyPress" property. This function could be expecting a function callback for when the validations have been run, meaning that you could do something like: `() => onEnter(nextStep)` meaning that when all of the validations have run, it will try to move to the next step if the step is valid. Be aware that this `nextStep` described is provided by the Step component and you have it on scope at the Field level.
- valid
  - type: Boolean
  - description: this boolean variable will tell you if this field is valid or not based on the validations run for this field, meaning that it will return false if the any of the validations have not met the requirements and true otherwise. You can use this variable to update the visual state of your UI component. As an example, turning an input's border red if some validations are failing.
- error
  - type: String
  - description: this string will contain the message of the validation that have failed. You would declare this message within the Validation Object that we will see below. It will only contain the message of the first validation that haven't met the requirements.

## Info component

Work in progress.
