FROM node:22-alpine

WORKDIR /app

COPY ./next/package.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY ./next .

CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "start"]
