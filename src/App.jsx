import { useEffect, useMemo, useState } from "react";
import "./App.css";

function NewsItem({ item }) {
  const cleanTitle = useMemo(
    () =>
      item.title.replaceAll(/<\/?b>/g, "").replaceAll(
        /&quot;|&apos;|&amp;|&lt;|&gt;/g,
        (m) =>
          ({
            "&quot;": '"',
            "&apos;": "'",
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
          }[m] || m)
      ),
    [item.title]
  );
  const cleanDesc = useMemo(
    () => (item.description || "").replaceAll(/<\/?b>/g, ""),
    [item.description]
  );
  return (
    <li className="news-item">
      <a href={item.link} target="_blank" rel="noreferrer">
        <h3>{cleanTitle}</h3>
      </a>
      <p>{cleanDesc}</p>
      <small>{new Date(item.pubDate).toLocaleString()}</small>
    </li>
  );
}

function App() {
  const [query, setQuery] = useState("AI");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  const fetchNews = async (q) => {
    const search = q?.trim() || "AI";
    if (!search) return;
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(
        `/api/news?query=${encodeURIComponent(search)}&display=20&sort=sim`
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      setError("뉴스를 불러오지 못했습니다.", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  return (
    <div className="news-app">
      <h1>네이버 뉴스 검색</h1>
      <form onSubmit={onSubmit} className="search-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button type="submit" disabled={loading}>
          검색
        </button>
      </form>
      {loading && <p>로딩 중…</p>}
      {error && <p className="error">{error}</p>}
      <ul className="news-list">
        {items.map((it) => (
          <NewsItem key={`${it.link}`} item={it} />
        ))}
      </ul>
    </div>
  );
}

export default App;
