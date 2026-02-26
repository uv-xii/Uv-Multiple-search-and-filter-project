import { useRef } from "react";

export default function SearchBar({ query, setQuery, isSearching, resultCount }) {
  const inputRef = useRef();

  return (
    <div style={{ border: "1px solid #1e1e1e", background: "#0a0a0a", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", position: "relative", boxShadow: query ? "0 0 30px rgba(0,255,157,0.08)" : "none", transition: "box-shadow 0.3s" }}>
      <span style={{ color: "#00ff9d", fontSize: 18 }}>⌕</span>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search the nexus..."
        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e0e0e0", fontFamily: "monospace", fontSize: 15, padding: "16px 0", caretColor: "#00ff9d" }}
      />
      {isSearching && <span style={{ color: "#00ff9d", fontSize: 11, letterSpacing: 2 }}>SCANNING...</span>}
      {query && !isSearching && (
        <button onClick={() => setQuery("")} style={{ color: "#444", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
      )}
      <span style={{ color: "#1e1e1e", fontSize: 11 }}>{resultCount} RESULTS</span>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: query ? "linear-gradient(90deg, transparent, #00ff9d, transparent)" : "#1e1e1e", transition: "background 0.3s" }} />
    </div>
  );
}