# Car Repair Api Service

This guide will walk you through the process of setting up the Car Repair Api Service Starter project. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started!

## Installation Steps

### Follow these steps to clone and set up starter project:

1. `Clone the project:` Open your terminal or command prompt and run the following command to clone the project repository:

```bash
git clone https://github.com/rakibulinux/car-repair-api.git
```

2. `Navigate into the project directory:` Use the cd command to navigate into the project directory:

```bash
cd car-repair-api
```

3. `Install project dependencies:` Next, install the project dependencies by running the following command:

```bash
pnpm install
```

4. Configure Prisma and the database connection:

- Add Prisma as a development dependency by running the following command:

```bash
pnpm install prisma --save-dev
```

- Set up your Prisma project by creating the Prisma schema file using the following command:

```bash
pnpx prisma init --datasource-provider postgresql
```

- Open the prisma/schema.prisma file and configure your database connection details.

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- Create a .env file in the project root directory and set the DATABASE_URL environment variable. Replace the placeholders with your database connection details:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

5. Creating the database schema
6. Migrate the database schema: Use the following command to create and apply the initial database schema:

```bash
pnpx prisma migrate dev --name init
```

This command creates a new migration file based on your schema changes and applies it to your database.

6. `Install Prisma Client:` Install the Prisma Client library by running the following command:

```bash
pnpm install @prisma/client
```

This command installs the Prisma Client, which provides an interface to interact with your database.

That's it! You have successfully set up the Car Repair Api Service Starter project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the core service.

### Live Link: https://car-repair-api.vercel.app/

### Application Routes:

#### User

- https://car-repair-api.vercel.app/api/v1/auth/signup (POST)
- https://car-repair-api.vercel.app/api/v1/users (GET)
- https://car-repair-api.vercel.app/api/v1/users/36931254-7f0e-4f15-b4d3-08efb2090335 (Single GET) Include an id that is saved in your database
- https://car-repair-api.vercel.app/api/v1/users/36931254-7f0e-4f15-b4d3-08efb2090335 (PATCH)
- https://car-repair-api.vercel.app/api/v1/users/36931254-7f0e-4f15-b4d3-08efb2090335 (DELETE) Include an id that is saved in your database
- https://car-repair-api.vercel.app/api/v1/profile (GET)
