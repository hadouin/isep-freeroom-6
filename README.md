# FreeRoom Edelweiss

## Install dependencies

```shell
pnpm install
```

## Developing

```shell
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Prisma Database

Apply migrations:

```shell
npx prisma migrate dev
```

Seed the database if need be:

```shell
npx prisma db seed
```

After changing the prisma schema, create a new migration:

```shell
npx prisma migrate dev --name <migration-name>
```

To re-generate Prisma Client, run:

```shell
npx prisma generate
```

## Building

To create a production version of the app:

```shell
pnpm run build
```

You can preview the production build with `pnpm run preview`.

To deploy, you may need an [adapter](https://kit.svelte.dev/docs/adapters) depending on the target environment.
