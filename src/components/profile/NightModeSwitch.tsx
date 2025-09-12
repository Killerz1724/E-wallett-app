"use client";
import { Switch } from "components/ui/SwitchInput";
import React from "react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
export default function NightModeSwitch() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <span>
        {theme === "dark" ? (
          <Moon className="text-gray-100" />
        ) : (
          <Sun className="text-orange-400" />
        )}
      </span>
    </div>
  );
}
