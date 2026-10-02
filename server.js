const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 및 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public 폴더 정적 파일 호스팅 (index.html, css, js 등)
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// 메인 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).send('페이지를 찾을 수 없습니다.');
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('서버 내부 오류:', err.stack);
  res.status(500).send('서버 내부 오류가 발생했습니다.');
});

app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`Radio Player Server Running at http://localhost:${PORT}`);
  console.log(`===========================================`);
});