# Group Mints Backend

## Database

### Initialization

1. Using Docker (Recommended)

- just need to start docker and then run the local script `./docker-db.sh`, it will create the container and all db setup with local access

2. Local installation

   2.1 Install it using homebrowe `brew install postgresql@16`
   2.2 Run it `brew services run postgresql@16` (use `start` if you want to start the service at login)
   2.3 Go to the install folder `cd /usr/local/opt/postgresql@16`
   2.3 Copy the config file to enable the inital user `cp pg_hba.conf.sample pg_hba.conf`
   2.5 run `psql postgres` then you can go to the step 3 and create

3. Run the following to create a new user and databse

- `postgres=# CREATE USER group_mints WITH PASSWORD '1q2w3e';`

- `postgres=# CREATE DATABASE group_mints OWNER group_mints;`

### Migrations

- Add a new migration, run: `npm run migrate:make [migration_name]`

### Model Changes

-- TODO

### Database Seed

- To seed the database with all the tables and relations, run: `npm run seed:latest`

- To seed the database with test data, run: `npm run seed:run`

```bash
  npm ci && npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
MYSQLHOST=
MYSQLUSER=
MYSQLDATABASE=
MYSQLPASSWORD=
MYSQLPORT=
MORALIS_API_KEY=
SOUND_API_KEY=
ALCHEMY_API_KEY_RPC=
```
