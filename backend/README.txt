***API REFERENCE GUIDE***

>>AUTHENTICATION ENDPOINTS<<

Registering a new user (An email will be sent to the given email for verification):
URL			-	http://localhost:5000/register
METHOD		-	POST
BODY		-	{
					username: String,
					firstname: String,
					lastname: String,
					email: String,
					password: String
				}
RESPONSE	-	SUCCESSFUL
				http code 201
				{
					success: true,
					msg: "User created"
				}
			-	UNSUCCESSFUL
				http code 400
				{
					success: false,
					msg: "'Username already exists'"
				}
				http code 500
				{
					success: false,
					msg: "Internal server error",
					{errorMessage}
				}

Confirmation of newly created user (A user is verified by clicking the link sent to their given email after registration):
URL			-	http://localhost:5000/confirm
METHOD		-	POST
BODY		-	{
					token: String
				}
RESPONSE	-	SUCCESSFUL
				http code 200
				{
					success: true,
					msg: "User verified. Token attached"
				}
			-	UNSUCCESSFUL
				http code 400
				{
					success: false,
					msg: "Invalid token given"
				}
				http code 500
				{
					success: false,
					msg: "Token could not be generated at this time"
				}
				http code 500
				{
					success: false,
					msg: "Internal server error",
					{errorMessage}
				}

Logging in a user (A JWT is returned to be used for subsequent requests upon success):
URL			-	http://localhost:5000/register
METHOD		-	POST
BODY		-	{
					username: String,
					password: String
				}
RESPONSE	-	SUCCESSFUL
				http code 200
				{
					success: true,
					msg: "User exists. Token attached"
				}
			-	UNSUCCESSFUL
				http code 400
				{
					success: false,
					msg: "User not found"
				}
				http code 403
				{
					success: false,
					msg: "User not active"
				}
				http code 401
				{
					success: false,
					msg: "Password is invalid"
				}
				http code 500
				{
					success: false,
					msg: "Token could not be generated at this time"
				}

Forgot password (Interchangeably handles both 'forgot password' and logged in users who request to change their password):
URL			-	http://localhost:5000/forgotPassword
METHOD		-	POST
BODY		-	{
					username: String,
					forgot: Boolean (true: forgot password, false: request to change password)
				}
RESPONSE	-	SUCCESSFUL
				http code 200 (forgot = true)
				{
					success: true,
					msg: "Change password email has been sent to the user"
				}
				http code 200 (forgot = false)
				{
					success: true,
					msg: "Token attached",
					resetToken: String
				}
			-	UNSUCCESSFUL
				http code 400
				{
					success: false,
					msg: "User does not exist"
				}
				http code 500
				{
					success: false,
					msg: "Internal server error",
					{err}
				}

Change password (The new password along with the resetToken received from the 'Forgot password'  is provided):
URL			-	http://localhost:5000/forgotPassword
METHOD		-	POST
BODY		-	{
					username: String,
					forgot: Boolean (true: forgot password, false: change password)
				}
RESPONSE	-	SUCCESSFUL
				http code 200
				{
					success: true,
					msg: "User successfully changed their password"
				}
			-	UNSUCCESSFUL
				http code 400
				{
					success: false,
					msg: "Invalid username"
				}
				http code 500
				{
					success: false,
					msg: "Internal server error",
					{err}
				}

Validate Reset Token:
URL			-	http://localhost:5000/validateResetToken
METHOD		-	POST
BODY		-	{
					resetToken: String
				}
RESPONSE	-	SUCCESSFUL
				http code 200
				{
					success: true,
					msg: "Reset Token valid"
				}
			-	UNSUCCESSFUL
				http code 400
				{
					success: false,
					msg: "Reset Token invalid"
				}
				http code 500
				{
					success: false,
					msg: "Internal server error",
					{err}
				}

>>USER ENDPOINTS<<

Pending...