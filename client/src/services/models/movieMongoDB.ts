interface LikedUser {
  likedUserName: string;
  likedUserPhoto: string;
  likedUserID: string;
}

export interface MovieMongoDB {
  imdbID: string;
  likedBy: LikedUser[];
}