import ReactLoading from "react-loading";
import themeLoader from "../utils/theme";
import { useEffect, useState } from "react";

function LoadScreen() {
  const [bgColor, setBgColor] = useState<string>("");
  const [spinColor, setSpinColor] = useState<string>("");
  useEffect(() => {
    const theme = themeLoader();
    setBgColor(theme ? theme.bgColor : "");
    setSpinColor(theme ? theme.spinColor : "");
  }, []);
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      <ReactLoading type="cylon" color={spinColor} height={100} width={100} />
    </div>
  );
}

export default LoadScreen;
