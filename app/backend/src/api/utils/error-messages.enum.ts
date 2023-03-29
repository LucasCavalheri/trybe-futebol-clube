enum ErrorMessage {
  TOKEN_NOT_VALID = 'Token must be a valid token',
  TOKEN_NOT_FOUND = 'Token not found',
  INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password',
  EMPTY_FIELDS = 'All fields must be filled',
  TEAM_NOT_FOUND = 'There is no team with such id!',
  EQUAL_TEAMS = 'It is not possible to create a match with two equal teams',
}

export default ErrorMessage;
