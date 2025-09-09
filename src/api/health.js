// import process from "node:process";

export default function handler(req, res) {
  const hasClientId = Boolean(import.meta.env.NAVER_CLIENT_ID);

  const hasClientSecret = Boolean(import.meta.env.NAVER_CLIENT_SECRET);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res
    .status(200)
    .send(JSON.stringify({ ok: true, hasClientId, hasClientSecret }));
}
