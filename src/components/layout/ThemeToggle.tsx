import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeProviderContext } from "@/context/theme.context";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeProviderContext);
  const [prefersDark, setPrefersDark] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setPrefersDark(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const isDark = useMemo(() => {
    if (theme === "system") return prefersDark;
    return theme === "dark";
  }, [theme, prefersDark]);

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} aria-label="Toggle theme">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}


