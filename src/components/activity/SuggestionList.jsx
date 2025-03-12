import ItemList from '../utils/List';
import { useTheme } from '@mui/material';

const SuggestionList = () => {
  const theme = useTheme();

  const suggestions = [
    {
      username: 'UserY',
      avatar: '/path/to/avatar1.jpg',
      showFollowButton: true
    },
    {
      username: 'UserX',
      avatar: '/path/to/avatar2.jpg',
      showFollowButton: true
    }
  ];

  return <ItemList title="Suggestions" data={suggestions} 
  borderColor={theme.palette.secondary.main} 
  action={'Voir plus'} 
  borderRadiusValue="24px 0px 0px 24px"
  borderDirection="borderLeft" />;
};

export default SuggestionList;
