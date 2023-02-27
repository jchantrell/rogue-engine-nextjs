import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import themeLoader from "../utils/theme";

const SignInPage = () => {
  const { data: session, status } = useSession();
  const theme = themeLoader();

  useEffect(() => {
    if (!(status === "loading") && !session) void signIn("discord");
    if (session) window.close();
  }, [session, status]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: theme?.bgColor,
      }}
    ></div>
  );
};

export default SignInPage;
