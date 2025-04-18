# syntax=docker/dockerfile:1
FROM node:18-alpine AS builder

WORKDIR /app

# Argumentos que recibirán valores del package.json (u otros)
ARG MONOLITE_BASE_URL
ARG MONOLITE_LICENSE_KEY

# Variables de entorno dentro del contenedor
ENV NEXT_PUBLIC_MONOLITE_BASE_URL=$MONOLITE_BASE_URL
ENV NEXT_PUBLIC_MONOLITE_LICENSE_KEY=$MONOLITE_LICENSE_KEY
ENV PORT=9020

# Copiar package.json y package-lock.json
COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN rm -rf .next
RUN npm run build

EXPOSE 9020

CMD ["npm", "start"]
