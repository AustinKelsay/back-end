## User

| Method | Endpoint                                  | Returns                                                         | Parameters                                                                                                     |
| ------ | ----------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |

| GET    | `/api/auth/users`                 | `200` array of items that is posted by logged in user           | Must have authorization token in the header                                                                              |


## classes

| Method | Endpoint         | Returns                                         | Parameters                                                                                                                                           |
| ------ | ---------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/classes`     | `200` with array of items with user information | Authorization in the header
| POST   | `/api/classes`     | `201` with the created item object              | name, type, startTime, duration, intensity, location, numberOfRegisteredAttendees, maxClassSize       
| PUT  | `/api/classes/:id` | `200` with the updated item object              | Authorization token in the header, same fields as POST request, all optional                                                                         |
| DELETE | `/api/classes/:id` | `204` with no content                           | Authorization token in the header                                                                                                                    |

## Authentication

| Method | Endpoint        | Returns                                  | Parameters                                                                                                                               |
| ------ | --------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/auth/register` | `201` with the registered user object    | `username`, `password` 
| POST   | `/api/auth/login`    | `200` with a welcome message and a token | `username` and`password` (required)                                                       
