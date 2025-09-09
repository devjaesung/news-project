export default async function handler(req, res) {
  const clientId = import.meta.env.NAVER_CLIENT_ID || "";
  const clientSecret = import.meta.env.NAVER_CLIENT_SECRET || "";

  const {
    query = "",
    display = "20",
    start = "1",
    sort = "sim",
  } = req.query || {};
  const endpoint =
    `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(
      query
    )}` + `&display=${display}&start=${start}&sort=${sort}`;

  try {
    const resp = await fetch(endpoint, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
    });

    const text = await resp.text();
    res.status(resp.status);
    res.setHeader(
      "content-type",
      resp.headers.get("content-type") || "application/json; charset=utf-8"
    );
    res.send(text);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Proxy request failed", error: String(err) });
  }
}
