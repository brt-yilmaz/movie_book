import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

type LikedUsers = {
  likedUserName: string
  likedUserPhoto: string
  likedUserID: string
}

export default function Description ({ likedUsers, description}: {likedUsers: LikedUsers[], description: string}) {
  return (
    <div>
      <Typography>{description}</Typography>
      <AvatarGroup max={10}>
        {likedUsers?.map((user) => (
          <Avatar
            key={user.likedUserID}
            alt={user.likedUserName}
            src={user.likedUserPhoto}
            // add on Click
          />
        ))}
      </AvatarGroup>
    </div>
  );
}