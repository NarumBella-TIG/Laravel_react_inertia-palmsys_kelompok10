import { useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Pencil, Trash2, Leaf, Droplets, Package } from "lucide-react";

export default function PriceIndex({ prices = [], isAdmin = false }) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({
        nama_komoditas: "", harga: "", satuan: "kg",
        tanggal_update: new Date().toISOString().split("T")[0], sumber: "",
    });
    const [errors, setErrors] = useState({});

    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency", currency: "IDR", minimumFractionDigits: 0,
        }).format(angka ? angka : 0);

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "";
        return new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/price", form, {
            onError: (err) => setErrors(err),
            onSuccess: () => { setShowForm(false); setForm({ nama_komoditas: "", harga: "", satuan: "kg", tanggal_update: new Date().toISOString().split("T")[0], sumber: "" }); },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editData) return;
        router.put("/price/" + editData.id, {
            harga: editData.harga ? editData.harga : 0,
            tanggal_update: editData.tanggal_update ? editData.tanggal_update : "",
            sumber: editData.sumber ? editData.sumber : "",
        }, { onError: (err) => setErrors(err), onSuccess: () => setEditData(null) });
    };

    const handleDelete = (id) => {
        if (confirm("Hapus data harga ini?")) router.delete("/price/" + id);
    };

    const getIcon = (nama) => {
        if (!nama) return <Package size={20} color="var(--accent)" />;
        const lower = nama.toLowerCase();
        if (lower.includes("tbs") || lower.includes("tandan")) return <Leaf size={20} color="var(--accent)" />;
        if (lower.includes("pupuk")) return <Leaf size={20} color="var(--success)" />;
        if (lower.includes("herbisida") || lower.includes("pestisida")) return <Droplets size={20} color="var(--warning)" />;
        return <Package size={20} color="var(--accent)" />;
    };

    const safeList = Array.isArray(prices) ? prices.filter((p) => p !== null && p !== undefined) : [];

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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>Referensi harga sawit dan pupuk terkini</p>
                {isAdmin ? (
                    <button onClick={() => setShowForm(!showForm)} style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: 6 }}>
                        <Plus size={14} /> Tambah Harga
                    </button>
                ) : null}
            </div>

            {isAdmin && showForm ? (
                <div style={{ ...card, marginBottom: 16 }}>
                    <h3 style={{ color: "var(--text-primary)", margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Tambah Harga Komoditas</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Nama Komoditas</label>
                                <input type="text" value={form.nama_komoditas} onChange={(e) => setForm({ ...form, nama_komoditas: e.target.value })} style={inputStyle} />
                                {errors.nama_komoditas ? <p style={{ color: "var(--danger)", fontSize: 11 }}>{errors.nama_komoditas}</p> : null}
                            </div>
                            <div>
                                <label style={labelStyle}>Harga (Rp)</label>
                                <input type="number" value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} style={inputStyle} />
                                {errors.harga ? <p style={{ color: "var(--danger)", fontSize: 11 }}>{errors.harga}</p> : null}
                            </div>
                            <div>
                                <label style={labelStyle}>Satuan</label>
                                <select value={form.satuan} onChange={(e) => setForm({ ...form, satuan: e.target.value })} style={inputStyle}>
                                    <option value="kg">kg</option>
                                    <option value="liter">liter</option>
                                    <option value="karung">karung</option>
                                    <option value="ton">ton</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Tanggal Update</label>
                                <input type="date" value={form.tanggal_update} onChange={(e) => setForm({ ...form, tanggal_update: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Sumber (opsional)</label>
                                <input type="text" value={form.sumber} onChange={(e) => setForm({ ...form, sumber: e.target.value })} placeholder="contoh: Disbun Riau" style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                            <button type="submit" style={btnPrimary}>Simpan</button>
                            <button type="button" onClick={() => setShowForm(false)} style={btnSecondary}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : null}

            {isAdmin && editData ? (
                <div style={{ ...card, marginBottom: 16, borderColor: "var(--warning-bg)" }}>
                    <h3 style={{ color: "var(--text-primary)", margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>
                        Update: {editData.nama_komoditas}
                    </h3>
                    <form onSubmit={handleUpdate}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Harga Baru (Rp)</label>
                                <input type="number" value={editData.harga ? editData.harga : ""} onChange={(e) => setEditData({ ...editData, harga: e.target.value })} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Tanggal Update</label>
                                <input type="date" value={editData.tanggal_update ? editData.tanggal_update : ""} onChange={(e) => setEditData({ ...editData, tanggal_update: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Sumber</label>
                                <input type="text" value={editData.sumber ? editData.sumber : ""} onChange={(e) => setEditData({ ...editData, sumber: e.target.value })} style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                            <button type="submit" style={btnPrimary}>Update</button>
                            <button type="button" onClick={() => setEditData(null)} style={btnSecondary}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : null}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                {safeList.length === 0 ? (
                    <div style={{ ...card, gridColumn: "1/-1", textAlign: "center", padding: 40 }}>
                        <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>Belum ada data harga.</p>
                    </div>
                ) : null}
                {safeList.map((p) => (
                    <div key={p.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 12,
                                background: "var(--accent-light)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                {getIcon(p.nama_komoditas)}
                            </div>
                            <div>
                                <p style={{ margin: 0, color: "var(--text-primary)", fontWeight: 600, fontSize: 14 }}>
                                    {p.nama_komoditas ? p.nama_komoditas : ""}
                                </p>
                                <p style={{ margin: "3px 0", color: "var(--success)", fontWeight: 700, fontSize: 18 }}>
                                    {formatRupiah(p.harga)}
                                    <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400 }}>/{p.satuan ? p.satuan : ""}</span>
                                </p>
                                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 11 }}>
                                    {formatTanggal(p.tanggal_update)}{p.sumber ? " · " + p.sumber : ""}
                                </p>
                            </div>
                        </div>
                        {isAdmin ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <button onClick={() => setEditData(p)} style={{ ...btnSecondary, padding: "6px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                                    <Pencil size={12} /> Edit
                                </button>
                                <button onClick={() => handleDelete(p.id)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--danger-bg)", background: "var(--danger-bg)", color: "var(--danger)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                                    <Trash2 size={12} /> Hapus
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}