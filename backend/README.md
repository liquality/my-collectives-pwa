# Group Mints Backend

## Database
### Initialization

1. Using Docker (Recommended)
- just need to start docker and then run the local script `./db.sh`, it will create the container and all db setup with local access

2. Local installation

- [https://www.postgresql.org/download/macosx/](https://www.postgresql.org/download/macosx/)

- you can run this sql before start

```
CREATE USER group_mints WITH PASSWORD '1q2w3e';

CREATE DATABASE group_mints OWNER group_mints TABLESPACE groupmintsspace;

USE group_mints;

```

### Migrations

- Add a new migration, run: `npm run migrate:make [migration_name]`

### Model Changes

-- TODO

### Database Seed

- To seed the database with test data, run: `npm run seed:run`


```bash
  npm ci && npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
WALLET_PRIVATE_KEY=paste_your_private_key_here
THIRDWEB_SECRET_KEY=paste_your_secret_key_here
```
