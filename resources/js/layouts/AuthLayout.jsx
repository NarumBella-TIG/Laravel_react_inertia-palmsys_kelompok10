export default function AuthLayout({ children }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            }}
        >
            {/* Background blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30"
                    style={{ background: "radial-gradient(circle, #f093fb, transparent)" }}
                />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-30"
                    style={{ background: "radial-gradient(circle, #667eea, transparent)" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
                />
            </div>

            {/* Card */}
            <div
                className="relative w-full max-w-md rounded-3xl p-10"
                style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow: "0 32px 64px rgba(0,0,0,0.2)",
                }}
            >
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a9 9 0 0 1 9 9c0 4.97-9 13-9 13S3 15.97 3 11a9 9 0 0 1 9-9z"/>
                            <circle cx="12" cy="11" r="3"/>
                        </svg>
                    </div>
                    <h1 className="text-white font-bold text-2xl m-0">PalmSys Finance</h1>
                    <p className="text-sm mt-1 m-0" style={{ color: "rgba(255,255,255,0.6)" }}>
                        Digitalisasi Keuangan Perkebunan Sawit
                    </p>
                </div>

                {children}
            </div>
        </div>
    );
}