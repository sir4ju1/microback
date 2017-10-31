# Microback
### An API microservice server using koa. It can be used to build both REST API and Websocket server.

### For starter application please look at: [microback-starter](https://github.com/sir4ju1/microback-starter)

## Documentation
### To start from scratch
 1. ```yarn add microback```
 2. add .env file 
 3. add following key
    ``` 
        PORT=2020
        MONGODB=mongodb://localhost:27017/yourdb
        SECUREKEY=my-key
    ```
  4. add `app` folder
  5. add `api` inside `app` folder
  6. create your first REST API controller which in this case `UserRest`
      ``` javascript
        /** 
          * import all necessary function from microback
          * RestGen is responsible to create automatic route
          * route is decorator funciton
          * auth is used for hashing some string e.g. password
          */ 
        import { RestGen, route, auth } from 'microback'
        import User from 'model/user'
        class UserRest extends RestGen {
          /**
            * construction is used to pass the name
            * of the endpoint which will be automatically pluralized
            * for certain endpoints which can be checked from
            * http://yourhost/routes
            * second argument is for model object if you need to create
            * automatic RESt routes for a certain model and this is optional
            */
          constructor () {
            super('user', User)
          }
          /**
            * creating route with method and path
            * using decorator pattern and write 
            * function using async await
            */
          @route('post', 'login')
          async login (ctx) {
            try {
              let body = ctx.request.body
              body.password = auth.generateHash(body.password)
              const token = await auth.login(body.email, body.password, User)
              ctx.body = { success: true, token }
            } catch (error) {
              ctx.body = { success: false, error }
            }
          }
        }
        export default UserRest
      ```
