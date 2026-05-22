FROM node
WORKDIR /app
copy package*.json ./
RUN npm install

COPY . .
EXPOSE 3600
CMD ["npm", "start"]