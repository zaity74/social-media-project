import { Box } from "@mui/material";
import {
  ProfileContainer,
  ProfileHeader,
  ProfilePicture,
  ProfileInfo,
  Username,
  Handle,
  StatsContainer,
  StatBox,
  StatValue,
  StatLabel,
} from "./ProfileCard.styles";

const ProfileCard = () => {
  return (
    <ProfileContainer>
      {/* Header avec l'avatar et les infos sur une même ligne */}
      <ProfileHeader>
        <ProfilePicture src="/path-to-profile-pic.jpg" />
        <ProfileInfo>
          <Username>User Name</Username>
          <Handle>@username</Handle>
        </ProfileInfo>
      </ProfileHeader>

      {/* Statistiques */}
      <StatsContainer>
        <StatBox>
          <StatValue>150</StatValue>
          <StatLabel>Posts</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>200</StatValue>
          <StatLabel>Followers</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>200</StatValue>
          <StatLabel>Following</StatLabel>
        </StatBox>
      </StatsContainer>
    </ProfileContainer>
  );
};

export default ProfileCard;
