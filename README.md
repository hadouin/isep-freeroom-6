# FreeRoom • Edelweiss

## Manuel de déloiement

### Développement

Prérequis :
- pnpm https://pnpm.io/installation#using-npm
- docker https://docs.docker.com/get-docker/

1. Cloner le dépôt

```sh
git clone git@github.com:hadouin/isep-freeroom-6.git
```

2. Installer les dépendances

```sh
pnpm install
```

3. Lancer la base de donnée locale et set les variables d'environnement

```sh
docker-compose up -d
```

4. Seed la base de donnée (créer les données de test)

```shell
npx prisma db seed
```

4. Lancer le serveur de développement

```sh
pnpm dev
```

5. Ouvrir le navigateur à l'adresse http://localhost:5173

### Production

Prérequis :
- vercel account
- postgres database in vercel

1. Lier le dépôt à vercel

```sh
vercel login
vercel
```

2. Configurer les variables d'environnement avec les valeurs de la base de données postgres récupéré en production

3. Déployer

```sh
vercel --prod
```

### Prisma Database

Apply migrations:

```shell
pnpm exec prisma migrate dev
```

Seed the database if need be:

```shell
pnpm exec prisma db seed
```

After changing the prisma schema, create a new migration:

```shell
pnpm exec prisma migrate dev --name <migration-name>
```

To re-generate Prisma Client, run:

```shell
pnpm exec prisma generate
```
