# Node + Typescript api example

An example Api using Node.js, Typescript, Express and JWT token for authentication, based on the following articles:

https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/#Get-Starts-with-TypeScript-in-Node-js
https://nozzlegear.com/blog/implementing-a-jwt-auth-system-with-typescript-and-node

## Run
To run the project, use
```
npm run dev
```
## Example queries

Login: Retrieve a token
```
curl -X POST http://localhost:7000/api/session/login -i
```

For the api endpoints, add the authorization headers as the following:
```
curl -H 'Authorization:Bearer <TOKEN_HERE>' http://localhost:7000/api/menu/items -i
```

Endpoints
```
curl http://localhost:7000/api/menu/items -i
curl http://localhost:7000/api/menu/items/2 -i
curl -X POST -H 'Content-Type: application/json' -d '{
  "name": "Salad",
  "price": 499,
  "description": "Fresh",
  "image": "https://images.ctfassets.net/23aumh6u8s0i/5pnNAeu0kev0P5Neh9W0jj/5b62440be149d0c1a9cb84a255662205/whatabyte_salad-sm.png"
}' http://localhost:7000/api/menu/items -i
curl http://localhost:7000/api/menu/items/ -i
curl -X PUT -H 'Content-Type: application/json' -d '{
  "name": "Spicy Pizza",
  "price": 599,
  "description": "Blazing Good",
  "image": "https://images.ctfassets.net/23aumh6u8s0i/2x1D2KeepKoZlsUq0SEsOu/bee61947ed648848e99c71ce22563849/whatabyte_pizza-sm.png"
}' http://localhost:7000/api/menu/items/2 -i
curl http://localhost:7000/api/menu/items/2 -i
curl -X DELETE http://localhost:7000/api/menu/items/2 -i
curl http://localhost:7000/api/menu/items/ -i
```