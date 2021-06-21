import axios from "axios";
import { createContext, useState, useEffect } from "react";

export interface userType {
  userId?: string;
  username?: string;
}

type userContextType = {
  user: userType;
  updateUser: (user: userType) => void;
  clearUser: () => void;
};

export const UserContext = createContext<userContextType>({
  user: {} as userType,
  updateUser: () => {},
  clearUser: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<userType | {}>({});

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      { withCredentials: true }
    );

    setUser(data.user);
  };

  const updateUser = (userData: userType) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
