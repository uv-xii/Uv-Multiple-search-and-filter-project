// ============================================================
// App.jsx — Nexus Search: Multi-Category Search & Filter Platform
// ============================================================

import { useState, useEffect, useRef } from "react";
import { CATEGORIES, MOCK_DATA, ALL_DATA, CATEGORY_COUNTS } from "./data";
import SearchBar from "./SearchBar";
import CategoryTabs from "./CategoryTabs";
import ResultCard from "./ResultCard";
import FilterBar from "./FilterBar";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

// ── Avatar + Dropdown Component ──
function UserAvatar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00ff9d, #00c97a)",
          border: "2px solid #00ff9d44",
          color: "#050505",
          fontFamily: "monospace",
          fontWeight: 900,
          fontSize: 13,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 12px #00ff9d44",
          transition: "box-shadow 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 20px #00ff9d88"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 12px #00ff9d44"}
      >
        NS
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 46,
            right: 0,
            background: "#111",
            border: "1px solid #1f1f1f",
            borderRadius: 10,
            minWidth: 180,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          {/* User info */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>
              Nexus User
            </div>
            <div style={{ color: "#444", fontSize: 11, fontFamily: "monospace", marginTop: 2 }}>
              user@nexus.io
            </div>
          </div>

          {/* Menu items */}
          <div style={{ padding: "6px 0" }}>
            <button
              style={{
                width: "100%",
                padding: "9px 16px",
                background: "none",
                border: "none",
                color: "#888",
                fontFamily: "monospace",
                fontSize: 12,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#888"; }}
            >
              ◈ PROFILE
            </button>
            <button
              style={{
                width: "100%",
                padding: "9px 16px",
                background: "none",
                border: "none",
                color: "#888",
                fontFamily: "monospace",
                fontSize: 12,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#888"; }}
            >
              ◎ SETTINGS
            </button>
            <div style={{ height: 1, background: "#1a1a1a", margin: "4px 0" }} />
            <button
              onClick={onLogout}
              style={{
                width: "100%",
                padding: "9px 16px",
                background: "none",
                border: "none",
                color: "#ff4444",
                fontFamily: "monospace",
                fontSize: 12,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a0000"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
            >
              ⏻ LOGOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main app extracted into its own component ──
function MainApp() {
  const navigate = useNavigate();
  const [query, setQuery]               = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]             = useState("date");
  const [view, setView]                 = useState("grid");
  const [results, setResults]           = useState(ALL_DATA);
  const [isSearching, setIsSearching]   = useState(false);
  const [scanLine, setScanLine]         = useState(0);
  const [tagFilter, setTagFilter]       = useState("All");

  const handleLogout = () => {
    navigate("/login");
  };

  // ── Animated scanline ────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((p) => (p + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // ── Search + Filter Logic (debounced 300ms) ───────────────
  useEffect(() => {
    setIsSearching(true);
    const timeout = setTimeout(() => {
      let data =
        activeCategory === "All"
          ? ALL_DATA
          : (MOCK_DATA[activeCategory] || []).map((d) => ({
              ...d,
              category: activeCategory,
            }));

      if (query.trim()) {
        const q = query.toLowerCase();
        data = data.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.tag.toLowerCase().includes(q)
        );
      }

      if (tagFilter !== "All") {
        data = data.filter((d) => d.tag === tagFilter);
      }

      data = [...data].sort((a, b) => {
        if (sortBy === "date")  return new Date(b.date) - new Date(a.date);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });

      setResults(data);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, activeCategory, sortBy, tagFilter]);

  const baseData =
    activeCategory === "All"
      ? ALL_DATA
      : MOCK_DATA[activeCategory] || [];

  const allTags = ["All", ...new Set(baseData.map((d) => d.tag))];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setTagFilter("All");
  };

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        fontFamily: "monospace",
        color: "#e0e0e0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated scan line */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(0,255,157,0.15), transparent)",
          top: `${scanLine}%`,
          pointerEvents: "none",
          zIndex: 1,
          transition: "top 0.03s linear",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        {/* ── Header ── */}
        <div style={{ marginBottom: 40 }}>
          {/* Top row: branding left, avatar right */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, background: "#00ff9d", boxShadow: "0 0 10px #00ff9d" }} />
                <span style={{ color: "#00ff9d", fontSize: 11, letterSpacing: 4 }}>
                  NEXUS // MULTI-SEARCH v2.6
                </span>
              </div>
              <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1, lineHeight: 1, color: "#fff", marginBottom: 4 }}>
                NEXUS<span style={{ color: "#00ff9d" }}>_</span>SEARCH
              </h1>
              <p style={{ color: "#444", fontSize: 12, letterSpacing: 2 }}>
                SEARCH ACROSS IMAGES · VIDEOS · PEOPLE · FILES
              </p>
            </div>

            {/* Avatar + Dropdown */}
            <UserAvatar onLogout={handleLogout} />
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div style={{ marginBottom: 24 }}>
          <SearchBar query={query} setQuery={setQuery} isSearching={isSearching} resultCount={results.length} />
        </div>

        {/* ── Category Tabs ── */}
        <div style={{ marginBottom: 20 }}>
          <CategoryTabs categories={CATEGORIES} active={activeCategory} counts={CATEGORY_COUNTS} onChange={handleCategoryChange} />
        </div>

        {/* ── Filter + Sort + View ── */}
        <div style={{ marginBottom: 20 }}>
          <FilterBar tags={allTags} activeTag={tagFilter} onTagChange={setTagFilter} sortBy={sortBy} onSortChange={setSortBy} view={view} onViewChange={setView} />
        </div>

        {/* ── Results ── */}
        {results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#333" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>◌</div>
            <div style={{ fontSize: 13, letterSpacing: 3 }}>NO RESULTS FOUND</div>
            <div style={{ fontSize: 11, color: "#222", marginTop: 8 }}>TRY A DIFFERENT QUERY OR CATEGORY</div>
          </div>
        ) : view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {results.map((item) => (
              <ResultCard key={item.id} item={item} view="grid" />
            ))}
          </div>
        ) : (
          <div style={{ border: "1px solid #1a1a1a" }}>
            {results.map((item, i) => (
              <div key={item.id} style={{ borderBottom: i < results.length - 1 ? "1px solid #111" : "none" }}>
                <ResultCard item={item} view="list" />
              </div>
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        <div style={{ marginTop: 60, borderTop: "1px solid #111", paddingTop: 20, display: "flex", justifyContent: "space-between", color: "#222", fontSize: 10, letterSpacing: 2 }}>
          <span>NEXUS SEARCH ENGINE v2.6.0</span>
          <span>{results.length} / {ALL_DATA.length} INDEXED</span>
          <span>◈ ONLINE</span>
        </div>
      </div>
    </div>
  );
}

// ── Root App with Router ──
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
