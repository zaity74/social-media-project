import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/action/authAction";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  
  // Récupération des infos utilisateur depuis Reducer Login
  const { user, isLogin, loading } = useSelector((state) => state.userLogin);
  
  // Évite une erreur en assurant une valeur par défaut
  const [userData, setUserData] = useState(user || null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  // Fonction pour connecter un utilisateur via Redux
  const loginUser = (email, password) => {
    dispatch(userLogin(email, password));
  };

  // Fonction pour déconnecter un utilisateur
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

// Hook pour consommer le contexte
export const useUser = () => {
  return useContext(UserContext) || { user: null, isLogin: false, loading: false, loginUser: () => {}, logoutUser: () => {} };
};
