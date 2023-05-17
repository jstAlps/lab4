import http.server
import socketserver

PORT = 8080

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def do_GET(self):
        if self.path == "/api":
            # Обробка команди /api
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"Hello from the API!")
        else:
            # Залишаємо обробку GET запитів за замовчуванням
            super().do_GET()

# Створюємо об'єкт HTTP сервера
with socketserver.TCPServer(("", PORT), MyHttpRequestHandler) as httpd:
    print(f"Сервер запущено на порту {PORT}")
    print(f"Перейдіть за адресою http://localhost:{PORT}/")
    httpd.serve_forever()
