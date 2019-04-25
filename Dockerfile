FROM node

WORKDIR docsify-docker

RUN npm i docsify-cli -g

COPY doc.ionoid.io-master/docs/ .

EXPOSE 300

CMD ["docsify" "serve" "docs"]
