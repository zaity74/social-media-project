import { StyledMenu, StyledMenuItem } from '../navigation/TopNav.styles'

const ProfileMenuPopup = ({ anchorEl, open, onClose, onModifyProfile, onLogout }) => {
  return (
    <StyledMenu
      id="profile-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'profile-button',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <StyledMenuItem onClick={onModifyProfile}>Modifier profil</StyledMenuItem>
      <StyledMenuItem onClick={onLogout}>Déconnexion</StyledMenuItem>
    </StyledMenu>
  )
}

export default ProfileMenuPopup