# Holdr Base Web App

<img src="https://d174jt5gj6yzzg.cloudfront.net/wQ8Sqi_E.png" style="object-fit: cover" alt="logo" width="300"/>

## Table of Contents

- [About](#About)
- [Technologies](#Technologies)
- [Requirements](#Requirements)
- [Setup](#Setup)
- [Scripts](#Scripts)
- [Usage](#Usage)
  - [Code Style Guide](#Code-Style-Guide)
  - [Project Structure](#Project-Structure)
  - [Styling](#Styling)
  - [Animations](#Animations)
  - [Commits](#Commits)
  - [Docker](#Docker)
  - [CI/CD](#CICD)
  - [Unconfigurables](#Unconfigurables)
  - [Storybook](#Storybook)
  - [Testing](#Testing)
- [Status](#Status)
- [Credits](#Credits)
- [License](#License)

## About

## Technologies

The web-application was developed using

- React JS
- TypeScript
- Apollo Client (GQL)
- Vite
- Stitches JS
- Framer Motion
- Formik
- ESLint
- Prettier
- Husky
- Testing Library - React
- Vitest
- Storybook

## Requirements

- NVM
- Node 18+
- Yarn 1.22.19
- Docker

## Setup

1. Download NVM
2. Download and set node version to 18+ (18 LTS is recommended)
3. Clone project `git clone https://github.com/devholdrclub/marketplace-web-app.git`
4. Install packages `yarn install`
5. Add environment variables values.
6. Download and install docker.
7. Start the application by running `docker compose up`

## Scripts

`yarn dev`

Runs the application in development environment

`yarn build`

Builds a production-ready application and stores it into the `dist/`

`yarn preview`

`yarn test`

Runs all test files.

`yarn test:ui`

Open ui to see test case runner. (opens at `http://localhost:51204/__vitest__/`)

`yarn coverage`

Show test coverage analysis report for code base

`yarn lint`

Searches for eslint problems, but will not fix them.

`yarn lint:fix`

Searches for eslint problems and tries to fix them.

`yarn format`

Calls the prettier tool to format the codebase to suite the specified style.

## Usage

### Code Style Guide

#### Components
💡 _This includes Layout components_

We will be using **React Functional Components**, rather than **Class-based Components**.

```tsx
// ✅ Acceptable 
export default function MyComponent() {}

// ❌ Not acceptable
export default class MyComponent extends React.Component {}
```

Our components **should** have displayNames. (_Good for debugging: error message_)
```tsx
// ✅ Acceptable 
function MyComponent() {}
MyComponent.displayName = 'Holdr_MyComponent'

export default MyComponent;


// ❌ Not acceptable - missing displayName
function MyComponent() {}
export default MyComponent;
```

If the component, contains `props`, the props interface will be defined in the
`*.common.ts` file. For all components with similar prop types, we will define a
`IBaseComponentProps` interface in the `shared/props.ts` and extend them as the need arises.

```ts
interface IBaseProps {
  children?: ReactNode;
}

interface IMyComponentProps extends IBaseProps {
  /** Determines the appearance of MyComponent: Font color and bg colors */
  theme?: 'light' | 'dark';
}

```

#### Utilities

#### Contexts

#### Naming Conventions

🚨 **Discuss** with lead if you're unsure.

1. File names

  - We will use kebab-case (-) to name our files.
  - Files will be suffixed with an appropriate _context_ e.g. `*.test.ts`, `*.stories.ts`, `*.page.tsx`.
  - File names must be written in full words.

2. Functional components

  - Components will be named according to their file name (and context) e.g. `main.layout.tsx -> MainLayout, event.card.tsx -> EventCard.tsx`.
  - Component names will use PascalCase (capitalize).
  - Component names must be written in full words.

3. Interfaces and types

  - Interfaces will be prefixed with 'I' (e.g. `ISomeContext`).
  - Types will be suffixed with 'Type' (e.g. `ItemType`).
  - Interfaces and Types will use PascalCase.
  - Names must be contextually valid or represent the underlying item's name.
  - Interface and type names must be written in full words.

4. Hooks

  - Hook names will use camelCase.
  - All hooks must be prefixed with 'use' i.e. `use[HookName]`.
  - Hook names must be written in full words.

5. Functions and classes

  - Function names will use camelCase.
  - Class names will use PascalCase.
  - Function and class names must be written in full words.
  - Function types will be suffixed with FnType and must use name of the function.
    e.g. `counter // function name)` -> `CounterFnType // function type`
  - In the case that a function returns an object, we will suffix the
    return type's interface with ReturnType (e.g. `IParseReturnType`)

6. Props

  - Prop suffixed with 'Prop' and prefixed with 'I' e.g. `IComponentNameProp`.
  - Prop names must use PascalCase.
  - Prop names must use the same name as the component e.g. `EventCard` will have props named`IEventCardProps`.


#### Development Method

The following section discusses our recommendations for developing
robust and well-tested components. We urge developers to follow the
test-driven approach when it comes to writing code.

Basic steps:

1. Write out base tests specs that might meet your requirements.
2. Write out code to satisfy your test suites.
3. Improve tests after writing component tests with `Cypress`.
4. Recurse

This process will allow you to incrementally improve on the code cov
and improve the code, progressively.

#### Functions

- We will prefer using arrow functions over named functions, so that
  we can set a type for the function.

```ts
// example.types.ts

interface IExampleReturnType {
  someItem?: any;
}

type ExampleFnType = (param?: any) => IExampleReturnType;

// example.ts

const example: ExampleFnType = (param) => ({
    someItem: "this is an example" 
  });
```

- In the case that a named function is required (when you want the function
  to have a context and use `this` keyword), we will have to set the param types
  inline.

```ts

function example(param?: any): IExampleReturnType {
  // doing something with this keyword ...
  return {
    someItem: "this is an example"
  }
}

```


### Project Structure

We use modules for the subdirectories, resulting in using barrel exports.
The `src` has the following structure:

```
 src/
├─ components/      # React components (exclusive of layout components)
├─ configs/         # configs for providers and app
├─ contexts/        # React contexts and context providers
├─ hooks/           # custom hooks used by components
├─ layouts/         # layout components used to structure pages
├─ lib/             # business logic i.e. gql queries.
├─ pages/           # page components linked to specific paths
├─ shared/          # constants, types, props and interfaces that are shared
├─ utilities/       # helper functions
app.tsx             # Main app
main.tsx            # Similar to index.tsx (for React)
setup.ts            # Setup testing library
vite-env.d.ts       # Do not touch
```

#### Components

Let us illustrate the idea of using barrel exports by reviewing the structure
of our `components/` as seen below:

```
components/
├─ forms/                         # Subdirectory for all forms
│  ├─ login-form/                 # Subdirectory for login form
│  │  ├─ index.tsx                # Component's defintion
│  │  ├─ login-form.stories.tsx   # Component's stories (Storybook)
│  │  ├─ login-form.test.tsx      # Component's tests
│  │  ├─ login-form.style.ts      # Compnents' styles (Stitches JS)
│  ├─ registration-form/          # Subdirectory for reg form
│  ├─ index.tsx                    # Export's all forms
├─ index.tsx                       # Export's all components
```

From the illustration above, we see that the component's code is defined
in the `login-form/index.tsx` file. The function will be export from the
`forms/index.tsx` which in turn will be exported from the `components/index.tsx`
file. This will allow us to import the components as follows:

```tsx
// Auth/Login.page.tsx

// ... other imports
import { LoginForm } from 'react'

function LoginPage (props) {/*...*/}

export default LoginPage;
```

You should note that we will group our components inside the `components/`.
Methods of grouping can be discussed, however, the pattern of grouping
components that is recommended is the method used by [Holdr React Library]().
And since we are using the **Holdr React Library** as a source of our base
components, the only components that we will end up focusing on building are
higher-level components (e.g. platform-specific cards, login forms) or
extending the components.


#### Layouts

Layouts follow the same structure as our `components/`, however, there will
be no need to group layout components. The reason why Layout components have
their own directory is that they are non-interactive components, that serve
to **arrange** interactive components in Page components.

```
layouts/
├─ auth-layout/
│  ├─ index.tsx                   # Export the main layout
│  ├─ auth-layout.stories.tsx
│  ├─ auth-layout.test.tsx
│  ├─ auth-layout.styles.ts
│  ├─ auth-layout.common.ts
├─ index.tsx                       # Exports all layout components 
```

Similar to components, you can import layouts as follows

```tsx
// Auth/Login.page.tsx

// ... other imports
import { AuthLayout } from 'layout'

function LoginPage (props) {/*...*/}

export default LoginPage;
```

#### Hooks, Utilities and Contexts

Hooks, utilities and contexts all share the same kind of structure. Similarly,
they use barrel exports as. See structure below:

```
contexts/
├─ theme-context/
│  ├─ index.tsx                # Context and Provider definition and export
│  ├─ theme-context.test.ts   # Test for context provider
│  ├─ theme-context.types.ts   # Types for context
├─ index.tsx                   # Export for all contexts
hooks/
├─ use-counter/
│  ├─ index.tsx                # Hook definition and export
│  ├─ use-counter.test.ts     # Test for hook
│  ├─ use-counter.types.ts     # Types for hook 
├─ index.tsx                   # Export for all hooks
utilities/
├─ date-utility/
│  ├─ date-utility.test.ts    # Test for utility methods
│  ├─ date-utility.types.ts    # Function types
│  ├─ index.tsx                # Utilty definition
├─ index.tsx                   # Export all utilities
```

The structure shown above allows us to import the files as shown below:

```tsx
import { useCounter } from 'hooks';
import { ComponentUtility } from 'utilities';
import { WeirdComponentContext } from 'contexts'

function WeirdComponent() {/*...*/}
WeirdComponent.displayName = ComponentUtility.prefixDisplayName("WeirdComponent");

export default WeirdComponent;
```

#### Shared

The shared directory is the only directory that does not contain
subdirectories, rather it contains files with code that is shared across
the app. All the code is exported in the `shared/index.tsx` file.

```
shared/
├─ general.ts     # Shared constants
├─ index.tsx         # Export all shared type, interface, props, and constants
├─ props.ts         # Shared base props
├─ styles.ts        # Shared styles
├─ common.ts         # Shared types
```

#### Cypress

The cypress directory contains the following structure:

```
cypress/
├─ fixtures/
│  ├─ feature.fixture.json
├─ e2e/
│  ├─ feature/
│  │  ├─ feature.spec.cy.ts
├─ support/
│  ├─ component.ts
│  ├─ commands.ts
│  ├─ component-index.html
```

### Styling

This project relies on [Stitches](https://stitches.dev) to style components. Stitches
is a CSS-in-JS solution with near-zero runtime, it's really fast and easy to style your
components. It is relies on composition to style your components by exposing a HOC, `styled`
that you can wrap your component in and list your styles. Take a look at the
[docs](https://stitches.dev/docs). It is similar to [styled components](https://styled-components.com).

We also used stitches to develop the **Holdr Component Library**, which has a majority of all
the components that will be used in our applications, exclusive of platform specific components
(e.g. cards, layouts).

Our `stitches.config.ts` file exposes the following:

- `theme`: an object that gives us our theme-specific spaces, colors etc.
- `keyframes`: a function that can be used to create animations.
- `css`: A function that can be used to style components by passing the result of calling
  the function into a components `className`.
- `styled`: A HOC that is used to style our components. It provides theme-specific tokens
  that we can use to specify our style.

For more complex animations, I suggest that you look at the [Animations](#Animations) section.

### Animations

We will use Framer motion to develop complex animations. Framer uses the devices
GPU in order to calculate animations and does not rely on the CSS keyframes API.
This results in smoother animations.


### Commits

Husky will check our messages using a pre-commit hook. This will enable us to have consistent message
styles that we can always refer back to with ease.

We will be using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specified by the
[Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).
As such, we must prefix our commits with the following accepted subjects, anything else will result in an
error:

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

The format for our commits will follow: `[subject]: message`. Examples are shown below:

- `git commit -m "test: add test for useCounter"` ✅
- `git commit -m "test(useCounter): add test for hook"` ✅
- `git commit -m "add test for useCounter context"` ❌

### Docker

This project utilizes [Docker](https://docs.docker.com/) in order to run the application on any platform, hence,
instead of relying on the usual `yarn dev`, I **strongly** encourage on using `docker
compose up` in order to start up the application. The container that is spun up is configured
to detect live code changes, so all is well.

There are two dockerfiles that are being used: production and development. The production docker
file is suffixed with a `.prod` and relies on [nginx](https://www.nginx.com/) to serve up the
static files. The regular dockerfile uses vite to serve the application.

⚠️ Currently, vite has not been configured fully to handle page navigation, so the production
container build might not work.

### Testing

#### Unit and Integrations Tests

In this project we will use: `vitest`, `testing-library`, and `jsdom` for
our unit tests.

Vitest is a tool for performing unit tests with fast HMR embedded into it.
Testing Library is what is used under the hood by vitest to run the tests.
And, Jsdom allows us to use the dom in JS.

#### E2E Testing

We will use `Cypress` to handle:

1. E2E tests.
2. Integration tests.

### CICD

This sections describes our process and technologies used to maintain a
healthy CI/CD pipeline.

### Unconfigurables

Files that should not be configured

| Filename      | Description                                                    |
|---------------|----------------------------------------------------------------|
| .npmrc        | Declares the engine specs to be respected: yarn & node version |
| .nvmrc        | Specifies the version of node to be used                       |
| vite-env.d.ts |                                                                |

### Storybook

## Status

⏳ Currently in development.

## Credits



## License
