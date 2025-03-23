import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../context/UserContext";
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
import { getPostCountByUser } from "../../redux/action/postActions";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useUser();

  // Récupérer le nombre de posts depuis Redux
  const { postCount, loading } = useSelector((state) => state.countUserPost);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getPostCountByUser(currentUser._id));
    }
  }, [dispatch, currentUser]);


  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfilePicture src={currentUser?.avatar || "/default-avatar.png"} />
        <ProfileInfo>
          <Username>{currentUser?.username || "Utilisateur"}</Username>
          <Handle>@{currentUser?.username?.toLowerCase() || "username"}</Handle>
        </ProfileInfo>
      </ProfileHeader>

      <StatsContainer>
        <StatBox>
          <StatValue>{loading ? "..." : postCount}</StatValue>
          <StatLabel>Posts</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>{Array.isArray(currentUser?.followers) ? currentUser.followers.length : 0}</StatValue>
          <StatLabel>Followers</StatLabel>
        </StatBox>

        <StatBox>
          <StatValue>{Array.isArray(currentUser?.following) ? currentUser.following.length : 0}</StatValue>
          <StatLabel>Following</StatLabel>
        </StatBox>
      </StatsContainer>
    </ProfileContainer>
  );
};

export default ProfileCard;
