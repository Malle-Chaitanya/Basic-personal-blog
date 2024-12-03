FROM python:3.12-slim

WORKDIR /reactapp

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run FastAPI ap
CMD ["uvicorn", "main:app","--reload"]
