import { useState } from 'react'
import { useDarkMode } from '../../context/DarkModeContext'
import ProfileEditPopup from '../popups/ProfileEditPopup'

import { HeaderContainer, 
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
Tab } from './ProfilePage.styles'

const ProfilePageHeader = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  return (
    <>
      <HeaderContainer >
        <BannerContainer>
          <ProfilePictureWrapper>
            <ProfilePicture />
          </ProfilePictureWrapper>
          
          <EditProfileButton
            onClick={handleEditProfile}
            variant="contained"
          >
            Modifier le profil
          </EditProfileButton>
        </BannerContainer>

        <ContentContainer>
          <UserInfoContainer>
            <NameContainer>
              <Username>User Name</Username>
              <Handle>@username</Handle>
            </NameContainer>
            <Bio>
              Bio texte ici...
            </Bio>
          </UserInfoContainer>

          <TabsContainer>
            <Tab 
              active={activeTab === 'posts'} 
              onClick={() => setActiveTab('posts')}
            >
              Mes posts
            </Tab>
            <Tab 
              active={activeTab === 'saved'} 
              onClick={() => setActiveTab('saved')}
            >
              Enregistrements
            </Tab>
            <Tab 
              active={activeTab === 'likes'} 
              onClick={() => setActiveTab('likes')}
            >
              Likes
            </Tab>
          </TabsContainer>
        </ContentContainer>
      </HeaderContainer>

      <ProfileEditPopup
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        initialData={{
          name: 'User Name',
          username: 'username',
          bio: 'Bio texte ici...',
          avatarUrl: '',
          bannerUrl: ''
        }}
      />
    </>
  )
}

export default ProfilePageHeader