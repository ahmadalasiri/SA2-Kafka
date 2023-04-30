FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
ENV MONGO_URI=mongodb://mongodb-container:27017/my-database
CMD ["npm", "start"]