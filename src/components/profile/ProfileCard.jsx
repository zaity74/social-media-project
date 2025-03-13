import { useSelector } from "react-redux"; // ✅ Import Redux
import { useUser } from "../../context/UserContext"; // ✅ Import UserContext
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
  const { user: currentUser } = useUser(); // ✅ Récupère l'utilisateur connecté
  const { users } = useSelector((state) => state.getUsers); // ✅ Récupère les utilisateurs depuis Redux

  // ✅ Récupérer l'utilisateur connecté dans la liste `getUsers`
  const fullUserData = users.find((user) => user._id === currentUser?.id) || currentUser;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfilePicture src={fullUserData?.avatar || "/default-avatar.png"} />
        <ProfileInfo>
          <Username>{fullUserData?.username || "Utilisateur"}</Username>
          <Handle>@{fullUserData?.username?.toLowerCase() || "username"}</Handle>
        </ProfileInfo>
      </ProfileHeader>

      <StatsContainer>
        <StatBox>
          <StatValue>{fullUserData?.postCount || 0}</StatValue>
          <StatLabel>Posts</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>{Array.isArray(fullUserData?.followers) ? fullUserData.followers.length : 0}</StatValue>
          <StatLabel>Followers</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>{Array.isArray(fullUserData?.following) ? fullUserData.following.length : 0}</StatValue>
          <StatLabel>Following</StatLabel>
        </StatBox>
      </StatsContainer>
    </ProfileContainer>
  );
};

export default ProfileCard;
