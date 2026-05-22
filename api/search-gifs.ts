export default async function handler(req: any, res: any) {
  const q = (req.query.q as string) || "";
  if (!q.trim()) return res.status(400).json({ urls: [] });

  try {
    const r = await fetch(
      `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(q)}&key=LIVDSRZULELA&client_key=podium_app&limit=18&media_filter=tinygif`
    );
    const d = await r.json();
    const urls = (d.results || [])
      .map((g: any) => g.media_formats?.tinygif?.url || g.media_formats?.gif?.url || "")
      .filter(Boolean);
    res.setHeader("Cache-Control", "s-maxage=300");
    return res.status(200).json({ urls });
  } catch (e) {
    return res.status(500).json({ urls: [] });
  }
}
