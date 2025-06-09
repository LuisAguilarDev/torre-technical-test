# Etapa 1: build de Vite
FROM node:22 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: server estático usando nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Opcional: reemplazar configuración de nginx si lo necesitas
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]