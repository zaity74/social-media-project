import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/action/authAction";
import { getUsers } from "../redux/action/userActions";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLogin, loading } = useSelector((state) => state.userLogin);  // Assurez-vous que `isLogin` vient du store
  const { users } = useSelector((state) => state.getUsers);

  const [userData, setUserData] = useState(user || null);

  // Charger les utilisateurs au montage
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Mettre à jour userData quand les utilisateurs sont chargés
  useEffect(() => {
    if (user && users.length > 0) {
      const completeUserData = users.find(u => u._id === user._id);
      if (completeUserData) {
        setUserData(completeUserData);
      }
    }
  }, [user, users]);

  const loginUser = (email, password) => {
    dispatch(userLogin(email, password));
  };

  const logoutUser = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("loginInfo");
    dispatch({ type: "LOGOUT" });
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ user: userData, isLogin, loading, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext) || { user: null, isLogin: false, loading: false, loginUser: () => {}, logoutUser: () => {} };
};
