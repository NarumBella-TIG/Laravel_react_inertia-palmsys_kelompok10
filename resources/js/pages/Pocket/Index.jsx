import { useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, ArrowLeftRight, Trash2 } from "lucide-react";

export default function PocketIndex({ pockets }) {
    const [showForm, setShowForm] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [form, setForm] = useState({ nama_pocket: "", tipe: "kebun", saldo: 0 });
    const [transfer, setTransfer] = useState({ dari_pocket_id: "", ke_pocket_id: "", nominal: 0 });
    const [errors, setErrors] = useState({});

    const safePockets = Array.isArray(pockets) ? pockets : [];

    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka ? angka : 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/pocket", form, {
            onError: (err) => setErrors(err),
            onSuccess: () => { setShowForm(false); setForm({ nama_pocket: "", tipe: "kebun", saldo: 0 }); },
        });
    };

    const handleTransfer = (e) => {
        e.preventDefault();
        router.post("/pocket/transfer", transfer, {
            onError: (err) => setErrors(err),
            onSuccess: () => { setShowTransfer(false); setTransfer({ dari_pocket_id: "", ke_pocket_id: "", nominal: 0 }); },
        });
    };

    const handleDelete = (id) => {
        if (confirm("Hapus pocket ini?")) router.delete("/pocket/" + id);
    };

    const tipePocket = {
        kebun:    { label: "Kebun",    color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
        pribadi:  { label: "Pribadi",  color: "#2563eb", bg: "rgba(37,99,235,0.1)" },
        talangan: { label: "Talangan", color: "#db2777", bg: "rgba(219,39,119,0.1)" },
    };

    const card = {
        background: "var(--card-bg)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 20,
        border: "1px solid var(--card-border)",
        boxShadow: "var(--glass-shadow)",
    };

    const inputStyle = {
        display: "block",
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        border: "1px solid var(--input-border)",
        background: "var(--input-bg)",
        color: "var(--input-text)",
        fontSize: 13,
        outline: "none",
        boxSizing: "border-box",
        marginTop: 6,
    };

    const labelStyle = { color: "var(--text-secondary)", fontSize: 12, fontWeight: 500 };

    const btnPrimary = {
        padding: "9px 18px",
        borderRadius: 10,
        border: "none",
        background: "var(--accent)",
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
    };

    const btnSecondary = {
        padding: "9px 18px",
        borderRadius: 10,
        border: "1px solid var(--glass-border)",
        background: "var(--glass-bg)",
        color: "var(--text-secondary)",
        fontSize: 13,
        cursor: "pointer",
    };

    return (
        <MainLayout>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>
                    Kelola dana kebun, pribadi, dan talangan
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                    {safePockets.length >= 2 ? (
                        <button onClick={() => setShowTransfer(!showTransfer)} style={{ ...btnSecondary, display: "flex", alignItems: "center", gap: 6 }}>
                            <ArrowLeftRight size={14} /> Transfer
                        </button>
                    ) : null}
                    <button onClick={() => setShowForm(!showForm)} style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: 6 }}>
                        <Plus size={14} /> Buat Pocket
                    </button>
                </div>
            </div>

            {/* Form Buat */}
            {showForm ? (
                <div style={{ ...card, marginBottom: 16 }}>
                    <h3 style={{ color: "var(--text-primary)", margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Buat Pocket Baru</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Nama Pocket</label>
                                <input type="text" value={form.nama_pocket} onChange={(e) => setForm({ ...form, nama_pocket: e.target.value })} style={inputStyle} placeholder="Dana Kebun" />
                                {errors.nama_pocket ? <p style={{ color: "var(--danger)", fontSize: 11 }}>{errors.nama_pocket}</p> : null}
                            </div>
                            <div>
                                <label style={labelStyle}>Tipe</label>
                                <select value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value })} style={inputStyle}>
                                    <option value="kebun">Kebun</option>
                                    <option value="pribadi">Pribadi</option>
                                    <option value="talangan">Talangan</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Saldo Awal (Rp)</label>
                                <input type="number" value={form.saldo} onChange={(e) => setForm({ ...form, saldo: e.target.value })} style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                            <button type="submit" style={btnPrimary}>Simpan</button>
                            <button type="button" onClick={() => setShowForm(false)} style={btnSecondary}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : null}

            {/* Form Transfer */}
            {showTransfer ? (
                <div style={{ ...card, marginBottom: 16 }}>
                    <h3 style={{ color: "var(--text-primary)", margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Transfer Saldo Antar Pocket</h3>
                    <form onSubmit={handleTransfer}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Dari Pocket</label>
                                <select value={transfer.dari_pocket_id} onChange={(e) => setTransfer({ ...transfer, dari_pocket_id: e.target.value })} style={inputStyle}>
                                    <option value="">Pilih pocket</option>
                                    {safePockets.map((p) => <option key={p.id} value={p.id}>{p.nama_pocket} ({formatRupiah(p.saldo)})</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Ke Pocket</label>
                                <select value={transfer.ke_pocket_id} onChange={(e) => setTransfer({ ...transfer, ke_pocket_id: e.target.value })} style={inputStyle}>
                                    <option value="">Pilih pocket</option>
                                    {safePockets.map((p) => <option key={p.id} value={p.id}>{p.nama_pocket}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Nominal (Rp)</label>
                                <input type="number" value={transfer.nominal} onChange={(e) => setTransfer({ ...transfer, nominal: e.target.value })} style={inputStyle} />
                                {errors.nominal ? <p style={{ color: "var(--danger)", fontSize: 11 }}>{errors.nominal}</p> : null}
                            </div>
                        </div>
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                            <button type="submit" style={btnPrimary}>Transfer</button>
                            <button type="button" onClick={() => setShowTransfer(false)} style={btnSecondary}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : null}

            {/* Pocket Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {safePockets.length === 0 ? (
                    <div style={{ ...card, gridColumn: "1/-1", textAlign: "center", padding: 40 }}>
                        <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>Belum ada pocket. Buat pocket pertamamu!</p>
                    </div>
                ) : null}
                {safePockets.map((p) => (
                    <div key={p.id} style={{ ...card }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <span style={{
                                padding: "3px 10px",
                                borderRadius: 20,
                                background: tipePocket[p.tipe] ? tipePocket[p.tipe].bg : "var(--accent-light)",
                                color: tipePocket[p.tipe] ? tipePocket[p.tipe].color : "var(--accent)",
                                fontSize: 11,
                                fontWeight: 600,
                            }}>
                                {tipePocket[p.tipe] ? tipePocket[p.tipe].label : p.tipe}
                            </span>
                            <button onClick={() => handleDelete(p.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                                <Trash2 size={14} color="var(--text-muted)" />
                            </button>
                        </div>
                        <p style={{ margin: "0 0 6px", color: "var(--text-secondary)", fontSize: 12 }}>{p.nama_pocket}</p>
                        <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 22, fontWeight: 700 }}>{formatRupiah(p.saldo)}</p>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}