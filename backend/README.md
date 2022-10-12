# Backend

### Requirements

    NPM/Yarn  (Yarn is recommended)
    Node 16
    PostgresDB

## Common setup

Copy .env.example to .env and inject your credentials so it looks like this:
NODE_ENV='development'
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/challege-full-stack-web?schema=public"
JWT_SECRET="9038aca1-a1c0-49c0-9e9c-d6638bc25531"

#### Install dependencies

    yarn install

#### DB Migrations

    yarn prisma migrate deploy

#### DB Seed

    yarn db seed

#### Build

    yarn build

#### Start

    yarn start

Open http://localhost:3000.
