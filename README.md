# React frontend

## Relevant information

This is the frontend repository for course DV1677 JSRamverk at BTH

Link to backend repository: https://github.com/Hampe024/ssr-editor

Link to frontend deployment using Github Pages: https://sams-2024.github.io/react-project/

Link to backend deployment using Azure: https://jsramverk-hagt21-fdbhdnf5hrgrcbcc.northeurope-01.azurewebsites.net/

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

## Real-time Communication

Enable real-time collaborative editing using `Socket.IO Client`.

### Installation

```
npm install --save socket.io-client
```

### Initialization

- Import the client and connect to the server using SERVER_URL.

- Use useEffect to initialize the socket whenever the selected document changes.

- Disconnect the socket on cleanup.

### Rooms

- Each document has its own room identified by a unique document ID.
- Clients join a room when opening a document.
- Server listens for "join room" events and adds the socket to the correct room.
- Updates to a document are broadcasted only to clients in the same room.
