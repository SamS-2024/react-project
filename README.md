# React frontend

This is the frontend repository for course DV1677 JSRamverk at BTH

## Setup Instructions

1. Clone the repository

```
git clone git@github.com:SamS-2024/react-project.git
```

2. Install all dependencies

```
npm install
```

3. Create a `.env` file and add the following:

```
VITE_PORT=3000
```

4. Start the application

```
npm run dev
```

## Project overview

This frontend project was created with Vite and uses React.

The `src` folder contains:

- `api`- handles communication with the backend.
- `components`- reusable components like Header and Footer.
- `pages`- components that act as views.

Each component may have its own folder with a `.jsx` file and an optional `.css` file.

## Testing with Cypress

### Installation and setup

- Install Cypress as a development dependency:

```
npm install cypress --save-dev
```

### Running tests

1. Open a terminal in your project directory.

2. Start Cypress:

```
npx Cypress open
```

3. In the Cypress UI:

   - Select E2E Testing
   - Choose a browser, for example 'Chrome'
   - Click Start E2E Testing

4. Navigate to a directory or file to view and run the tests.

### Creating new tests

- Create test files inside the cypress/e2e folder.

- Repeat the steps above to run your new tests.
