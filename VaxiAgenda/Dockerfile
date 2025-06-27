# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli @ionic/cli
RUN npm install
RUN npm run build --prod

# Etapa de deploy
FROM nginx:alpine

COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]