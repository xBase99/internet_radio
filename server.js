const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

// 모든 도메인에서의 접속을 허용하는 CORS 설정
app.use(cors({ origin: '*' }));

// 프록시 라우트
app.get('/proxy', (req, res) => {
    const streamUrl = req.query.url;
    if (!streamUrl) return res.status(400).send('URL이 필요합니다.');

    // 외부 서버로 스트림 요청 후 응답을 그대로 클라이언트에 파이프(Pipe) 전달
    req.pipe(request(streamUrl)).pipe(res);
});

app.listen(3000, () => console.log('Proxy Server running on port 3000'));