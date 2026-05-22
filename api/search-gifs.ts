export default async function handler(req: any, res: any) {
  const q = (req.query.q as string) || "";
  if (!q.trim()) return res.status(400).json({ urls: [] });

  // Try Tenor v1 (api.tenor.com) — works with demo key LIVDSRZULELA
  try {
    const r = await fetch(
      `https://api.tenor.com/v1/search?q=${encodeURIComponent(q)}&key=LIVDSRZULELA&limit=18&contentfilter=medium&media_filter=minimal`
    );
    const d = await r.json();
    if (d.results?.length) {
      const urls = d.results
        .map((g: any) => g.media?.[0]?.tinygif?.url || g.media?.[0]?.gif?.url || "")
        .filter(Boolean);
      if (urls.length) {
        res.setHeader("Cache-Control", "s-maxage=300");
        return res.status(200).json({ urls });
      }
    }
  } catch (e) {
    console.error("Tenor v1 error:", e);
  }

  // Fallback: Tenor v2
  try {
    const r = await fetch(
      `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(q)}&key=LIVDSRZULELA&client_key=podium_app&limit=18`
    );
    const d = await r.json();
    const urls = (d.results || [])
      .map((g: any) => {
        const fmts = g.media_formats || {};
        return fmts.tinygif?.url || fmts.gif?.url || fmts.mediumgif?.url || "";
      })
      .filter(Boolean);
    res.setHeader("Cache-Control", "s-maxage=300");
    return res.status(200).json({ urls });
  } catch (e) {
    console.error("Tenor v2 error:", e);
    return res.status(500).json({ urls: [] });
  }
}
