# Wallet App Server

This app is the backend for the client [Wallet App](https://github.com/ZowWeb/wallet-client).

## Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

## Set up

Clone this project and run the following command:

`yarn install` or `npm install`

## Development

To run the app in the development mode

`yarn dev`

This will open up the server on [http://localhost:5000](http://localhost:5000).

```
🚀 Server running at 5000 in development mode
```

## API

This app serves API endpoints for the Wallet App client.

- ### Test

`GET` request to `/api/test` should send back a successful response

```
{
  msg: 'API is working',
}
```

- ### Setup

`POST` request to `/api/setup` must have `name` and optional `balance` in request body

```
{
  "name": "My Wallet"
}
```

this should send back a successful response

```
{
  "id": "38c7ce99-f902-40a9-99f8-79a9de0569e",
  "name": "My Wallet",
  "transactionId": "6138b812ec7ba892c714cb1",
  "balance": 0,
  "date": "2021-09-08T19:48:30.231Z"
}
```

- ### Wallet

`GET` request to `/api/wallet/:id` must have `id` in request params

```
/api/wallet/38c7ce99-f902-40a9-99f8-79a9de0569e
```

this should send back a successful response

```
{
  "_id": "38c7ce99-f902-40a9-99f8-79a9de0569e",
  "name": "My Wallet",
  "balance": 0,
  "date": "2021-09-08T19:48:30.231Z",
  "__v": 0
}
```

- ### Make a transaction

`POST` request to `/api/transact/:walletId` must have `walletId` in request params and `amount` & `description` in request body

```
/api/transact/38c7ce99-f902-40a9-99f8-79a9de0569e
{
  "amount": 15.99,
  "description": "Add to wallet"
}
```

this should send back a successful response

```
{
  "balance": 15.99,
  "transactionId": "61375b13cb20ae0a4221ae06"
}
```

- ### All transactions

`GET` request to `/api/transactions` must have `walletId` in request query and optional `skip` & `limit` 

```
/api/transactions?walletId=38c7ce99-f902-40a9-99f8-79a9de0569e
```

this should send back a successful response

```
[
  {
    "_id": "6138b812ec7ba892c714cb1",
    "walletId": "38c7ce99-f902-40a9-99f8-79a9de0569e",
    "amount": 0,
    "balance": 0,
    "type": "CREDIT",
    "description": "Initial",
    "date": "2021-09-08T19:48:30.231Z",
    "__v": 0
  },
  {
    "_id": "61375b13cb20ae0a4221ae06",
    "walletId": "38c7ce99-f902-40a9-99f8-79a9de0569e",
    "amount": 15.99,
    "balance": 15.99,
    "type": "CREDIT",
    "description": "Add to wallet",
    "date": "2021-09-08T19:58:30.231Z",
    "__v": 0
  }
]
```


## ESLint

ESLint will be automatically installed in your application for development. But you need to have the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed for the linter to work.

