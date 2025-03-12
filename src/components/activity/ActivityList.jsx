import { useTheme } from '@mui/material';
import ItemList from '../utils/List';

const ActivityList = () => {
  const theme = useTheme();

  const activities = [
    {
      username: 'UserX',
      description: 'a commencé à te suivre il y a 5 min', 
      avatar: '/path/to/avatar1.jpg', 
      showFollowButton: true
    },
    {
      username: 'UserX',
      description: 'a aimé ton post il y a 5 min',
      avatar: '/path/to/avatar2.jpg', 
      showFollowButton: false
    }
  ];

  return <ItemList title="Activités" data={activities} 
  borderColor={theme.palette.secondary.main} 
  action={'Voir plus'}
  borderRadiusValue="24px 0px 0px 24px"
  borderDirection="borderLeft" />;
};

export default ActivityList;
