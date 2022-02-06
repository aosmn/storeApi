# Storefront Backend Project

## Getting Started

### Database & Server Info
---
- **Server Port** 3000
- **Database Port** 5432

- **Database creation**
```sh
CREATE USER store_admin WITH PASSWORD 'password123';

CREATE DATABASE store;

CREATE DATABASE store_test;
```

---
### Server Setup
---
To be able to run th server you need to:

- Create .env file similare to the provided .env.example file
- Run `npm i`
- Run `npm run migrate` to run the db migrations.
- Run `npm run start`

**Server runs on port 3000**

To test the app:

- Run `npm run test`
