import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import CharacterForm from "./layout/CharacterForm";
import PrivacyPolicy from "./layout/PrivacyPolicy";
import { Home } from "./layout/Home";

function App() {
  return (
    // 1. アプリ全体を <BrowserRouter> で囲む
    <BrowserRouter>
      <div>
        {/* 2. ナビゲーションリンクの作成 */}
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              gap: "20px",
            }}
          >
            <li>
              {/* NavLink を使用してリンクを作成 */}
              <NavLink
                to="/"
                // アクティブなリンクにスタイルを適用する方法
                style={({ isActive }) => ({
                  color: isActive ? "red" : "blue",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                ホーム
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "blue",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                プライバシーポリシー
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* 3. <Routes> と <Route> でルーティングを設定 */}
        <Routes>
          {/* path="/" の時に <Home /> を表示 */}
          <Route path="/" element={<Home />} />

          {/* path="/form" の時に <CharacterForm /> を表示 */}
          <Route path="/form" element={<CharacterForm />} />

          {/* path="/privacy" の時に <PrivacyPolicy /> を表示 */}
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* * は上記以外のパスにアクセスされた場合のフォールバック（例：404ページ） */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
