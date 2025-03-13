import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

const AddTagPopup = ({ open, onClose, value, onChange, onAdd }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter un tag</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nom du tag"
          type="text"
          fullWidth
          variant="outlined"
          value={value}
          onChange={onChange}
          sx={{ 
            mt: 2,
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#B2FD27'
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#B2FD27'
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            color: '#B2FD27',
            '&:hover': {
              backgroundColor: 'rgba(178, 253, 39, 0.08)'
            }
          }}
        >
          Annuler
        </Button>
        <Button 
          onClick={onAdd} 
          variant="contained" 
          sx={{
            backgroundColor: '#B2FD27',
            '&:hover': {
              backgroundColor: '#9ee021'
            }
          }}
          disabled={!value.trim()}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTagPopup