FROM harbor.aqaramaster.com/base/nginx:v1.20.2-stable-alpine-nginx-config 

WORKDIR /data/
COPY ./build /data/dist/

USER root
RUN chown -R nginx:nginx /data/
