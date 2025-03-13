import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Avatar, IconButton, InputAdornment } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { styled } from '@mui/material/styles'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    maxWidth: '400px',
    width: '90%'
  }
}))

const BannerContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '120px',
  backgroundColor: '#f5f5f5',
  marginBottom: '20px',
  borderRadius: '8px',
  overflow: 'hidden'
})

const BannerImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})

const BannerUploadButton = styled(IconButton)({
  position: 'absolute',
  bottom: 8,
  right: 8,
  backgroundColor: '#B2FD27',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#a1e923'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    color: '#000000'
  }
})

const AvatarContainer = styled(Box)({
  position: 'relative',
  width: 'fit-content',
  margin: '0 auto 20px'
})

const StyledAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  border: '4px solid #B2FD27'
})

const UploadButton = styled(IconButton)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#B2FD27',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#a1e923'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    color: '#000000'
  }
})

const ProfileEditPopup = ({ open, onClose, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    username: initialData.username || '',
    bio: initialData.bio || '',
    avatarUrl: initialData.avatarUrl || '',
    bannerUrl: initialData.bannerUrl || ''
  })
  const [previewUrl, setPreviewUrl] = useState(initialData.avatarUrl || '')
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState(initialData.bannerUrl || '')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setFormData(prev => ({
        ...prev,
        avatarUrl: file
      }))
    }
  }

  const handleBannerUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBannerPreviewUrl(url)
      setFormData(prev => ({
        ...prev,
        bannerUrl: file
      }))
    }
  }

  const handleSubmit = () => {
    console.log('Form data to submit:', formData)
    onClose()
  }

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle sx={{ 
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '20px',
        textAlign: 'center'
      }}>
        Modifier le profil
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <BannerContainer>
            {bannerPreviewUrl && <BannerImage src={bannerPreviewUrl} alt="Banner" />}
            <BannerUploadButton component="label">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleBannerUpload}
              />
              <AddAPhotoIcon />
            </BannerUploadButton>
          </BannerContainer>

          <AvatarContainer>
            <StyledAvatar src={previewUrl} />
            <UploadButton component="label">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
              <AddAPhotoIcon />
            </UploadButton>
          </AvatarContainer>

          <TextField
            margin="normal"
            fullWidth
            label="Nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={4}
            placeholder="Parlez-nous de vous..."
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button 
          onClick={onClose}
          sx={{
            color: '#000000',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#B2FD27',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#a1e923'
            }
          }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default ProfileEditPopup