import axios from "axios";
import { createContext, useState, useEffect } from "react";

type userContextType = {
  userId: string | null;
  updateUserId: (newUserId: string) => void;
  clearUserId: () => void;
};

export const UserContext = createContext<userContextType>({
  userId: null,
  updateUserId: () => {},
  clearUserId: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      { withCredentials: true }
    );
    setUserId(data.id);
  };

  const updateUserId = (id: string) => {
    setUserId(id);
  };

  const clearUserId = () => {
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, updateUserId, clearUserId }}>
      {children}
    </UserContext.Provider>
  );
};
