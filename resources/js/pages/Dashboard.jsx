import { router } from "@inertiajs/react";
import MainLayout from "../layouts/MainLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Wallet, BarChart3, ArrowRight } from "lucide-react";

export default function Dashboard({
    pockets,
    totalSaldo,
    totalPemasukan,
    totalPengeluaran,
    netProfit,
    recentTransactions,
    pengeluaranPerKategori,
    bulan,
}) {
    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka ? angka : 0);

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "";
        return new Date(tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const safePockets = Array.isArray(pockets) ? pockets : [];
    const safeTransactions = Array.isArray(recentTransactions) ? recentTransactions : [];
    const safeKategori = Array.isArray(pengeluaranPerKategori) ? pengeluaranPerKategori : [];

    const chartData = safeKategori.map((k) => ({
        name: k.kategori ? k.kategori : "",
        total: k.total ? parseFloat(k.total) : 0,
    }));

    const tipePocket = {
        kebun:    { label: "Kebun",    color: "#7c3aed" },
        pribadi:  { label: "Pribadi",  color: "#2563eb" },
        talangan: { label: "Talangan", color: "#db2777" },
    };

    const card = {
        background: "var(--card-bg)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 20,
        border: "1px solid var(--card-border)",
        boxShadow: "var(--glass-shadow)",
    };

    const statCards = [
        {
            label: "Total Saldo",
            value: formatRupiah(totalSaldo),
            sub: safePockets.length + " pocket aktif",
            icon: Wallet,
            color: "var(--accent)",
            bg: "var(--accent-light)",
        },
        {
            label: "Pemasukan",
            value: "+" + formatRupiah(totalPemasukan),
            sub: "Bulan " + bulan,
            icon: TrendingUp,
            color: "var(--success)",
            bg: "var(--success-bg)",
        },
        {
            label: "Pengeluaran",
            value: "-" + formatRupiah(totalPengeluaran),
            sub: "Bulan " + bulan,
            icon: TrendingDown,
            color: "var(--danger)",
            bg: "var(--danger-bg)",
        },
        {
            label: "Net Profit",
            value: formatRupiah(netProfit),
            sub: netProfit >= 0 ? "Untung bulan ini" : "Rugi bulan ini",
            icon: BarChart3,
            color: netProfit >= 0 ? "var(--success)" : "var(--danger)",
            bg: netProfit >= 0 ? "var(--success-bg)" : "var(--danger-bg)",
        },
    ];

    return (
        <MainLayout>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 20px" }}>
                Ringkasan keuangan bulan {bulan}
            </p>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
                {statCards.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} style={{ ...card }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</p>
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 10,
                                    background: s.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Icon size={15} color={s.color} />
                                </div>
                            </div>
                            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 18, color: s.color }}>{s.value}</p>
                            <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>{s.sub}</p>
                        </div>
                    );
                })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                {/* Chart */}
                <div style={{ ...card }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <h3 style={{ color: "var(--text-primary)", margin: 0, fontSize: 14, fontWeight: 600 }}>
                            Pengeluaran per Kategori
                        </h3>
                    </div>
                    {chartData.length === 0 ? (
                        <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>Belum ada data bulan ini.</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={160}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                                <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
                                <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--card-bg)",
                                        border: "1px solid var(--card-border)",
                                        borderRadius: 10,
                                        color: "var(--text-primary)",
                                        fontSize: 12,
                                    }}
                                    formatter={(value) => formatRupiah(value)}
                                />
                                <Area type="monotone" dataKey="total" stroke="#7c3aed" fill="url(#grad)" strokeWidth={2}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Pocket */}
                <div style={{ ...card }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <h3 style={{ color: "var(--text-primary)", margin: 0, fontSize: 14, fontWeight: 600 }}>Multi Pocket</h3>
                        <button
                            onClick={() => router.get("/pocket")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                padding: "5px 10px",
                                borderRadius: 8,
                                border: "1px solid var(--glass-border)",
                                background: "var(--glass-bg)",
                                color: "var(--text-secondary)",
                                fontSize: 11,
                                cursor: "pointer",
                            }}
                        >
                            Kelola <ArrowRight size={11} />
                        </button>
                    </div>
                    {safePockets.length === 0 ? (
                        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Belum ada pocket.</p>
                    ) : null}
                    {safePockets.map((p) => (
                        <div key={p.id} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 0",
                            borderBottom: "1px solid var(--card-border)",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: tipePocket[p.tipe] ? tipePocket[p.tipe].color : "var(--accent)",
                                    flexShrink: 0,
                                }} />
                                <div>
                                    <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{p.nama_pocket}</p>
                                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 10 }}>
                                        {tipePocket[p.tipe] ? tipePocket[p.tipe].label : p.tipe}
                                    </p>
                                </div>
                            </div>
                            <p style={{ margin: 0, color: "var(--text-primary)", fontWeight: 600, fontSize: 13 }}>
                                {formatRupiah(p.saldo)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Transactions */}
            <div style={{ ...card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h3 style={{ color: "var(--text-primary)", margin: 0, fontSize: 14, fontWeight: 600 }}>Transaksi Terbaru</h3>
                    <button
                        onClick={() => router.get("/transaction")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "5px 10px",
                            borderRadius: 8,
                            border: "1px solid var(--glass-border)",
                            background: "var(--glass-bg)",
                            color: "var(--text-secondary)",
                            fontSize: 11,
                            cursor: "pointer",
                        }}
                    >
                        Lihat Semua <ArrowRight size={11} />
                    </button>
                </div>
                {safeTransactions.length === 0 ? (
                    <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>Belum ada transaksi.</p>
                ) : null}
                {safeTransactions.map((t) => (
                    <div key={t.id} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--card-border)",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: t.tipe === "pemasukan" ? "var(--success-bg)" : "var(--danger-bg)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                {t.tipe === "pemasukan"
                                    ? <TrendingUp size={15} color="var(--success)" />
                                    : <TrendingDown size={15} color="var(--danger)" />
                                }
                            </div>
                            <div>
                                <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>
                                    {t.kategori ? t.kategori : ""}
                                </p>
                                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 11 }}>
                                    {formatTanggal(t.tanggal)} · {t.pocket ? t.pocket.nama_pocket : ""}
                                </p>
                            </div>
                        </div>
                        <p style={{
                            margin: 0,
                            fontWeight: 600,
                            fontSize: 13,
                            color: t.tipe === "pemasukan" ? "var(--success)" : "var(--danger)",
                        }}>
                            {t.tipe === "pemasukan" ? "+" : "-"}{formatRupiah(t.nominal)}
                        </p>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}