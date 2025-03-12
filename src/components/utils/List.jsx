import { Box, Typography, Paper, useTheme, Link } from '@mui/material';
import SoloItem from './Item';

const ItemList = ({ title, data, borderColor, showFollowButton, action, borderRadiusValue, borderDirection, addIcon }) => {
  const theme = useTheme();

  return (
    <Paper 
      sx={{ 
        [borderDirection] : `4px solid ${borderColor}`,
        borderRadius: borderRadiusValue, 
        padding: "20px",
      }}
    >
      {/* Titre */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingBottom: '10px',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography 
          sx={{
            fontFamily: theme.typography.fontFamily.Montserrat,
            fontWeight: 600,
            fontSize: '16px',
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        <Link href='#'>
          {action} {addIcon}
        </Link>
      </Box>

      {/* Liste des items */}
      <Box>
        {data.map((itm, index) => (
          <SoloItem key={index} {...itm} />
        ))}
      </Box>
    </Paper>
  );
};

export default ItemList;
