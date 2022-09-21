# Guilherme Cunha - Strider Backend Assessment

## About
This project is a 100% functional API created using Clean Architecture. At the moment this API can be run serverless or not, besides allowing to choose between SQLite and MySQL databases. 

The project has several tools that help in the quality and maintainability of the code, such as Jest, Prettier, Eslint, Supertest, and a Debug already configured for VS Code.
## Setup
### Setup conventional API

#### Using Docker and MySQL (suggested)
1. Use docker-compose
```bash
podman-compose up -d
```
4. There, the API will be available in http://localhost:3333
#### Using VS Code Debugger and SQLite (easiest)
1. Install NodeJs at a version 14 or higher
2. Install the project dependencies
```bash
yarn install
```
3. You need to click on the debug option called "Start API with SQLite"
4. There, the API will be available in http://localhost:3333

#### Using manual configuration and SQLite
1. Install NodeJs at a version 14 or higher
2. Install the project dependencies
```bash
yarn install
```
3. Configure o arquivo .env com as informaçoes abaixo:
```text
DATABASE_TYPE=sqlite
PORT=3333
```
4. Start the API with the command below
```bash
yarn run dev:api
```
5. There, the API will be available in http://localhost:3333

#### Using manual configuration and MySQL
1. Install NodeJs at a version 14 or higher
2. Install the project dependencies
```bash
yarn install
```
3. Configure the .env file with the keys below, keeping DATA_TYPE and PORT, and changing the other variables with correct values:
```text
DATABASE_TYPE=mysql
DATABASE_HOST={{your-value-here}}
DATABASE_NAME={{your-value-here}}
DATABASE_USERNAME={{your-value-here}}
DATABASE_PASSWORD={{your-value-here}}
PORT=3333
```
4. Run the migrations
```bash
yarn run typeorm migration:run -d src/infrastructure/db/typeorm/mysql/data-source.ts
```
5. Start the API with the command below
```bash
yarn run dev:api
```
5. There, the API will be available in http://localhost:3333

### Setup Serverless API

#### Using VS Code Debugger and SQLite
1. Install NodeJs at a version 14 or higher
2. Install the project dependencies
```bash
yarn install
```
3. You need to click on the debug option called "Start Lambda API with SQLite"
4. There, the API will be available in http://localhost:3333
#### Using manual configuration and SQLite
1. Install NodeJs at a version 14 or higher
2. Install the project dependencies
```bash
yarn install
```
3. Configure the .env file with the information below:
```text
DATABASE_TYPE=sqlite
PORT=3333
```
4. Start the API with the command below
```bash
yarn run dev:lambda:api
```
5. There, the API will be available in http://localhost:3333

## Critique
### About scaling

Several points would influence the possible scalability problems, but to define a scenario with what is already developed, I will consider that this API will be initially hosted on AWS, through containers managed by EKS (application), and with a MySQL database managed by RDS (database), for the following reasons:
    - EKS will allow the use of containers, facilitating vertical scalability, as well as allowing a fast response time, without "cold starts".
    - RDS, being a managed database service, would bring us several advantages like backup, security and scalability. MySQL database was chosen as an example, but because of the Clean Architecture implementation, it would be easy to move to any other.

Possible problems:
    - If the number of requests is too high
        - Application: To try to reduce the overload, it could be implemented the caching of possible answers through REDIS.
        - Database: It would be necessary to initially scale it vertically, which would possibly cause higher cost and possible degradation in response time. As an alternative, CQRS could be implemented in code, which would allow us to use read replicas to solve this problem.
    - If the number of requests is unpredictable, or the cost is too high
        - Application: Migration of the API to serverless functions can be studied, making the scalability of the application practically unlimited. This migration could take the whole API to serverless, as well as it could only change the application in the points that allow asynchronous processing using SNS's and SQS's and Lambdas.
        - Database: Probably CQRS together with the read replica databases would be enough to support the requests, but as a last case we could study the possibility of migrating to a non-relational serverless database, like DynamoDB
    
### Improvements for the future
- Validate that the author of the post exists before submitting the post
- Add unit tests for all files.
- Add integration tests to all flows.
- Add validation on all layers, ensuring data conformity
- Document API, using a tool like Swagger
- Add Log Management Software, such as Datadog
- Add Error Trancking, such as Sentry
- Create CI and CD
- Add Authorization, to make the API non-public and allow actions such as disallowing when a user tries to create a post pretending to be another user.

#### Comments:
I have not used GitFlow because I have no defined tasks, but on a day-to-day basis it is indispensable
I didn't create branches for each environment, but of course I would never create commits directly on the master