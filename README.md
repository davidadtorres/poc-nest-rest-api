API REQUEST EXAMPLES
====================
GET ALL POSTS
-------------
`curl http://localhost:3000/posts`

CREATE POST
-----------
`curl -d '{"created_at": "2021-02-21T15:10:23.877Z",`
`"updated_at": "2021-02-21T15:10:23.877Z",`
`"title": "My first post 3000",`
`"author": "David Díaz",`
`"technologies": [{`
`"tech_id": 1,`
`"version": "1.0.0"`
`}],`
`"category_id": "6032658ed358665bf2ad8fd9",`
`"url": "https://www.foobar.com",`
`"banner_img": "file://foobar.jpeg",`
`"sections": [{`
`"title": "My first section 3000",`
`"content": "My first section content 3000"`
`}]}' -H "Content-Type: application/json" -X POST http://localhost:3000/posts`

LOGIN USER
----------
curl -X POST http://localhost:3000/auth/login -d '{"username": "test@mail.com", "password": "testpassword"}' -H "Content-Type: application/json"

GET USER PROFILE
----------------
`curl http://localhost:3000/auth/profile`

`curl http://localhost:3000/auth/profile -H "Authorization: Bearer <Access_Token>"`

`curl http://localhost:3000/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAbWFpbC5jb20iLCJzdWIiOiI2MDNjMDhkNmYzYTkyZjBiYzgyYmU3NzIiLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2MTQ5NzYzNTcsImV4cCI6MTYxNDk4NzE1N30.hMwfmePsBly_rhCu3EOcfkz1lp85fxpsevqByW5eRlo"`

REGISTER USER
-------------
`curl -X POST http://localhost:3000/auth/register -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAbWFpbC5jb20iLCJzdWIiOiI2MDQyOWQ0OTI1OTZhYjExOGYwZjc2OGYiLCJyb2xlcyI6W10sImlhdCI6MTYxNTE0MjQ2MywiZXhwIjoxNjE1MTUzMjYzfQ.NGEf-13VfMWepNQNqPrarFnTv3QbL9ZECZkNIzapSmY"`

RESTORE USER PASSWORD
---------------------
`curl -X POST http://localhost:3000/auth/restore -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAbWFpbC5jb20iLCJzdWIiOiI2MDQyOWQ0OTI1OTZhYjExOGYwZjc2OGYiLCJyb2xlcyI6W10sImlhdCI6MTYxNTE0MzczNiwiZXhwIjoxNjE1MTU0NTM2fQ.3zZd89cteORdYcosyEPfVc7OyLHfEwmDvyYK6D97OAQ"`

.ENV-DEV
--------
```
PROJECT_NAME=Robin's 10
SECRET_KEY=20fioafjdlafdah0f-<z.mcpapqkdsakfjdp1'3490ujirfa
MONGODB_URI=mongodb://192.168.56.9:27017
MONGODB_DB=robins10-pwa
MONGODB_USER=mongoadmin
MONGODB_PASS=D35@rr0ll0
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_IGN_TLS=true
MAIL_SECURE=false
MAIL_FROM=eef5a21d4b-444023@inbox.mailtrap.io
MAIL_INCOMING_USER=c067b5046b7106
MAIL_INCOMING_PASS=3023cc11a7fc64
```

## License
This repo is [MIT licensed](https://github.com/davidadtorres/poc-nest-rest-api/blob/master/LICENSE).
