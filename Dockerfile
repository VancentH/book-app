FROM node:alpine as builder

# -p, -path: 指定的路徑建立目錄
RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN npm install

CMD ["npm", "start"]