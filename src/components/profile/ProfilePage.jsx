import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../../context/UserContext"; // ✅ Import de `useUser`
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
  const { user, isLogin } = useUser(); // ✅ Récupération des infos utilisateur

  const [activeTab, setActiveTab] = useState("posts");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  return (
    <>
      <HeaderContainer>
        <BannerContainer>
          <ProfilePictureWrapper>
            <ProfilePicture src={user?.avatar || "/default-avatar.png"} alt="Avatar" />
          </ProfilePictureWrapper>

          {isLogin && (
            <EditProfileButton onClick={handleEditProfile} variant="contained">
              Modifier le profil
            </EditProfileButton>
          )}
        </BannerContainer>

        <ContentContainer>
          <UserInfoContainer>
            <NameContainer>
              <Username>{user?.username || "Utilisateur"}</Username> {/* ✅ Affichage sécurisé */}
              <Handle>@{user?.username?.toLowerCase() || "username"}</Handle>
            </NameContainer>
            <Bio>{user?.bio || "Aucune bio pour le moment..."}</Bio>
          </UserInfoContainer>

          <TabsContainer>
            <Tab active={activeTab === "posts"} onClick={() => setActiveTab("posts")}>
              Mes posts
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
          name: user?.username || "Utilisateur",
          username: user?.username || "username",
          bio: user?.bio || "",
          avatarUrl: user?.avatarUrl || "/default-avatar.png",
          bannerUrl: user?.bannerUrl || "/default-banner.jpg"
        }}
      />
    </>
  );
};

export default ProfilePageHeader;
