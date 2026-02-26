import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
setLoading(false);
navigate("/app");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-8 font-mono">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#a3e635 1px, transparent 1px), linear-gradient(90deg, #a3e635 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow blob */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-lime-400 opacity-5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-18 rounded-xl bg-lime-400 mb-5 shadow-lg shadow-lime-400/30">
            <svg className="w-10 h-10 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-zinc-500 text-sm mt-2 tracking-wide">Sign in to continue to your workspace</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 shadow-2xl">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Password
                </label>
                <a href="#" className="text-xs text-lime-400 hover:text-lime-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-all duration-200"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input type="checkbox" id="remember" className="sr-only peer" />
                <div
                  className="w-4 h-4 rounded bg-zinc-800 border border-zinc-600 peer-checked:bg-lime-400 peer-checked:border-lime-400 cursor-pointer transition-all"
                  onClick={(e) => e.currentTarget.previousSibling.click()}
                />
              </div>
              <label htmlFor="remember" className="text-sm text-zinc-400 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-lime-400 hover:bg-lime-300 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in →"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* OAuth */}
          <button className="w-full flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl py-3 text-sm text-zinc-300 font-medium transition-all duration-200 active:scale-[0.98]">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-sm mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-lime-400 hover:text-lime-300 font-medium transition-colors">
            Create one free
          </a>
        </p>
      </div>
    </div>
  );
}
<div style={{ color: "white", background: "red", padding: "20px" }}>
  TEST - Login Page is rendering
</div>


