# backend/Dockerfile

FROM node:18

WORKDIR /app

# Install netcat for health checks
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Normalize line endings and make entrypoint executable (fixes Windows CRLF issues)
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

# Expose port
EXPOSE 3000

# Use the entrypoint script via sh to avoid exec path issues
CMD ["sh", "./docker-entrypoint.sh"]