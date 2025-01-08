import useLocalStorage from "../hooks/useLocalStorage";
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({children}) {
  const [jwt, setJwt] = useLocalStorage("jwt");
  const [userId, setUserId] = useLocalStorage("user_id");
  const [username, setUsername] = useLocalStorage("username");

  return (
    <AuthContext.Provider
      value={{
        jwt,
        setJwt,
        userId,
        setUserId,
        username,
        setUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
