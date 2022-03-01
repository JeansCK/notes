# Notes+ Application

## Note + Checklist responsive web application auth by JWT built using MongoDB, Express, NodeJS, ReactJS

![](/docs/notes-1.png)

[Live Demo](https://notes.jeansdev.com)

### Add your own .env files like the following example: ###

**.env (Back-End)**
```
DEV_PORT=8080
SECRET=JWTSecretKey
DB_URL=mongodb://localhost:27017/notes
CORES_ORIGIN=http://localhost:8081
```

**/client/.env (Front-End)**
```
PORT=8081
REACT_APP_API_URL=http://localhost:8080/api
```