import useLocalStorage from "../hooks/useLocalStorage";
import { AuthenticationContext } from "./AuthenticationContext";

export default function AuthenticationContextProvider({children}) {
  const [jwt, setJwt] = useLocalStorage("jwt");
  const [userId, setUserId] = useLocalStorage("user_id");
  const [username, setUsername] = useLocalStorage("username");

  return (
    <AuthenticationContext.Provider
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
    </AuthenticationContext.Provider>
  );
}
