# Cart Management Service
This service will list our products and allow adding them to cart.

## Installation
Rum docker-compose to install and run.

```bash
docker-compose up
```

## Mongo
Mongo image will be pulled from docker hub and initialized on port 27017.

## Seed Data
Seed data (10 products) will be inserted automatically into mongo via /mongo-seed container and will exit afterwards.

## GraphQL
Point to http://localhost:7500/graphql to interact with graphql interface.