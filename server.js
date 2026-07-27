const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const REVIEWS_FILE = path.join(__dirname, 'reviews.json');

// Initialize reviews file if it doesn't exist
if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify([]));
}

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
    // API Route for Reviews
    if (req.url === '/api/reviews') {
        if (req.method === 'GET') {
            fs.readFile(REVIEWS_FILE, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error reading reviews');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            });
            return;
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const newReview = JSON.parse(body);
                    const currentReviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
                    currentReviews.push(newReview);
                    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(currentReviews, null, 2));
                    
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                } catch (err) {
                    res.writeHead(400);
                    res.end('Invalid request data');
                }
            });
            return;
        }
    }

    // Static File Serving
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Access on your network using your computer's local IP address (e.g., http://192.168.1.X:${PORT})`);
});
