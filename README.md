<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API to retrieve and sync Products.

## Project setup

Install dependencies.
```bash
$ npm install
```

Run server.
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Run tests.
```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

Seed products.
```bash
# run sync
$ npm run products:first-sync
```
## Run demo using Docker 🎯

> **Tip**: Use **.env.example** to set the correct env vars in your **.env** file

To build app is required `CONTENTFUL_ACCESS_TOKEN` env var this value you can found in PDF file of test.

```bash
# 1. Build app
$ make build-app

# 2. Run app
$ make up-app

# 3. Sync products to retrieve data
$ make sync-products
```

Optional: You can set the access token like it:

```bash
$ export CONTENTFUL_ACCESS_TOKEN=my_at
```

## Endpoints
**Public**
GET all products and filters:
```markdown
curl --location 'http://localhost:3000/api/products?priceFrom=50&priceTo=250'
```

**Private**
Use LOGIN endpoint to get your access token:
```markdown
curl --location --request POST 'http://localhost:3000/auth/login' \
--data ''
```

GET deleted products percentage:
```markdown
curl --location 'http://localhost:3000/api/reports/deleted' \
--header 'Authorization: Bearer token'
```

GET counter products by group:
```markdown
curl --location 'http://localhost:3000/api/reports/grouped?field=brand' \
--header 'Authorization: Bearer token'
```

For full documentation of endpoints. Check the **Swagger UI** [here](http://localhost:3000/api/docs).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
