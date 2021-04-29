## Stack
FrontEnd:
- React
- Vanilla CSS

BackEnd:
- NodeJS
- Express
- PostgreSQL

## Start

Front:
```
cd client
npm install
npm start
```

Back:
```
npm install
Add .env file and create database credentials variables listed in the ./db/index.js file.
npm start

```

React runs on : http://localhost:3000

Backend runs on : http://localhost:5000


```

Download PostgreSQL : https://www.postgresql.org/download/

windows>postgresql>psql
enter your password

* Create Database 
* Create Table     


usefull links:
https://www.postgresql.org/docs/13/index.html
https://www.postgresqltutorial.com/

some commands:
\?  <<list of commands>>
\c nameofdatabase   <<connect to the db>>
\d
\dt
\d table name
\l list of databases

if you get this message for a command: 'more' is not recognized as an internal or external' command, operable program or batch file.
** To fix run:  arthur=> \pset pager off **

SET UP EXPRESS / NODE-POSTGRES usefull links:

https://node-postgres.com/guides/async-express
https://node-postgres.com/features/connecting

Heroku: 

a) add "engines" to backend package.json file
node -v
npm -v

b) add "heroku-postbuild" to scripts
c) login into heroku
    a) heroku create name-of-website
    b) heroku addons:create heroku-postgresql:hobby-dev         (<===creates db)
    c) heroku pg:psql -a name-of-website      (<===connects to db and creates process.env.DATABASE_URL ) 
    d) add employees table to the heroku database created in step c.
    cat database.sql | pg:psql -a name-of-website



