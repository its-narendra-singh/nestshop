# backend/Dockerfile

FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g ts-node

# Optional: generate Prisma client
RUN npx prisma generate

CMD ["npm", "run", "start:dev"]