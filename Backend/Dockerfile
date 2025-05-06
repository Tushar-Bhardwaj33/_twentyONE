# syntax=docker/dockerfile:1

FROM python:3.11-slim AS base

# Install system dependencies required for the app and for pip packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        poppler-utils \
        tesseract-ocr \
        libmagic-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create a non-root user
RUN useradd -m appuser

# Builder stage: install dependencies in a venv
FROM base AS builder

WORKDIR /app

# Copy only requirements.txt first for better caching
COPY --link requirements.txt ./

# Set up pip cache dir
ENV PIP_CACHE_DIR=/root/.cache/pip

# Create venv and install dependencies
RUN --mount=type=cache,target=$PIP_CACHE_DIR \
    python -m venv .venv && \
    .venv/bin/pip install -r requirements.txt

# Copy the rest of the application code
COPY --link app/ ./app/
COPY --link src/ ./src/
COPY --link setup.sh ./
COPY --link main.py ./

# Final stage: minimal image with only runtime deps and code
FROM base AS final

WORKDIR /app

# Copy virtual environment from builder
COPY --from=builder /app/.venv /app/.venv

# Copy application code from builder
COPY --from=builder /app/app ./app
COPY --from=builder /app/src ./src
COPY --from=builder /app/setup.sh ./
COPY --from=builder /app/main.py ./

# Set environment so venv is used
ENV PATH="/app/.venv/bin:$PATH"

# Switch to non-root user
USER appuser

# Expose port (FastAPI default is 8000)
EXPOSE 8000

# Entrypoint (adjust if your main.py is not the FastAPI entrypoint)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]