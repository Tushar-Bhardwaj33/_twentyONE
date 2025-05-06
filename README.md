Smart AI powered meeting Assistant

## Running with Docker

This project provides Docker support for both the backend (Python/FastAPI) and frontend (TypeScript/Vite) services. The setup uses Docker Compose to orchestrate both services for local development or deployment.

### Requirements
- Docker and Docker Compose installed on your system
- The backend requires Python 3.11 (handled by the Dockerfile)
- The frontend uses Node.js v22.13.1 (handled by the Dockerfile)

### Environment Variables
- The backend service loads environment variables from `./Backend/.env`. Ensure this file exists and is configured as needed for your environment.

### Build and Run Instructions
1. Ensure your directory structure matches the provided layout, with `Backend` and `Frontend` directories at the root.
2. From the project root, run:
   ```sh
   docker compose up --build
   ```
   This will build and start both the backend and frontend services.

### Ports
- **Backend (FastAPI):** Exposed on port `8000`
- **Frontend (Vite preview):** Exposed on port `4173`

### Special Configuration
- The backend Docker image installs system dependencies: `poppler-utils`, `tesseract-ocr`, and `libmagic-dev` for document and image processing.
- The backend runs as a non-root user for security.
- The frontend is built and served using Vite's preview server.

### Notes
- If you do not have a `.env` file for the backend, comment out the `env_file` line in the `docker-compose.yml`.
- The frontend service depends on the backend and will wait for it to be available before starting.
