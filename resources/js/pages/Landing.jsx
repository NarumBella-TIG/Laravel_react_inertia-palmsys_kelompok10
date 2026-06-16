import { router } from "@inertiajs/react";

export default function Landing() {
    const features = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
            ),
            title: "Multi Pocket",
            desc: "Pisahkan dana kebun, pribadi, dan talangan secara otomatis agar keuangan tetap teratur.",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/>
                    <circle cx="12" cy="13" r="3"/>
                </svg>
            ),
            title: "Digitalisasi Nota",
            desc: "Arsipkan bukti nota pembelian pupuk dan upah panen langsung dari kamera ponsel.",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    <polyline points="16 7 22 7 22 13"/>
                </svg>
            ),
            title: "Laporan Net Profit",
            desc: "Lihat ringkasan keuntungan bersih setelah dikurangi biaya operasional secara real-time.",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
            ),
            title: "Harga Terkini",
            desc: "Akses transparansi harga sawit dan pupuk terbaru tanpa bergantung pada pengawas lapangan.",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
            ),
            title: "Offline Sync",
            desc: "Input transaksi di lokasi kebun tanpa sinyal. Data otomatis tersinkron saat kembali online.",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
            ),
            title: "Dashboard Analitik",
            desc: "Pantau cash flow kebun dengan visualisasi data yang mudah dipahami setiap saat.",
        },
    ];

    const stats = [
        { value: "100%", label: "Berbasis Web" },
        { value: "Offline", label: "Tetap Bisa Input" },
        { value: "Real-time", label: "Sinkronisasi Data" },
        { value: "Aman", label: "Data Terenkripsi" },
    ];

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0f",
            color: "#fff",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            overflowX: "hidden",
        }}>
            {/* Animated Background */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(118,75,162,0.15), transparent 70%)",
                    top: "-10%",
                    right: "-10%",
                    animation: "float1 8s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(102,126,234,0.12), transparent 70%)",
                    bottom: "10%",
                    left: "-10%",
                    animation: "float2 10s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    animation: "float3 12s ease-in-out infinite",
                }} />
                {/* Grid lines */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }} />
            </div>

            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-30px, 20px) scale(1.05); }
                    66% { transform: translate(20px, -30px) scale(0.95); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -20px) scale(0.95); }
                    66% { transform: translate(-20px, 30px) scale(1.05); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.2); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-border {
                    0%, 100% { border-color: rgba(167,139,250,0.3); }
                    50% { border-color: rgba(167,139,250,0.6); }
                }
                .fade-up { animation: fadeUp 0.7s ease forwards; }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(118,75,162,0.4) !important; }
                .btn-secondary:hover { background: rgba(255,255,255,0.12) !important; }
                .feature-card:hover { transform: translateY(-4px); border-color: rgba(167,139,250,0.4) !important; background: rgba(255,255,255,0.07) !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(10,10,15,0.8)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a9 9 0 0 1 9 9c0 4.97-9 13-9 13S3 15.97 3 11a9 9 0 0 1 9-9z"/>
                            <circle cx="12" cy="11" r="3"/>
                        </svg>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>PalmSys Finance</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        onClick={() => router.get("/login")}
                        className="btn-secondary"
                        style={{
                            padding: "8px 18px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "transparent",
                            color: "rgba(255,255,255,0.7)",
                            fontSize: 13,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        Masuk
                    </button>
                    <button
                        onClick={() => router.get("/register")}
                        className="btn-primary"
                        style={{
                            padding: "8px 18px",
                            borderRadius: 10,
                            border: "none",
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        Mulai Gratis
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                position: "relative",
                zIndex: 1,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "120px 24px 80px",
            }}>
                {/* Badge */}
                <div className="fade-up" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 14px",
                    borderRadius: 20,
                    background: "rgba(167,139,250,0.1)",
                    border: "1px solid rgba(167,139,250,0.25)",
                    marginBottom: 28,
                    animation: "fadeUp 0.5s ease forwards, pulse-border 3s ease-in-out infinite",
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa" }} />
                    <span style={{ fontSize: 12, color: "#c4b5fd", fontWeight: 500 }}>
                        Platform Keuangan Kebun Sawit
                    </span>
                </div>

                {/* Heading */}
                <h1 className="fade-up" style={{
                    fontSize: "clamp(36px, 6vw, 64px)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    margin: "0 0 20px",
                    maxWidth: 760,
                    animationDelay: "0.1s",
                    opacity: 0,
                }}>
                    Kelola Keuangan Kebun{" "}
                    <span style={{
                        background: "linear-gradient(135deg, #a78bfa, #667eea)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        Lebih Cerdas
                    </span>
                </h1>

                {/* Subheading */}
                <p className="fade-up" style={{
                    fontSize: 17,
                    color: "rgba(255,255,255,0.5)",
                    maxWidth: 520,
                    lineHeight: 1.7,
                    margin: "0 0 40px",
                    animationDelay: "0.2s",
                    opacity: 0,
                }}>
                    Solusi digitalisasi tata kelola keuangan perkebunan sawit mandiri. 
                    Pisahkan dana, catat transaksi, dan pantau profit — kapan saja, di mana saja.
                </p>

                {/* CTA Buttons */}
                <div className="fade-up" style={{
                    display: "flex",
                    gap: 12,
                    animationDelay: "0.3s",
                    opacity: 0,
                }}>
                    <button
                        onClick={() => router.get("/register")}
                        className="btn-primary"
                        style={{
                            padding: "13px 28px",
                            borderRadius: 12,
                            border: "none",
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 4px 20px rgba(118,75,162,0.3)",
                        }}
                    >
                        Mulai Sekarang — Gratis
                    </button>
                    <button
                        onClick={() => router.get("/login")}
                        className="btn-secondary"
                        style={{
                            padding: "13px 28px",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.05)",
                            color: "rgba(255,255,255,0.8)",
                            fontSize: 15,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        Masuk ke Akun
                    </button>
                </div>

                {/* Stats */}
                <div className="fade-up" style={{
                    display: "flex",
                    gap: 40,
                    marginTop: 64,
                    animationDelay: "0.4s",
                    opacity: 0,
                }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff" }}>{s.value}</p>
                            <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                position: "relative",
                zIndex: 1,
                padding: "80px 24px",
                maxWidth: 1100,
                margin: "0 auto",
            }}>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p style={{ fontSize: 12, color: "#a78bfa", fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>
                        FITUR UNGGULAN
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, margin: 0 }}>
                        Semua yang kamu butuhkan
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
                        Dirancang khusus untuk kebutuhan pemilik kebun sawit mandiri
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 20,
                }}>
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="feature-card"
                            style={{
                                padding: 24,
                                borderRadius: 16,
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                transition: "all 0.3s ease",
                                cursor: "default",
                            }}
                        >
                            <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                background: "rgba(167,139,250,0.15)",
                                border: "1px solid rgba(167,139,250,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#a78bfa",
                                marginBottom: 16,
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>{f.title}</h3>
                            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section style={{
                position: "relative",
                zIndex: 1,
                padding: "80px 24px",
                maxWidth: 900,
                margin: "0 auto",
            }}>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p style={{ fontSize: 12, color: "#a78bfa", fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>
                        CARA KERJA
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, margin: 0 }}>
                        Mulai dalam 3 langkah
                    </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {[
                        { step: "01", title: "Daftar Akun", desc: "Buat akun gratis dalam hitungan detik. Tidak perlu kartu kredit." },
                        { step: "02", title: "Buat Pocket", desc: "Pisahkan dana kebun, pribadi, dan talangan sesuai kebutuhan." },
                        { step: "03", title: "Catat & Pantau", desc: "Input transaksi, upload nota, dan pantau net profit secara real-time." },
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 24,
                            padding: 24,
                            borderRadius: 16,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}>
                            <div style={{
                                width: 56,
                                height: 56,
                                borderRadius: 14,
                                background: "linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))",
                                border: "1px solid rgba(167,139,250,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18,
                                fontWeight: 800,
                                color: "#a78bfa",
                                flexShrink: 0,
                            }}>
                                {item.step}
                            </div>
                            <div>
                                <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600 }}>{item.title}</h3>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                position: "relative",
                zIndex: 1,
                padding: "80px 24px 120px",
                textAlign: "center",
            }}>
                <div style={{
                    maxWidth: 600,
                    margin: "0 auto",
                    padding: "60px 40px",
                    borderRadius: 24,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(circle at 50% 0%, rgba(118,75,162,0.15), transparent 70%)",
                        pointerEvents: "none",
                    }} />
                    <p style={{ fontSize: 12, color: "#a78bfa", fontWeight: 600, letterSpacing: 2, marginBottom: 16 }}>
                        MULAI SEKARANG
                    </p>
                    <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, margin: "0 0 14px" }}>
                        Siap digitalisasi kebun sawitmu?
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, margin: "0 0 32px", lineHeight: 1.7 }}>
                        Bergabung sekarang dan mulai catat keuangan kebun dengan lebih rapi dan terstruktur.
                    </p>
                    <button
                        onClick={() => router.get("/register")}
                        className="btn-primary"
                        style={{
                            padding: "13px 32px",
                            borderRadius: 12,
                            border: "none",
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 4px 20px rgba(118,75,162,0.3)",
                        }}
                    >
                        Daftar Gratis Sekarang
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                position: "relative",
                zIndex: 1,
                padding: "24px",
                textAlign: "center",
                borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
                    © 2026 PalmSys Finance · Dibuat dengan ❤️ untuk pekebun sawit Indonesia
                </p>
            </footer>
        </div>
    );
}