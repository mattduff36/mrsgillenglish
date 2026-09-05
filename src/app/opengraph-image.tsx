import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#C2B4A7",
          padding: 72,
          color: "#161012",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 18,
            background: "#2C3849",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#2C3849",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 36,
              color: "#3F3834",
              maxWidth: 900,
            }}
          >
            Key Stage 3 and GCSE English tutoring, plus free Edexcel
            literature revision.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#6B5344" }}>
          {site.youtube.handle}
        </div>
      </div>
    ),
    size,
  );
}
