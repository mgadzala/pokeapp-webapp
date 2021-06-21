React js frontend app with Spring Boot Java backend application. Fetching https://pokeapi.co/ api through backend.

Java: jdk-11.0.11.9-hotspot

Prerequisites: Node >= 10.16 and npm >= 5.6

## Starting backend
From project root folder
===
```
$ ./mvnw spring-boot:run

```

## Starting frontend
From project root folder
===
```
$ npx create-react-app frontend

$ cd .\frontend\

$ npm i react-modal

Overrite with our source code
$ cp -Force ..\src\main\ui-react\* .

$ npm start
```

Site should be available at:
http://localhost:3000/
