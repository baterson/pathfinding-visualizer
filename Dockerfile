# Используйте официальный образ Node.js
FROM node:latest

# Установите рабочий каталог
WORKDIR /app

# Копирование файлов проекта
COPY . .

# Установка зависимостей и сборка проекта
RUN npm install
RUN npm run build

# Открытие порта 3000
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "prod"]
