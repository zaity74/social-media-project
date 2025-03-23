import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Récupérer du parametre ID de l'URL
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../../context/UserContext"; 
import { getUsers } from "../../redux/action/userActions"; 
import ProfileEditPopup from "../popups/ProfileEditPopup";

import { 
  HeaderContainer, 
  BannerContainer, 
  ProfilePictureWrapper, 
  ProfilePicture,
  EditProfileButton, 
  ContentContainer, 
  UserInfoContainer, 
  NameContainer, 
  Username,
  Handle, 
  Bio, 
  TabsContainer,
  Tab 
} from "./ProfilePage.styles";

const ProfilePageHeader = () => {
  const { isDarkMode } = useDarkMode();
  const { id } = useParams(); // Récupération de l'ID de l'utilisateur depuis l'URL
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.getUsers); // Récupération de tous les utilisateurs
  const { user: currentUser, isLogin } = useUser(); // Récupération de l'utilisateur connecté

  const [activeTab, setActiveTab] = useState("posts");
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    dispatch(getUsers()); // Charge tous les utilisateurs au montage
  }, [dispatch]);

  // Récupérer l'utilisateur correspondant à l'ID de l'URL ou fallback sur l'utilisateur connecté
  const profileUser = users.find((u) => u._id === id) || currentUser;

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  if (loading) return <p>🔄 Chargement des informations...</p>;

  return (
    <>
      <HeaderContainer>
        <BannerContainer>
          <ProfilePictureWrapper>
            <ProfilePicture src={profileUser?.avatar || "/default-avatar.png"} alt="Avatar" />
          </ProfilePictureWrapper>

          {/* Affichage du bouton "Modifier le profil" uniquement si on est sur son propre profil */}
          {isLogin && currentUser?._id === id && (
            <EditProfileButton onClick={handleEditProfile} variant="contained">
              Modifier le profil
            </EditProfileButton>
          )}
        </BannerContainer>

        <ContentContainer>
          <UserInfoContainer>
            <NameContainer>
              <Username>{profileUser?.username || "Utilisateur"}</Username>
              <Handle>@{profileUser?.username?.toLowerCase() || "username"}</Handle>
            </NameContainer>
            <Bio>{profileUser?.bio || "Aucune bio pour le moment..."}</Bio>
          </UserInfoContainer>

          <TabsContainer>
            <Tab active={activeTab === "posts"} onClick={() => setActiveTab("posts")}>
              Ses posts
            </Tab>
            <Tab active={activeTab === "saved"} onClick={() => setActiveTab("saved")}>
              Enregistrements
            </Tab>
            <Tab active={activeTab === "likes"} onClick={() => setActiveTab("likes")}>
              Likes
            </Tab>
          </TabsContainer>
        </ContentContainer>
      </HeaderContainer>

      {/* ✅ Fenêtre modale d'édition du profil */}
      <ProfileEditPopup
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        initialData={{
          name: profileUser?.username || "Utilisateur",
          username: profileUser?.username || "username",
          bio: profileUser?.bio || "",
          avatarUrl: profileUser?.avatar || "/default-avatar.png",
          bannerUrl: profileUser?.bannerUrl || "/default-banner.jpg"
        }}
      />
    </>
  );
};

export default ProfilePageHeader;
