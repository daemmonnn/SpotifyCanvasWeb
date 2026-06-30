# 🎵 Spotify Canvas Downloader

An enhanced interactive web application that lets you download Spotify Canvas videos - the looping visual backgrounds that appear behind songs on Spotify mobile.

![Spotify](https://img.shields.io/badge/Spotify-API-green?logo=spotify)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node-%3E%3D14-brightgreen)

## ✨ Features

- **🎬 Download Canvas Videos** - Save Spotify Canvas videos directly to your device
- **🔐 Flexible Authentication** - Support for SP_DC cookie or .env file
- **💾 Persistent Storage** - Authentication saved in browser localStorage
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🎨 Modern UI** - Beautiful dark theme inspired by Spotify's design
- **⚡ Performance Optimized** - Lazy loading, efficient rendering, and minimal bundle size
- **📋 Copy URL** - Quick copy canvas video URLs to clipboard
- **🔄 Real-time Feedback** - Loading states and status notifications

## 🚀 Quick Start

### Prerequisites

- Node.js 14 or higher
- npm or yarn
- A Spotify account (to get SP_DC cookie)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/daemmonnn/SpotifyCanvasWeb.git
   cd SpotifyCanvasWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment (optional)**
   
   Create a `.env` file in the root directory:
   ```env
   SP_DC=your_sp_dc_cookie_here
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   node server.js
   ```
   or
   ```bash
   npm start
   ```

5. **Open the web app**
   
   Navigate to `http://localhost:3000` in your browser, or open `spotify-canvas-app.html` directly.

## 🔑 Getting Your SP_DC Cookie

1. Open Spotify Web Player in your browser: https://open.spotify.com
2. Log in to your account
3. Open Developer Tools (F12)
4. Go to the **Application** tab (Chrome) or **Storage** tab (Firefox)
5. Expand **Cookies** → `https://open.spotify.com`
6. Find the cookie named `sp_dc` and copy its value
7. Paste it into the authentication panel

## 📖 Usage

### Via Web Interface

1. **Authenticate**: Enter your SP_DC cookie or paste your .env file content
2. **Search**: Enter a Spotify Track ID or URI
   - Track ID example: `3OHfY25tqY28d16oZczHc8`
   - Track URI example: `spotify:track:3OHfY25tqY28d16oZczHc8`
3. **Download**: Click the Download button to save the canvas video

### Via API

```bash
# Get canvas data for a track
curl -X GET "http://localhost:3000/api/canvas?trackId=3OHfY25tqY28d16oZczHc8" \
  -H "X-SP-DC: your_sp_dc_cookie"
```

## 🛠️ API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check endpoint |
| `/api/canvas` | GET | Fetch canvas data for a track |
| `/api/token` | GET | Get Spotify access token |

### Query Parameters

- `trackId` - Spotify track ID or URI
- `X-SP-DC` (header) - Authentication cookie

## 📁 Project Structure

```
Spotify-Canvas-API/
├── server.js                 # Express server
├── spotify-canvas-app.html   # Interactive web interface
├── package.json              # Dependencies & scripts
├── .env                      # Environment variables (create this)
├── services/
│   ├── spotifyAuthService.js    # Authentication service
│   └── spotifyCanvasService.js  # Canvas fetching service
├── controllers/
│   └── canvasController.js   # Request handlers
├── routes/
│   └── canvasRoutes.js       # API routes
└── proto/
    ├── _canvas.proto         # Protobuf schema
    └── _canvas_pb.cjs        # Generated protobuf code
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SP_DC` | Spotify authentication cookie | Required |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## 🔒 Security Notes

- **Never share your SP_DC cookie** - It provides access to your Spotify account
- Keep your `.env` file private and never commit it to version control
- The application stores authentication in browser localStorage for convenience
- All API requests are made through your local server

## 🎯 Performance Optimizations

- **Lazy Loading**: Images use `loading="lazy"` attribute
- **Video Preload**: Videos use `preload="metadata"` to reduce initial load
- **CSS Variables**: Efficient theming with CSS custom properties
- **Minimal Dependencies**: Lightweight frontend with no external JS frameworks
- **Optimized Rendering**: Efficient DOM updates and event delegation
- **Responsive Images**: Properly sized images for different viewports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an unofficial project and is not affiliated with or endorsed by Spotify AB. This tool is for educational purposes only. Please respect Spotify's Terms of Service and copyright laws when using canvas videos.

## 🙏 Acknowledgments

- Thanks to the reverse engineering community for documenting Spotify's internal APIs
- Inspired by various Spotify canvas extraction tools

## 📞 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/Paxsenix0/Spotify-Canvas-API/issues) page
2. Create a new issue with detailed information about your problem
3. Include error messages and steps to reproduce

---

Made with ❤️ for music lovers everywhere
Credists PaxSenix0
