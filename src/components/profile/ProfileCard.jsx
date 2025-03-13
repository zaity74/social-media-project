import { useUser } from "../../context/UserContext"; // ✅ Import du contexte utilisateur
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
  const { user } = useUser(); // ✅ Récupération des infos utilisateur

  return (
    <ProfileContainer>
      {/* Header avec l'avatar et les infos sur une même ligne */}
      <ProfileHeader>
        <ProfilePicture src={user?.avatarUrl || "/default-avatar.png"} />
        <ProfileInfo>
          <Username>{user?.username || "Utilisateur"}</Username>
          <Handle>@{user?.username?.toLowerCase() || "username"}</Handle>
        </ProfileInfo>
      </ProfileHeader>

      {/* Statistiques */}
      <StatsContainer>
        <StatBox>
          <StatValue>{user?.postCount || 0}</StatValue>
          <StatLabel>Posts</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>{user?.followers || 0}</StatValue>
          <StatLabel>Followers</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>{user?.following || 0}</StatValue>
          <StatLabel>Following</StatLabel>
        </StatBox>
      </StatsContainer>
    </ProfileContainer>
  );
};

export default ProfileCard;
