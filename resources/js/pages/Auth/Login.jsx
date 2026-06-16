import { useState } from "react";
import { router } from "@inertiajs/react";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        router.post("/login", form, {
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
        transition: "border 0.2s",
    };

    return (
        <AuthLayout>
            <h2 className="text-white font-semibold text-xl mb-6 m-0">
                Masuk ke Akun
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email */}
                <div>
                    <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                        Email
                    </label>
                    <div className="relative mt-1.5">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2"/>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                        </div>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="email@example.com"
                            style={{ ...inputStyle, paddingLeft: 40 }}
                        />
                    </div>
                    {errors.email ? (
                        <p className="text-xs mt-1" style={{ color: "#fca5a5" }}>{errors.email}</p>
                    ) : null}
                </div>

                {/* Password */}
                <div>
                    <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                        Password
                    </label>
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
                            placeholder="••••••••"
                            style={{ ...inputStyle, paddingLeft: 40, paddingRight: 44 }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-0"
                        >
                            {showPassword ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                    <line x1="2" x2="22" y1="2" y2="22"/>
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            )}
                        </button>
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
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="inline-block w-4 h-4 rounded-full border-2 border-purple-300 border-t-purple-700"
                                style={{ animation: "spin 0.8s linear infinite" }}
                            />
                            Memproses...
                        </span>
                    ) : "Masuk"}
                </button>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>atau</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            <p className="text-center text-sm m-0" style={{ color: "rgba(255,255,255,0.6)" }}>
                Belum punya akun?
                <a href="/register" className="font-semibold ml-1 no-underline" style={{ color: "#fff" }}>
                    Daftar sekarang
                </a>
            </p>
        </AuthLayout>
    );
}