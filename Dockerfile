FROM node

RUN mkdir /docs ; echo "You forgot to mount docs/ here. Run <code> docker run -p3000:3000 --mount &quot;type=bind,source=$(pwd)/docs/,target=/docs&quot;  docsify</code> from the repository"  > /docs/index.html
WORKDIR /docsify
RUN npm install docsify-cli -g

EXPOSE 3000

CMD ["/usr/local/bin/docsify", "serve", "/docs"]
