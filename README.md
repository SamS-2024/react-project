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
