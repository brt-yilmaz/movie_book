import { IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type LikedUsers = {
  likedUserName: string
  likedUserPhoto: string
  likedUserID: string
}

const StyledDescription = styled("div")({
  display: "flex",
  gap: "1rem",
})



export default function Description({ likedUsers, description, genres }: { likedUsers: LikedUsers[], description: string, genres: { id: string, name: string }[] }) {
  return (
    <StyledDescription>
      <div style={{ display: "flex", flexBasis: "30%", margin: "0.8rem", gap: "1rem", padding: "6rem 0 0 1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        {(genres.slice(0, 4).map(({ name }) => (

          <Button
            key={name}
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            {name}
          </Button>

        )))}
      </div>
      <div style={{ flexBasis: "50%", display: "flex", flexDirection: "column", gap: "1rem", }}>

        <Typography >{description.split(" ").slice(0, 50).join(" ")}</Typography>
        <div >

          <AvatarGroup max={5} sx={{ display: "flex", flexDirection: "row" }}>
            {likedUsers?.map((user) => (
              <div key={user.likedUserID} style={{ position: "relative" }}>
                <Avatar
                  key={user.likedUserID}
                  alt={user.likedUserName}
                  src={user.likedUserPhoto}
                // add on Click
                />

                <AddIcon style={{ position: "absolute", top: "-15%", left: "30%" }} />


              </div>
            ))}
          </AvatarGroup>
        </div>
      </div>
    </StyledDescription >
  );
}