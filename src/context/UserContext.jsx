import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/action/authAction";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLogin, loading } = useSelector((state) => state.userLogin);

  const [userData, setUserData] = useState(user || null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  // ✅ Fonction pour mettre à jour l'utilisateur après un follow/unfollow
  const updateUserData = (updatedUser) => {
    console.log("🔄 Mise à jour du contexte utilisateur :", updatedUser);
    setUserData(updatedUser);
    localStorage.setItem("loginInfo", JSON.stringify(updatedUser)); // ✅ Met à jour `localStorage`
  };

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
    <UserContext.Provider value={{ user: userData, isLogin, loading, loginUser, logoutUser, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext) || { user: null, isLogin: false, loading: false, loginUser: () => {}, logoutUser: () => {} };
};
