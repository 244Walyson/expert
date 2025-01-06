FROM node:18 AS build
WORKDIR /app
COPY . .

ENV VITE_API_URL=https://api.expert.waly.dev.br

RUN npm install && npm run build --dev

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
