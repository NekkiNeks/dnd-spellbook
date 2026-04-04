# Этап 1: Сборка
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Компилируем TS в JS (убедись, что в package.json есть скрипт "build": "tsc")
RUN npm run build

# Этап 2: Запуск
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# 1. Копируем скомпилированный JS код
COPY --from=build /app/dist ./dist

# 2. ВАЖНО: Копируем ассеты из исходников прямо в папку dist,
# чтобы путь /app/dist/assets/ существовал внутри контейнера
COPY --from=build /app/assets ./dist/assets

# Если твои CSV лежат внутри src/assets, используй:
# COPY --from=build /app/src/assets ./dist/assets

EXPOSE 3333
CMD ["node", "dist/index.js"]

