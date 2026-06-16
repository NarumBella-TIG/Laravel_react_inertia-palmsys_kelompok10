import { useTheme } from "../lib/ThemeContext";

export default function ThemeToggle({ className = "" }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={className}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: "1px solid var(--glass-border)",
                background: "var(--glass-bg)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                backdropFilter: "blur(12px)",
                transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--glass-bg-hover)";
                e.currentTarget.style.borderColor = "var(--glass-border-hover)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--glass-bg)";
                e.currentTarget.style.borderColor = "var(--glass-border)";
            }}
        >
            {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            )}
        </button>
    );
}