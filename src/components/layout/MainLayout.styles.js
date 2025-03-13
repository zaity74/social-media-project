import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MainContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 0px',
  position: 'relative',
});

export const GridLayout = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  display: 'grid',
  gridTemplateColumns: '1fr', // Valeur par défaut pour xs
  gap: theme.spacing(3),
  paddingTop: theme.spacing(9),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  position: 'relative',
  zIndex: 1,

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '240px 1fr',
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '240px 1fr 320px',
  },
}));

export const LeftSidebar = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '35px',
    padding: '0px 0px',

    /* Sticky pour maintenir la colonne en haut lors du scroll */
    position: 'sticky',
    top: '20px',
    alignSelf: 'start', // Assure que le bloc reste dans sa colonne
  },
}));

export const MainContent = styled(Box)({
  backgroundColor: 'transparent',
  width: '100%',
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  maxHeight: '110vh',
  // Hide scrollbar
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
});

export const RightSidebar = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '35px',
    padding: '0px 0px',
    position: 'relative',
    alignSelf: 'start',
  },

  '.footer-text': {
    padding: '0px 20px 0px 20px',
    fontSize: '12px',
    color: theme.palette.text.secondary,
  },
}));
