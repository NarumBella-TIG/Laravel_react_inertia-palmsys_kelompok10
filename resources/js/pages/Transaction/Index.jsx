import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown, Paperclip, Wifi, WifiOff } from "lucide-react";
import {
    saveOffline,
    getOfflineTransactions,
    isOnline,
    syncToServer,
} from "../../lib/OfflineService";

export default function TransactionIndex({ transactions, pockets }) {
    const [online, setOnline] = useState(isOnline());
    const [offlineCount, setOfflineCount] = useState(getOfflineTransactions().length);
    const [syncMessage, setSyncMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({
        pocket_id: pockets[0] ? pockets[0].id : "",
        tipe: "pemasukan", nominal: "", kategori: "", deskripsi: "",
        tanggal: new Date().toISOString().split("T")[0], foto_nota: null,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleOnline = async () => {
            setOnline(true);
            try {
                const metaToken = document.querySelector('meta[name="csrf-token"]');
                const token = metaToken ? metaToken.getAttribute("content") : "";
                const result = await syncToServer(token);
                setSyncMessage(result.message);
                setOfflineCount(0);
                setTimeout(() => setSyncMessage(""), 4000);
            } catch (err) {
                setSyncMessage("Gagal sync data offline.");
                setTimeout(() => setSyncMessage(""), 4000);
            }
        };
        const handleOffline = () => setOnline(false);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const kategoriOptions = {
        pemasukan: ["Penjualan Sawit", "Subsidi", "Lainnya"],
        pengeluaran: ["Pupuk", "Upah Panen", "Pruning", "Transportasi", "Lainnya"],
    };

    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka ? angka : 0);

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "";
        return new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isOnline()) {
            saveOffline({ pocket_id: form.pocket_id, tipe: form.tipe, nominal: form.nominal, kategori: form.kategori, deskripsi: form.deskripsi, tanggal: form.tanggal });
            setOfflineCount(getOfflineTransactions().length);
            setShowForm(false);
            setSyncMessage("Transaksi disimpan offline. Akan disync saat online.");
            setTimeout(() => setSyncMessage(""), 4000);
            return;
        }
        const data = new FormData();
        Object.keys(form).forEach((key) => { if (form[key] !== null && form[key] !== "") data.append(key, form[key]); });
        router.post("/transaction", data, {
            forceFormData: true,
            onError: (err) => setErrors(err),
            onSuccess: () => {
                setShowForm(false);
                setForm({ pocket_id: pockets[0] ? pockets[0].id : "", tipe: "pemasukan", nominal: "", kategori: "", deskripsi: "", tanggal: new Date().toISOString().split("T")[0], foto_nota: null });
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editData) return;
        router.put("/transaction/" + editData.id, {
            kategori: editData.kategori ? editData.kategori : "",
            deskripsi: editData.deskripsi ? editData.deskripsi : "",
            tanggal: editData.tanggal ? editData.tanggal : "",
        }, { onError: (err) => setErrors(err), onSuccess: () => setEditData(null) });
    };

    const handleDelete = (id) => {
        if (confirm("Hapus transaksi ini? Saldo pocket akan dikembalikan.")) router.delete("/transaction/" + id);
    };

    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const safePockets = Array.isArray(pockets) ? pockets : [];

    const card = {
        background: "var(--card-bg)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 20,
        border: "1px solid var(--card-border)",
        boxShadow: "var(--glass-shadow)",
    };

    const inputStyle = {
        display: "block", width: "100%", padding: "10px 14px", borderRadius: 10,
        border: "1px solid var(--input-border)", background: "var(--input-bg)",
        color: "var(--input-text)", fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 6,
    };

    const labelStyle = { color: "var(--text-secondary)", fontSize: 12, fontWeight: 500 };
    const btnPrimary = { padding: "9px 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" };
    const btnSecondary = { padding: "9px 18px", borderRadius: 10, border: "1px solid var(--glass-border)", background: "var(--glass-bg)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer" };

    return (
        <MainLayout>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>
                    Kelola pemasukan dan pengeluaran kebun
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Status Online */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 12px", borderRadius: 20,
                        background: online ? "var(--success-bg)" : "var(--danger-bg)",
                        border: "1px solid " + (online ? "rgba(5,150,105,0.2)" : "rgba(220,38,38,0.2)"),
                        fontSize: 12, fontWeight: 600,
                        color: online ? "var(--success)" : "var(--danger)",
                    }}>
                        {online ? <Wifi size={13} /> : <WifiOff size={13} />}
                        {online ? "Online" : "Offline"}
                        {offlineCount > 0 ? " · " + offlineCount + " pending" : ""}
                    </div>
                    <button onClick={() => setShowForm(!showForm)} style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: 6 }}>
                        <Plus size={14} /> Tambah Transaksi
                    </button>
                </div>
            </div>

            {/* Sync Message */}
            {syncMessage ? (
                <div style={{ ...card, marginBottom: 12, background: "var(--accent-light)", borderColor: "var(--accent-border)", color: "var(--accent)", fontSize: 13 }}>
                    {syncMessage}
                </div>
            ) : null}

            {/* Form Tambah */}
            {showForm ? (
                <div style={{ ...card, marginBottom: 16 }}>
                    <h3 style={{ color: "var(--text-primary)", margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Tambah Transaksi</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Pocket</label>
                                <select value={form.pocket_id} onChange={(e) => setForm({ ...form, pocket_id: e.target.value })} style={inputStyle}>
                                    {safePockets.map((p) => <option key={p.id} value={p.id}>{p.nama_pocket}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Tipe</label>
                                <select value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value, kategori: "" })} style={inputStyle}>
                                    <option value="pemasukan">Pemasukan</option>
                                    <option value="pengeluaran">Pengeluaran</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Kategori</label>
                                <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} style={inputStyle}>
                                    <option value="">Pilih kategori</option>
                                    {kategoriOptions[form.tipe].map((k) => <option key={k} value={k}>{k}</option>)}
                                </select>
                                {errors.kategori ? <p style={{ color: "var(--danger)", fontSize: 11 }}>{errors.kategori}</p> : null}
                            </div>
                            <div>
                                <label style={labelStyle}>Nominal (Rp)</label>
                                <input type="number" value={form.nominal} onChange={(e) => setForm({ ...form, nominal: e.target.value })} style={inputStyle} placeholder="0" />
                                {errors.nominal ? <p style={{ color: "var(--danger)", fontSize: 11 }}>{errors.nominal}</p> : null}
                            </div>
                            <div>
                                <label style={labelStyle}>Tanggal</label>
                                <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Foto Nota (opsional)</label>
                                <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, foto_nota: e.target.files[0] })} style={{ ...inputStyle, padding: "8px 14px" }} />
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Deskripsi (opsional)</label>
                                <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} style={{ ...inputStyle, resize: "none" }} rows={2} />
                            </div>
                        </div>
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                            <button type="submit" style={btnPrimary}>Simpan</button>
                            <button type="button" onClick={() => setShowForm(false)} style={btnSecondary}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : null}

            {/* Form Edit */}
            {editData ? (
                <div style={{ ...card, marginBottom: 16, borderColor: "var(--warning-bg)" }}>
                    <h3 style={{ color: "var(--text-primary)", margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Edit Transaksi</h3>
                    <form onSubmit={handleUpdate}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Kategori</label>
                                <input type="text" value={editData.kategori ? editData.kategori : ""} onChange={(e) => setEditData({ ...editData, kategori: e.target.value })} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Tanggal</label>
                                <input type="date" value={editData.tanggal ? editData.tanggal : ""} onChange={(e) => setEditData({ ...editData, tanggal: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Deskripsi</label>
                                <textarea value={editData.deskripsi ? editData.deskripsi : ""} onChange={(e) => setEditData({ ...editData, deskripsi: e.target.value })} style={{ ...inputStyle, resize: "none" }} rows={2} />
                            </div>
                        </div>
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                            <button type="submit" style={btnPrimary}>Update</button>
                            <button type="button" onClick={() => setEditData(null)} style={btnSecondary}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : null}

            {/* List Transaksi */}
            {safeTransactions.length === 0 ? (
                <div style={{ ...card, textAlign: "center", padding: 48 }}>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>
                        Belum ada transaksi. Tambah transaksi pertamamu!
                    </p>
                </div>
            ) : null}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {safeTransactions.map((t) => (
                    <div key={t.id} style={{
                        ...card,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderLeft: "3px solid " + (t.tipe === "pemasukan" ? "var(--success)" : "var(--danger)"),
                        padding: "14px 18px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                background: t.tipe === "pemasukan" ? "var(--success-bg)" : "var(--danger-bg)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                {t.tipe === "pemasukan"
                                    ? <TrendingUp size={16} color="var(--success)" />
                                    : <TrendingDown size={16} color="var(--danger)" />
                                }
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <p style={{ margin: 0, color: "var(--text-primary)", fontWeight: 600, fontSize: 14 }}>
                                        {t.kategori ? t.kategori : ""}
                                    </p>
                                    <span style={{
                                        padding: "2px 8px", borderRadius: 20,
                                        background: "var(--glass-bg)", color: "var(--text-muted)",
                                        fontSize: 11, border: "1px solid var(--glass-border)",
                                    }}>
                                        {t.pocket ? t.pocket.nama_pocket : ""}
                                    </span>
                                </div>
                                <p style={{ margin: "3px 0 0", color: "var(--text-muted)", fontSize: 12 }}>
                                    {formatTanggal(t.tanggal)}
                                    {t.deskripsi ? " · " + t.deskripsi : ""}
                                </p>
                                {t.receipt ? (
                                    <a href={"/storage/" + t.receipt.file_path} target="_blank" rel="noreferrer"
                                        style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--accent)", textDecoration: "none", marginTop: 2 }}>
                                        <Paperclip size={11} /> Lihat Nota ({t.receipt.file_size_kb} KB)
                                    </a>
                                ) : null}
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: t.tipe === "pemasukan" ? "var(--success)" : "var(--danger)" }}>
                                {t.tipe === "pemasukan" ? "+" : "-"}{formatRupiah(t.nominal)}
                            </p>
                            <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={() => setEditData(t)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--glass-border)", background: "var(--glass-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Pencil size={13} color="var(--text-muted)" />
                                </button>
                                <button onClick={() => handleDelete(t.id)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--danger-bg)", background: "var(--danger-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Trash2 size={13} color="var(--danger)" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}