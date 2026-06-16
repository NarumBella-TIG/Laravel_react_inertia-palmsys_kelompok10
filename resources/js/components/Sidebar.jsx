import { router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    Leaf,
    Users,
    LogOut,
    Crown,
    ChevronRight,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Multi Pocket", icon: Wallet, path: "/pocket" },
    { label: "Transaksi", icon: ArrowLeftRight, path: "/transaction" },
    { label: "Harga Komoditas", icon: Leaf, path: "/price" },
];

const adminMenuItems = [
    { label: "Manajemen User", icon: Users, path: "/admin" },
];

export default function Sidebar() {
    const { url, props } = usePage();
    const user = props.auth ? props.auth.user : null;
    const isAdmin = user ? user.role === "admin" : false;
    const allMenus = isAdmin ? [...menuItems, ...adminMenuItems] : menuItems;

    const handleLogout = () => router.post("/logout");

    return (
        <div
            style={{
                width: 240,
                minHeight: "100vh",
                background: "var(--sidebar-bg)",
                backdropFilter: "blur(24px)",
                borderRight: "1px solid var(--sidebar-border)",
                display: "flex",
                flexDirection: "column",
                padding: "24px 16px",
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 40,
            }}
        >
            {/* Logo + Theme Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, padding: "0 4px" }}>
                <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    <Leaf size={18} color="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, color: "var(--text-primary)", fontWeight: 700, fontSize: 14 }}>PalmSys</p>
                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 10 }}>Finance</p>
                </div>
                <ThemeToggle />
            </div>

            {/* Menu Label */}
            <p style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, padding: "0 8px" }}>
                MENU UTAMA
            </p>

            {/* Menu Items */}
            <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                {allMenus.map((item) => {
                    const isActive = url === item.path || url.startsWith(item.path + "/");
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.path}
                            onClick={() => router.get(item.path)}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: isActive ? "1px solid var(--accent-border)" : "1px solid transparent",
                                background: isActive ? "var(--sidebar-active)" : "transparent",
                                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                                fontSize: 13,
                                fontWeight: isActive ? 600 : 400,
                                cursor: "pointer",
                                textAlign: "left",
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "var(--glass-bg)";
                                    e.currentTarget.style.color = "var(--text-primary)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                }
                            }}
                        >
                            <div style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: isActive ? "var(--accent-light)" : "var(--glass-bg)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Icon size={15} color={isActive ? "var(--accent)" : "var(--text-muted)"} />
                            </div>
                            <span style={{ flex: 1 }}>{item.label}</span>
                            {isActive ? <ChevronRight size={13} color="var(--accent)" /> : null}
                        </button>
                    );
                })}

                {/* Admin Badge */}
                {isAdmin ? (
                    <div style={{
                        margin: "12px 4px 0",
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: "var(--accent-light)",
                        border: "1px solid var(--accent-border)",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                            <Crown size={11} color="var(--accent)" />
                            <p style={{ margin: 0, color: "var(--accent)", fontSize: 11, fontWeight: 600 }}>Mode Admin</p>
                        </div>
                        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 10 }}>
                            {user ? user.nama_lengkap : ""}
                        </p>
                    </div>
                ) : null}
            </nav>

            {/* Bottom */}
            <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 12, marginTop: 12 }}>
                {user ? (
                    <div style={{
                        padding: "8px 12px",
                        marginBottom: 6,
                        borderRadius: 12,
                        background: "var(--glass-bg)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}>
                        <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 700,
                            flexShrink: 0,
                        }}>
                            {user.nama_lengkap ? user.nama_lengkap.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {user.nama_lengkap}
                            </p>
                            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {user.email}
                            </p>
                        </div>
                    </div>
                ) : null}
                <button
                    onClick={handleLogout}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid transparent",
                        background: "transparent",
                        color: "var(--text-muted)",
                        fontSize: 13,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--danger-bg)";
                        e.currentTarget.style.color = "var(--danger)";
                        e.currentTarget.style.borderColor = "rgba(220,38,38,0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--text-muted)";
                        e.currentTarget.style.borderColor = "transparent";
                    }}
                >
                    <div style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: "var(--danger-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <LogOut size={14} color="var(--danger)" />
                    </div>
                    Logout
                </button>
            </div>
        </div>
    );
}