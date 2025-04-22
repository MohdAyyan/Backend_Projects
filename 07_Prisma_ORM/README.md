# Prisma ORM Setup Guide

This guide will walk you through setting up Prisma ORM in your Node.js project.

## Prerequisites
- Node.js installed
- npm or yarn package manager

## Step 1: Install Prisma as a development dependency

```bash
npm install -D prisma
# or with yarn
yarn add -D prisma
```

## Step 2: Initialize Prisma in your project

```bash
npx prisma init
```

This command creates:
- A `prisma` directory with a `schema.prisma` file
- A `.env` file for environment variables (including your database URL)

## Step 3: Configure your database connection

Edit the `prisma/schema.prisma` file to specify your database provider:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql" // or "mysql", "sqlite", "sqlserver", "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

And set your database URL in the `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

## Step 4: Define your data models

Add your models to the `schema.prisma` file:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Step 5: Install Prisma Client

```bash
npm install @prisma/client
# or with yarn
yarn add @prisma/client
```

## Step 6: Generate Prisma Client based on your schema

```bash
npx prisma generate
```

## Step 7: Create and run migrations

Create a migration to apply your schema changes to the database:

```bash
npx prisma migrate dev --name init
```

This command:
- Creates a new migration file
- Applies the migration to your database
- Regenerates Prisma Client

## Step 8: Use Prisma Client in your application

```javascript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  })
  console.log('Created new user:', newUser)

  // Get all users
  const allUsers = await prisma.user.findMany()
  console.log('All users:', allUsers)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## Additional Commands

- **View your database**: `npx prisma studio`
- **Format your schema**: `npx prisma format`
- **Apply migrations in production**: `npx prisma migrate deploy`
- **Reset your database**: `npx prisma migrate reset`

## Advanced Migration Management

### Creating New Migrations

When you modify your schema, create a new migration:

```bash
npx prisma migrate dev --name added_user_profile
```

### Migration Development vs Production

In development:
```bash
npx prisma migrate dev
```

In production:
```bash
npx prisma migrate deploy
```

### Resetting the Database (Development Only)

Reset entirely (drops all tables and recreates from migrations):
```bash
npx prisma migrate reset
```

### Viewing Migration History

```bash
npx prisma migrate status
```

### Resolving Migration Conflicts

If you have migration conflicts between team members:

1. Revert your local schema changes
2. Pull the latest migrations from your repository
3. Apply them with `npx prisma migrate dev`
4. Re-add your schema changes and create a new migration

## Working with Prisma Client

### Setting Up a Shared Prisma Client Instance

Create a `prisma.js` file in your project:

```javascript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

### Common CRUD Operations

```javascript
// Import your shared client
import prisma from './prisma.js'

// Create
const createUser = async (data) => {
  return await prisma.user.create({ data })
}

// Read
const getUsers = async () => {
  return await prisma.user.findMany()
}

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  })
}

// Update
const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data
  })
}

// Delete
const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id }
  })
}
```



### Seeding the Database

Create a `prisma/seed.js` file:

```javascript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({})
  
  // Create seed data
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'user1@example.com',
        name: 'User One'
      }
    }),
    prisma.user.create({
      data: {
        email: 'user2@example.com',
        name: 'User Two'
      }
    })
  ])
  
  console.log('Database seeded with:', users)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Add to your package.json:
```json
{
  "scripts": {
    "seed": "node prisma/seed.js"
  },
  "prisma": {
    "seed": "node prisma/seed.js"
  }
}
```

Run seeds with:
```bash
npx prisma db seed
```

For more detailed information, refer to the [Prisma documentation](https://www.prisma.io/docs/). 