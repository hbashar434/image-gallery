import { useEffect, useRef, useState } from "react";
import { Switch } from "@headlessui/react";

export default function ThemeToggler() {
  const themeToggleLightIcon = useRef();
  const themeToggleDarkIcon = useRef();

  const [enabled, setEnabled] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
      if (themeToggleLightIcon.current) {
        themeToggleLightIcon.current.classList.remove("hidden");
      }
      if (themeToggleDarkIcon.current) {
        themeToggleDarkIcon.current.classList.add("hidden");
      }
    } else {
      document.documentElement.classList.remove("dark");
      if (themeToggleLightIcon.current) {
        themeToggleLightIcon.current.classList.add("hidden");
      }
      if (themeToggleDarkIcon.current) {
        themeToggleDarkIcon.current.classList.remove("hidden");
      }
    }
  }, [enabled]);

  const handleThemeToggle = () => {
    setEnabled(!enabled);

    if (enabled) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  };

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={handleThemeToggle}
        className={`${enabled ? "bg-gray-700" : "bg-gray-200"}
          relative inline-flex h-4 w-9 md:h-[38px] md:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Toggle theme</span>
        <span
          aria-hidden="true"
          className={`${enabled ? " translate-x-5 md:translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-3 w-3 md:h-[34px] md:w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
