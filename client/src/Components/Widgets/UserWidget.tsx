import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "../../ui/FlexBetween";
import WidgetWrapper from "../../ui/WidgetWrapper";
import { Link, useNavigate } from "react-router-dom";
import UserImage from "../../ui/UserAvatarBase";
import { useGetUserQuery } from "../../services/userApi";
import AdvertWidget from "./AdWidget";

type UserWidgetProps = {
  userId: string;
  picturePath: string;
};

const UserWidget = ({ userId, picturePath }: UserWidgetProps) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const {
    isLoading,
    isSuccess,
    data: user,
  } = useGetUserQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <>
      {isLoading && <AdvertWidget />}
      {isSuccess && (
        <WidgetWrapper>
          {/* FIRST ROW */}
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage imageURL={picturePath} size={55} />
              <Box>
                <Typography
                  variant="h5"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {user.name}
                </Typography>
                <Typography color={medium}>
                  {user.friends?.length
                    ? `${user.friends.length} friends`
                    : `No friends`}
                </Typography>
              </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
          </FlexBetween>

          <Divider />

          {/* SECOND ROW */}
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user.location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user.occupation}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* THIRD ROW */}
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Who's viewed your profile</Typography>
              <Typography color={main} fontWeight="500">
                {user.viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Impressions of your post</Typography>
              <Typography color={main} fontWeight="500">
                {user.impressions}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          {/* FOURTH ROW */}
          <Box p="1rem 0">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
              Social Profiles
            </Typography>

            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="1rem">
                <img src="../assets/twitter.png" alt="twitter" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Twitter
                  </Typography>
                  <Typography color={medium}>Social Network</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>

            <FlexBetween gap="1rem">
              <FlexBetween gap="1rem">
                <img src="../assets/linkedin.png" alt="linkedin" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>
            <FlexBetween gap="1rem" sx={{ marginTop: "1rem" }}> 
                <Link to={`/${userId}/likedMovies`}> 
                    
                        
                            <Typography color={main} fontWeight="500" sx={{ cursor: "pointer" }}>
                                Liked Movies
                            </Typography>
                       
                </Link>
                    
            </FlexBetween>
          </Box>
          
        </WidgetWrapper>
      )}
    </>
  );
};

export default UserWidget;
