// user model type

export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  likedMovies: string[];
  friends: string[];
  occupation: string;
}
