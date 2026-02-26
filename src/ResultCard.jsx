import { useState } from "react";

const CATEGORY_ICONS = { Images: "⬡", Videos: "▶", People: "◉", Files: "◫" };

function getMetaInfo(item) {
  if (item.category === "Images") return `${item.format} · ${item.size}`;
  if (item.category === "Videos") return `${item.duration} · ${item.resolution}`;
  if (item.category === "People") return `${item.role} · ${item.location}`;
  if (item.category === "Files")  return `${item.format} · ${item.size}`;
  return "";
}

function ListCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderLeft: `3px solid ${hovered ? item.color : "#2a2a2a"}`, background: hovered ? "rgba(255,255,255,0.03)" : "transparent", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", cursor: "pointer" }}>
      <span style={{ color: item.color, fontSize: 18 }}>{CATEGORY_ICONS[item.category]}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#e0e0e0", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
        <div style={{ color: "#555", fontSize: 11 }}>{getMetaInfo(item)}</div>
      </div>
      <span style={{ color: item.color, fontSize: 10, border: `1px solid ${item.color}33`, padding: "2px 8px" }}>{item.tag}</span>
      <span style={{ color: "#444", fontSize: 10 }}>{item.date}</span>
    </div>
  );
}

function GridCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "#161616" : "#0e0e0e", border: `1px solid ${hovered ? item.color + "66" : "#1e1e1e"}`, boxShadow: hovered ? `0 0 20px ${item.color}22` : "none", transition: "all 0.25s ease", cursor: "pointer", position: "relative", overflow: "hidden", padding: 16 }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hovered ? item.color : "#1e1e1e", transition: "background 0.25s" }} />
      <div style={{ color: item.color, fontSize: 22, marginBottom: 12, opacity: hovered ? 1 : 0.7 }}>{CATEGORY_ICONS[item.category]}</div>
      <div style={{ color: "#e0e0e0", fontSize: 13, marginBottom: 6, lineHeight: 1.4 }}>{item.title}</div>
      <div style={{ color: "#555", fontSize: 11, marginBottom: 12 }}>{getMetaInfo(item)}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: item.color, fontSize: 10, border: `1px solid ${item.color}44`, padding: "2px 8px" }}>{item.tag}</span>
        <span style={{ color: "#333", fontSize: 10 }}>{item.date}</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderTop: `1px solid ${item.color}33`, borderLeft: `1px solid ${item.color}33` }} />
    </div>
  );
}

export default function ResultCard({ item, view }) {
  return view === "list" ? <ListCard item={item} /> : <GridCard item={item} />;
}