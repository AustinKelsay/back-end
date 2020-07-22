# back-end
Authentication
Method	Endpoint	Returns	Parameters
POST	/api/auth/register	201 with the registered user object	username, password
POST	/api/auth/login	200 with a welcome message and a token	username andpassword (required)

classes
Method	Endpoint	Returns	Parameters
GET	/api/classes	200 with array of items with user information	
POST	/api/classes	201 with the created item object	Authorization token in the header,        
    `name`,
    `type`,
    `startTime`,
    `duration`,
    `intensity`,
    `location`,
    `numberOfRegisteredAttendees`,
    `maxClassSize`, (required), |
| PUT | /api/class/:id | 200 with the updated item object | Authorization token in the header, same fields as POST request, all optional | 
| DELETE | /api/class/:id | 204 with no content | Authorization token in the header |

User
Method	Endpoint	Returns	Parameters
| GET | /api/auth/users | 200 array of items that is posted by logged in user | Authorization token in the header |
