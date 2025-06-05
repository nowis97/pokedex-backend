# Pokedex Backend

This project is a NestJS application that provides a backend for a Pokedex.

## Installation

### Prerequisites

*   Node.js (version >= 16.x)
*   npm (version >= 8.x)

### Clone the repository

```bash
git clone https://github.com/nowis97/pokedex-backend.git
cd pokedex-backend
```

### Install dependencies

```bash
npm install
```

## Execution

### Running the application

#### Before to running the app you have to create a .env file with this variable

```
POKE_API_URL="https://pokeapi.co/api/v2/"
```


*   **Development mode:**

    ```bash
    npm run start:dev
    ```

    This command starts the application in development mode with hot-reloading enabled. The application will be accessible at `http://localhost:3000`.

*   **Production mode:**

    ```bash
    npm run build
    npm run start:prod
    ```

    This command first builds the application and then starts it in production mode.

### Running tests

```bash
npm run test
```

This command runs all unit tests using Jest.

## API Documentation

This application uses Swagger for API documentation. Once the application is running, you can access the Swagger UI at `http://localhost:3000/api`.
