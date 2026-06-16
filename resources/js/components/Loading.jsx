export default function Loading({ message = "Memuat..." }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
                background: "rgba(102,126,234,0.3)",
                backdropFilter: "blur(4px)",
                pointerEvents: "none",
            }}
        >
            <div
                className="flex flex-col items-center gap-4 p-8 rounded-2xl"
                style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(20px)",
                }}
            >
                {/* Spinner */}
                <div className="relative w-12 h-12">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ border: "3px solid rgba(255,255,255,0.15)" }}
                    />
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: "3px solid transparent",
                            borderTopColor: "#fff",
                            animation: "spin 0.8s linear infinite",
                        }}
                    />
                </div>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-base m-0">PalmSys</p>
                    <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                            background: "rgba(167,139,250,0.3)",
                            color: "#c4b5fd",
                        }}
                    >
                        Finance
                    </span>
                </div>

                {/* Message */}
                <p className="text-sm m-0" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {message}
                </p>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}