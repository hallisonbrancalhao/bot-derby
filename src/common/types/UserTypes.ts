export interface UserInterface extends Document {
  email: String;
  firstName: String;
  lastName: String;
}

export interface UserType {
  email: String;
  firstName: String;
  lastName: String;
}

export interface ConnectionUserGLPI {
  usernameDiscord: String;
  email: String;
  usernameGLPI: String;
}
