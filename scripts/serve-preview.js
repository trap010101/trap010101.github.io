// Dependency-free local preview of the actual GitHub Pages files. No build step.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname.split("/").some(part => part.startsWith(".")) || !["GET", "HEAD"].includes(req.method)) { res.writeHead(403).end(); return; }
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    if (req.method === "HEAD") res.end(); else fs.createReadStream(file).pipe(res);
  } catch (_) { res.writeHead(404).end("Not found"); }
}).listen(Number(option("--port", 4173)), option("--host", "127.0.0.1"), () => console.log("NewAnime preview ready"));
