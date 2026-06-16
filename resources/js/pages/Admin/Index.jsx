import { router } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { Users, TrendingUp, TrendingDown, BarChart3, Trash2 } from "lucide-react";

export default function AdminIndex({
    totalUsers, totalTransaksi, totalPemasukan, totalPengeluaran,
    netProfit, users, recentTransactions, bulan,
}) {
    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka ? angka : 0);

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "";
        return new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };

    const handleDeleteUser = (id, nama) => {
        if (confirm("Hapus user " + nama + "? Semua data user akan ikut terhapus!")) {
            router.delete("/admin/user/" + id);
        }
    };

    const safeUsers = Array.isArray(users) ? users : [];
    const safeTransactions = Array.isArray(recentTransactions) ? recentTransactions : [];

    const card = {
        background: "var(--card-bg)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 20,
        border: "1px solid var(--card-border)",
        boxShadow: "var(--glass-shadow)",
    };

    const statCards = [
        { label: "Total Pemilik Kebun", value: totalUsers ? totalUsers : 0, sub: "User terdaftar", icon: Users, color: "var(--accent)", bg: "var(--accent-light)" },
        { label: "Total Transaksi", value: totalTransaksi ? totalTransaksi : 0, sub: "Semua waktu", icon: BarChart3, color: "var(--text-secondary)", bg: "var(--glass-bg)" },
        { label: "Total Pemasukan", value: formatRupiah(totalPemasukan), sub: "Bulan " + bulan, icon: TrendingUp, color: "var(--success)", bg: "var(--success-bg)" },
        { label: "Net Profit Platform", value: formatRupiah(netProfit), sub: "Bulan " + bulan, icon: BarChart3, color: netProfit >= 0 ? "var(--success)" : "var(--danger)", bg: netProfit >= 0 ? "var(--success-bg)" : "var(--danger-bg)" },
    ];

    const thStyle = {
        padding: "10px 14px",
        textAlign: "left",
        color: "var(--text-muted)",
        fontSize: 11,
        fontWeight: 600,
        borderBottom: "1px solid var(--card-border)",
        whiteSpace: "nowrap",
        letterSpacing: 0.5,
    };

    const tdStyle = {
        padding: "12px 14px",
        color: "var(--text-primary)",
        fontSize: 13,
        borderBottom: "1px solid var(--card-border)",
    };

    return (
        <MainLayout>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 20px" }}>
                Statistik keseluruhan platform bulan {bulan}
            </p>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
                {statCards.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} style={{ ...card }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</p>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon size={15} color={s.color} />
                                </div>
                            </div>
                            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 20, color: s.color }}>{s.value}</p>
                            <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>{s.sub}</p>
                        </div>
                    );
                })}
            </div>

            {/* User Table */}
            <div style={{ ...card, marginBottom: 14 }}>
                <h3 style={{ color: "var(--text-primary)", margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>
                    Daftar Pemilik Kebun
                </h3>
                {safeUsers.length === 0 ? (
                    <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Belum ada user terdaftar.</p>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    {["Nama", "Email", "No HP", "Pocket", "Transaksi", "Pemasukan", "Pengeluaran", "Net Profit", "Aksi"].map((h) => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {safeUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td style={tdStyle}>
                                            <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{u.nama_lengkap ? u.nama_lengkap : ""}</p>
                                            <p style={{ margin: "2px 0 0", color: "var(--text-muted)", fontSize: 11 }}>
                                                Bergabung {formatTanggal(u.created_at)}
                                            </p>
                                        </td>
                                        <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>{u.email ? u.email : ""}</td>
                                        <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>{u.no_hp ? u.no_hp : "-"}</td>
                                        <td style={tdStyle}>
                                            <span style={{ padding: "3px 10px", borderRadius: 20, background: "var(--accent-light)", color: "var(--accent)", fontSize: 11, fontWeight: 600 }}>
                                                {u.total_pocket ? u.total_pocket : 0} pocket
                                            </span>
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: "center" }}>{u.total_transaksi ? u.total_transaksi : 0}</td>
                                        <td style={{ ...tdStyle, color: "var(--success)", fontWeight: 600 }}>{formatRupiah(u.pemasukan)}</td>
                                        <td style={{ ...tdStyle, color: "var(--danger)", fontWeight: 600 }}>{formatRupiah(u.pengeluaran)}</td>
                                        <td style={{ ...tdStyle, color: u.net_profit >= 0 ? "var(--success)" : "var(--danger)", fontWeight: 600 }}>{formatRupiah(u.net_profit)}</td>
                                        <td style={tdStyle}>
                                            <button
                                                onClick={() => handleDeleteUser(u.id, u.nama_lengkap)}
                                                style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--danger-bg)", background: "var(--danger-bg)", color: "var(--danger)", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                                            >
                                                <Trash2 size={11} /> Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Recent Transactions */}
            <div style={{ ...card }}>
                <h3 style={{ color: "var(--text-primary)", margin: "0 0 14px", fontSize: 14, fontWeight: 600 }}>
                    Transaksi Terbaru (Semua User)
                </h3>
                {safeTransactions.length === 0 ? (
                    <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>Belum ada transaksi.</p>
                ) : null}
                {safeTransactions.map((t) => (
                    <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--card-border)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                                width: 34, height: 34, borderRadius: 10,
                                background: t.tipe === "pemasukan" ? "var(--success-bg)" : "var(--danger-bg)",
                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}>
                                {t.tipe === "pemasukan"
                                    ? <TrendingUp size={14} color="var(--success)" />
                                    : <TrendingDown size={14} color="var(--danger)" />
                                }
                            </div>
                            <div>
                                <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>
                                    {t.kategori ? t.kategori : ""}
                                    <span style={{ marginLeft: 6, color: "var(--text-muted)", fontSize: 11, fontWeight: 400 }}>
                                        by {t.user ? t.user.nama_lengkap : ""}
                                    </span>
                                </p>
                                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 11 }}>
                                    {formatTanggal(t.tanggal)} · {t.pocket ? t.pocket.nama_pocket : ""}
                                </p>
                            </div>
                        </div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: t.tipe === "pemasukan" ? "var(--success)" : "var(--danger)" }}>
                            {t.tipe === "pemasukan" ? "+" : "-"}{formatRupiah(t.nominal)}
                        </p>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}