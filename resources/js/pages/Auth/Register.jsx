import { useState } from "react";
import { router } from "@inertiajs/react";
import AuthLayout from "../../layouts/AuthLayout";

export default function Register() {
    const [form, setForm] = useState({
        nama_lengkap: "",
        email: "",
        no_hp: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        router.post("/register", form, {
            onError: (err) => {
                setErrors(err);
                setLoading(false);
            },
            onSuccess: () => setLoading(false),
        });
    };

    const inputStyle = {
        display: "block",
        width: "100%",
        padding: "12px 16px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(255,255,255,0.1)",
        color: "#fff",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box",
        marginTop: 6,
    };

    const fields = [
        { key: "nama_lengkap", label: "Nama Lengkap", type: "text", placeholder: "Nama lengkap kamu", icon: "user" },
        { key: "email", label: "Email", type: "email", placeholder: "email@example.com", icon: "mail" },
        { key: "no_hp", label: "No HP", type: "text", placeholder: "08xxxxxxxxxx", icon: "phone" },
    ];

    const icons = {
        user: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>,
        mail: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
        phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.92 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.82 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.18z"/></>,
    };

    return (
        <AuthLayout>
            <h2 className="text-white font-semibold text-xl mb-6 m-0">
                Buat Akun Baru
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {fields.map((field) => (
                    <div key={field.key}>
                        <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                            {field.label}
                        </label>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {field.key === "user" ? <circle cx="12" cy="8" r="4"/> : null}
                                    {icons[field.icon]}
                                </svg>
                            </div>
                            <input
                                type={field.type}
                                value={form[field.key]}
                                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                placeholder={field.placeholder}
                                style={{ ...inputStyle, paddingLeft: 40 }}
                            />
                        </div>
                        {errors[field.key] ? (
                            <p className="text-xs mt-1" style={{ color: "#fca5a5" }}>{errors[field.key]}</p>
                        ) : null}
                    </div>
                ))}

                {/* Password */}
                <div>
                    <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>Password</label>
                    <div className="relative mt-1.5">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="Min. 6 karakter"
                            style={{ ...inputStyle, paddingLeft: 40, paddingRight: 44 }}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {showPassword ? (
                                    <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></>
                                ) : (
                                    <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>
                                )}
                            </svg>
                        </button>
                    </div>
                    {errors.password ? (
                        <p className="text-xs mt-1" style={{ color: "#fca5a5" }}>{errors.password}</p>
                    ) : null}
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>Konfirmasi Password</label>
                    <div className="relative mt-1.5">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <input
                            type="password"
                            value={form.password_confirmation}
                            onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                            placeholder="Ulangi password"
                            style={{ ...inputStyle, paddingLeft: 40 }}
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-base mt-2 cursor-pointer border-none transition-all duration-200"
                    style={{
                        background: loading ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.95)",
                        color: "#764ba2",
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? "Memproses..." : "Daftar Sekarang"}
                </button>
            </form>

            <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>atau</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            <p className="text-center text-sm m-0" style={{ color: "rgba(255,255,255,0.6)" }}>
                Sudah punya akun?
                <a href="/login" className="font-semibold ml-1 no-underline" style={{ color: "#fff" }}>
                    Masuk
                </a>
            </p>
        </AuthLayout>
    );
}