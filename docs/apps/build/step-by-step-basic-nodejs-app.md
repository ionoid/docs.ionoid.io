## Building a basic nodejs hello world app base on Alpine linux

After [Preparation of an Alpine Linux Environment](/apps/build/step-by-step-basic-environment?id=building-a-basic-runtime-based-on-alpine-linux-quickly) with PROJECT_NAME="BasicNodejsApp" 
execute a chroot as following:

```bash
sudo chroot build/BasicNodejsApp/chroot/ /bin/sh -l
```

To find yourself inside your new environment where we can now install Python

## Install Nodejs

Installing Nodejs

```bash 
apk add --no-cache nodejs
```
  - Install npm, the nodejs package manager.

```
apk add --no-cache npm
```

## Create the Nodejs file of our app

For convention we will save our python source code on /usr/local/bin,
And reference it on its YAML file.

So we start by creating our hello-python app with server.js as the file name

```javascript
const http = require('http');

const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
  console.info('Request Hello world....');
});

server.listen(port);
console.log("Starting nodejs http server");

```

## Creating YAML file

After creating source code of our app it's time to create the YAML file 
corresponding to it and saving it in the root filesystem of our environment 
with app.yaml as the file name

```yaml
name: hello-world-nodejs
version: 0.1
apps:
        hello-world-nodejs:
                command:  /usr/bin/node /usr/local/bin/server.js
```
## Conclution

You have now your environment and inside it you just created a nodejs file on /usr/local/bin
and a YAML file named app.yaml on / 

To finish our app we need to package it by compressing it with a simple tar command as following

```bash
sudo tar cvvf python3-alpine-armhf.tar -C build/BasicNodejsApp/chroot/ .
```

Congratulation for your effort, now all you need is a to host your tar file to give it to your ionoid dashboard
and the rest is magic.