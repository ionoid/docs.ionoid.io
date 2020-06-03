FROM node:lts

RUN apt update && apt install -y linkchecker busybox
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
