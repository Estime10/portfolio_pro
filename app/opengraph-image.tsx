import { ImageResponse } from "next/og";
import { BRAND_LOGO_SURFACE_GRADIENT } from "@/lib/constants";
import { loadInstrumentSansSemibold } from "@/lib/metadata/icon/loadInstrumentSansSemibold";
import {
  OPEN_GRAPH_IMAGE_HEIGHT,
  OPEN_GRAPH_IMAGE_WIDTH,
} from "@/lib/metadata/open-graph-image/openGraphImage";
import { SITE_NAME } from "@/lib/metadata/site-name/siteName";

export const size = {
  width: OPEN_GRAPH_IMAGE_WIDTH,
  height: OPEN_GRAPH_IMAGE_HEIGHT,
};

export const contentType = "image/png";

const OG_TAGLINE = "Frontend & Product Engineer";

export default async function OpenGraphImage(): Promise<ImageResponse> {
  let fonts:
    { name: "Instrument Sans"; data: ArrayBuffer; style: "normal"; weight: 600 }[] | undefined;

  try {
    const data = await loadInstrumentSansSemibold();
    fonts = [{ name: "Instrument Sans", data, style: "normal", weight: 600 }];
  } catch {
    fonts = undefined;
  }

  const fontFamily = fonts ? "Instrument Sans" : "ui-sans-serif, system-ui, sans-serif";

  return new ImageResponse(
    <div
      style={{
        width: size.width,
        height: size.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        boxSizing: "border-box",
        padding: "72px 80px",
        background: BRAND_LOGO_SURFACE_GRADIENT,
        border: "4px solid rgba(248, 250, 252, 0.28)",
      }}
    >
      <span
        style={{
          color: "#ffffff",
          fontSize: 88,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          fontFamily,
        }}
      >
        {SITE_NAME}
      </span>
      <span
        style={{
          marginTop: 20,
          color: "rgba(248, 250, 252, 0.88)",
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          fontFamily,
        }}
      >
        {OG_TAGLINE}
      </span>
    </div>,
    {
      width: size.width,
      height: size.height,
      ...(fonts ? { fonts } : {}),
    },
  );
}
