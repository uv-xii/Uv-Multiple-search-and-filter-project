// ============================================================
// FilterBar.jsx — Tag filters, sort options and view toggle
// ============================================================

export default function FilterBar({
  tags, activeTag, onTagChange,
  sortBy, onSortChange,
  view, onViewChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {/* ── Tag pills ── */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            style={{
              background: activeTag === tag ? "#1a1a1a" : "transparent",
              color: activeTag === tag ? "#00ff9d" : "#444",
              border: `1px solid ${activeTag === tag ? "#00ff9d44" : "#1a1a1a"}`,
              fontFamily: "monospace",
              fontSize: 10,
              padding: "4px 10px",
              cursor: "pointer",
              letterSpacing: 1,
              transition: "all 0.15s",
            }}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Sort + View Controls ── */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#333", fontSize: 11 }}>SORT:</span>

        {["date", "title"].map((s) => (
          <button
            key={s}
            onClick={() => onSortChange(s)}
            style={{
              background: "transparent",
              color: sortBy === s ? "#00ff9d" : "#444",
              border: `1px solid ${sortBy === s ? "#00ff9d44" : "#1a1a1a"}`,
              fontFamily: "monospace",
              fontSize: 10,
              padding: "4px 10px",
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "#1e1e1e" }} />

        {/* Grid view */}
        <button
          onClick={() => onViewChange("grid")}
          title="Grid View"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: view === "grid" ? "#00ff9d" : "#333",
            fontSize: 18,
          }}
        >
          ⊞
        </button>

        {/* List view */}
        <button
          onClick={() => onViewChange("list")}
          title="List View"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: view === "list" ? "#00ff9d" : "#333",
            fontSize: 18,
          }}
        >
          ☰
        </button>
      </div>
    </div>
  );
}
