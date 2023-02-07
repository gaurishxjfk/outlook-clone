import { useEffect } from "react";

export default function useComponentVisible(
  folderItemRef,
  setIsComponentVisible
) {
  const handleClickOutside = () => {
    if (folderItemRef.current) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleClickOutside, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  }, []);

  return true;
}
