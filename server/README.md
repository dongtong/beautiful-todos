## Beautiful TODOs API

### Features

- ✔ Express framework
- ✔ MVC architecture
- ✔ TypeScript support
- ✔ Prisma ORM(MySQL)
- ✔ Customize error, log and catch all error
- Swagger document support
- Zod schema validation
- Rate limit
- Schema validation with zod
- Jest unit test

### How to run?

#### Setup

Pull the code and create `.env` in server root directory, the content likes below

```.env
DATABASE_URL="mysql://{username}:{password}@localhost:3306/beautiful-todos?connection_limit=5"
```

If you use Postgres, please change the connection link

#### Install

Enter the server directory and execute the below command

```bash
$ npm install
```

#### Run the application

Enter the server directory and execute the below command

```bash
$ npm run dev
```

or

```bash
$ npm start
```
