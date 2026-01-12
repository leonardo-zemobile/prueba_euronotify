'use client';

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react"; // Importing Lucide-react icons

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme(); // Correctly use 'toggleTheme'

    return (
        <Button
            onClick={toggleTheme} // Use toggleTheme here
            className="px-4 py-2 transition-colors duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-offset-white focus:ring-primary"
            style={{
                backgroundColor: theme === "dark" ? "var(--primary)" : "var(--accent)",
                color: theme === "dark" ? "var(--foreground)" : "var(--background)",
            }}
        >
            {/* Conditional rendering of the Sun and Moon icons */}
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>
    );
};

export default ThemeToggle;
