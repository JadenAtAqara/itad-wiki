FROM nginx:1.25.2-alpine

WORKDIR /usr/share/nginx/html

COPY --chown=nginx:nginx ./build/ ./

EXPOSE 80
