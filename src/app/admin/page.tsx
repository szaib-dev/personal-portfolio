"use client";

import { useState, useEffect, useMemo } from "react";
import { ConvexProvider, ConvexReactClient, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const [convexUrl, setConvexUrl] = useState<string | null>(null);
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    let alive = true;

    fetch("/api/convex-config", { cache: "no-store" })
      .then((response) => response.json())
      .then((config: { url?: string }) => {
        if (alive) {
          setConvexUrl(config.url?.trim() || null);
        }
      })
      .catch(() => {
        if (alive) {
          setConvexUrl(null);
        }
      })
      .finally(() => {
        if (alive) {
          setConfigLoaded(true);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  const convex = useMemo(
    () => (convexUrl ? new ConvexReactClient(convexUrl) : null),
    [convexUrl]
  );

  if (!configLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e0e0e0] border-t-[#111111]" />
      </div>
    );
  }

  if (!convex) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
        <div className="w-full max-w-[420px] rounded-[8px] border border-[#e5e5e5] bg-white p-6 text-center">
          <h1 className="text-[1.4rem] font-semibold tracking-[-0.04em] text-[#111111]">
            Admin unavailable
          </h1>
          <p className="mt-3 text-[0.92rem] leading-[1.6] text-[#666666]">
            Add NEXT_PUBLIC_CONVEX_URL or NEXT_PUBLIC_CONVEX_SITE_URL in your deployment environment to access the image manager.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <AdminLogin />
    </ConvexProvider>
  );
}

function AdminLogin() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("admin_token");
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useMutation(api.auth.login);
  const sessionCheck = useQuery(
    api.auth.validateSession,
    token ? { token } : "skip"
  );

  // Validate session when token changes
  useEffect(() => {
    if (sessionCheck && !sessionCheck.valid && token) {
      localStorage.removeItem("admin_token");
      queueMicrotask(() => setToken(null));
    }
  }, [sessionCheck, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login({ email, password });
      localStorage.setItem("admin_token", result.token);
      setToken(result.token);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Show login if no valid session
  if (!token || (sessionCheck && !sessionCheck.valid)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 text-center">
            <h1 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-[#111111]">
              Admin
            </h1>
            <p className="mt-2 text-[0.9rem] text-[#888888]">
              Sign in to manage portfolio images
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[0.82rem] font-medium text-[#555555]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[6px] border border-[#e0e0e0] bg-white px-4 py-3 text-[0.92rem] text-[#111111] outline-none transition-colors focus:border-[#111111]"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-[0.82rem] font-medium text-[#555555]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[6px] border border-[#e0e0e0] bg-white px-4 py-3 text-[0.92rem] text-[#111111] outline-none transition-colors focus:border-[#111111]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-[0.85rem] text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[6px] bg-[#111111] px-4 py-3 text-[0.92rem] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard token={token} onLogout={() => {
    localStorage.removeItem("admin_token");
    setToken(null);
  }} />;
}
