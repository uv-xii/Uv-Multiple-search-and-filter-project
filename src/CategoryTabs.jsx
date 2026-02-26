// ============================================================
// CategoryTabs.jsx — Tab bar for switching between categories
// ============================================================

const ICONS = {
  All: "◈", Images: "⬡", Videos: "▶", People: "◉", Files: "◫",
};

export default function CategoryTabs({ categories, active, counts, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              background: isActive ? "#00ff9d" : "transparent",
              color: isActive ? "#000" : "#555",
              border: `1px solid ${isActive ? "#00ff9d" : "#1e1e1e"}`,
              fontFamily: "monospace",
              fontSize: 11,
              padding: "8px 16px",
              cursor: "pointer",
              letterSpacing: 1,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>{ICONS[cat]}</span>
            {cat.toUpperCase()}
            <span
              style={{
                background: isActive ? "#000" : "#1e1e1e",
                color: isActive ? "#00ff9d" : "#333",
                padding: "1px 6px",
                fontSize: 10,
              }}
            >
              {counts[cat]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
