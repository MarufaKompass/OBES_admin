import { useNavigate } from 'react-router-dom';

export default function useNavigator() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return { handleNavigation };
}
