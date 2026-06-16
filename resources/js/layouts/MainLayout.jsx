import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function MainLayout({ children }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const removeStart = router.on("start", () => setLoading(true));
        const removeFinish = router.on("finish", () => setLoading(false));
        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--bg-gradient)",
            display: "flex",
            position: "relative",
        }}>
            {/* Background blobs */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, var(--blob1), transparent 70%)",
                    top: "-15%",
                    right: "-10%",
                    animation: "float1 8s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, var(--blob2), transparent 70%)",
                    bottom: "5%",
                    left: "-10%",
                    animation: "float2 10s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }} />
            </div>

            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-20px, 15px) scale(1.05); }
                    66% { transform: translate(15px, -20px) scale(0.95); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(20px, -15px) scale(0.95); }
                    66% { transform: translate(-15px, 20px) scale(1.05); }
                }
            `}</style>

            {loading ? <Loading message="Memuat halaman..." /> : null}

            <Sidebar />

            <div style={{
                marginLeft: 240,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                position: "relative",
                zIndex: 1,
            }}>
                <Header />
                <main style={{
                    flex: 1,
                    padding: 24,
                    overflowY: "auto",
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
}