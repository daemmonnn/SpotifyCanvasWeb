import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Import the canvas service functions
import { getCanvases } from './services/spotifyCanvasService.js';
import { getToken } from './services/spotifyAuthService.js';

// Set SP_DC from environment
if (!process.env.SP_DC) {
  console.warn('WARNING: SP_DC environment variable not set. API requests will fail.');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Spotify Canvas API Server is running' });
});

// Canvas endpoint
app.get('/api/canvas', async (req, res) => {
  try {
    const trackId = req.query.trackId || req.headers['x-track-id'];
    const spDc = req.headers['x-sp-dc'] || process.env.SP_DC;

    if (!trackId) {
      return res.status(400).json({ 
        error: 'Missing trackId parameter or X-Track-Id header' 
      });
    }

    if (!spDc) {
      return res.status(401).json({ 
        error: 'Missing authentication. Provide SP_DC via X-SP-DC header or environment variable' 
      });
    }

    // Temporarily set the SP_DC for this request
    const originalSpDc = process.env.SP_DC;
    process.env.SP_DC = spDc;

    try {
      // Convert track ID to URI if needed
      let trackUri = trackId;
      if (!trackId.startsWith('spotify:track:')) {
        trackUri = `spotify:track:${trackId}`;
      }

      const canvasData = await getCanvases(trackUri);

      if (!canvasData) {
        return res.status(404).json({ 
          error: 'No canvas data found for this track' 
        });
      }

      res.json({ data: canvasData });
    } finally {
      // Restore original SP_DC
      if (originalSpDc) {
        process.env.SP_DC = originalSpDc;
      } else {
        delete process.env.SP_DC;
      }
    }
  } catch (error) {
    console.error('Error fetching canvas:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch canvas data',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Token endpoint for testing
app.get('/api/token', async (req, res) => {
  try {
    const spDc = req.headers['x-sp-dc'] || process.env.SP_DC;

    if (!spDc) {
      return res.status(401).json({ 
        error: 'Missing authentication. Provide SP_DC via X-SP-DC header or environment variable' 
      });
    }

    const originalSpDc = process.env.SP_DC;
    process.env.SP_DC = spDc;

    try {
      const token = await getToken();
      res.json({ accessToken: token });
    } finally {
      if (originalSpDc) {
        process.env.SP_DC = originalSpDc;
      } else {
        delete process.env.SP_DC;
      }
    }
  } catch (error) {
    console.error('Error getting token:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to get access token' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /api/canvas?trackId=<trackId>',
      'GET /api/token'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Spotify Canvas API Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
