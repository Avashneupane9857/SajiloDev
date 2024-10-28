FROM node:18-alpine
WORKDIR /SajiloDev
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 5173
CMD ["npm","run","dev"]



