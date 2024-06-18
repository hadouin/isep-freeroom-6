# FreeRoom • Edelweiss

## Manuel de déploiement

### Développement

Prérequis :

- pnpm https://pnpm.io/installation#using-npm
- docker https://docs.docker.com/get-docker/

1. Cloner le dépôt

   ```shell
   git clone git@github.com:hadouin/isep-freeroom-6.git
   ```

2. Installer les dépendances

   ```shell
   pnpm install
   ```

3. Copier l'exemple dans le fichier .env et le modifier au besoin

   ```shell
   cp .env.example .env
   vi .env
   ```

4. Lancer la BDD locale

   ```shell
   docker-compose up -d
   ```

5. Effectuer les migrations de la BDD

   ```shell
   pnpm exec prisma migrate dev
   ```

6. Seed la BDD (crée les données initiales)

   ```shell
   pnpm exec prisma db seed
   ```

7. Lancer le serveur de développement

   ```shell
   pnpm dev --open
   ```

   Ou ouvrez manuellement le navigateur à l'adresse http://localhost:5173 après avoir executé :

   ```shell
   pnpm dev
   ```

### Preview (visualisation de la production en local)

```shell
pnpm postinstall
pnpm run build
pnpm run preview
```

### Production

Définir les variables d'environnement `POSTGRES_PRISMA_URL` et `EMAIL_URL`, puis :

```shell
pnpm install
pnpm run build
```

Mettre en place un cron pour mettre à jour les événements sur `/api/events/update` :
<br/>`*/15 7-22 * * 1-5` = Tous les quarts d'heure de 7h à 22h45 du lundi au vendredi

Les requêtes en production prennent en moyenne 12s ; minimum 7.88s ; maximum 13.46s (calculée sur 6 jours).
Pour référence, une requête de 10.63s comprend une attente des calendriers d'HyperPlanning de 9.596s.

### Production (sur Vercel)

Prérequis :

- compte Vercel
- BDD Postgres sur Vercel (dans storage)

1. Lier le dépôt à vercel

   ```shell
   vercel login
   vercel
   ```

2. Configurer les variables d'environnement (`POSTGRES_PRISMA_URL` déjà configuré par la BDD)

3. Déployer

   ```shell
   vercel --prod
   ```

### Prisma Database

Re-generate Prisma Client (updates the client, not the database):
<br/><small>Useful in dev after changing the schema to update the definitions that reflect the model structures</small>

```shell
pnpm exec prisma generate
```

After changing the prisma schema, create a new **migration**:

```shell
pnpm exec prisma migrate dev --name <migration-name>
```

Apply migrations in **development**:

```shell
pnpm exec prisma migrate dev
```

Or in **staging / production**:

```shell
pnpm exec prisma migrate deploy
```

**Seed** the database:
<br/><small>Used to add the rooms and their events when initialising the database</small>

```shell
pnpm exec prisma db seed
```

**Reset** database and apply all migrations (all data will be lost):

```shell
pnpm exec prisma migrate reset
# [--skip-generate] [--skip-seed]
```
