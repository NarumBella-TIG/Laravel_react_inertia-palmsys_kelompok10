import { usePage } from "@inertiajs/react";
import { Bell } from "lucide-react";

const pageTitles = {
    "/dashboard": "Dashboard",
    "/pocket": "Multi Pocket",
    "/transaction": "Transaksi",
    "/price": "Harga Komoditas",
    "/admin": "Manajemen User",
};

export default function Header() {
    const { url, props } = usePage();
    const title = pageTitles[url] || "PalmSys Finance";
    const user = props.auth ? props.auth.user : null;

    return (
        <div style={{
            height: 60,
            background: "var(--sidebar-bg)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--sidebar-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 30,
        }}>
            <div>
                <h1 style={{ color: "var(--text-primary)", fontSize: 18, fontWeight: 700, margin: 0 }}>
                    {title}
                </h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1px solid var(--glass-border)",
                    background: "var(--glass-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}>
                    <Bell size={15} color="var(--text-muted)" />
                </button>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    borderRadius: 10,
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                }}>
                    <div style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                    }}>
                        {user && user.nama_lengkap ? user.nama_lengkap.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>
                        {user ? user.nama_lengkap : "User"}
                    </span>
                </div>
            </div>
        </div>
    );
}