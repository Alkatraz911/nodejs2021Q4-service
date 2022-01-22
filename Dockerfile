FROM node:16.13.1-alpine
WORKDIR /user/app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE ${PORT}
CMD ["npm","run", "dev"]