/** Charge la graisse 600 pour le rendu OG / favicon (latin). */
export async function loadInstrumentSansSemibold(): Promise<ArrayBuffer> {
  const cssUrl =
    "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@600&display=swap";
  const css = await (await fetch(cssUrl, { next: { revalidate: 86_400 } })).text();
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]woff2['"]\)/);
  const woff2Url = match?.[1];
  if (!woff2Url) {
    throw new Error("URL woff2 Instrument Sans introuvable.");
  }
  const res = await fetch(woff2Url);
  if (!res.ok) {
    throw new Error(`Échec téléchargement police: ${String(res.status)}`);
  }
  return res.arrayBuffer();
}
