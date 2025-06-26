FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli @ionic/cli
RUN npm install

RUN npm run build

EXPOSE 8100

CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--disable-host-check"]