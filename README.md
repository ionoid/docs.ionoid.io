# docs.ionoid.io
Ionoid IoT User Documentation

## 1. Clone the documentaiotn repo.

```bash 
$ git clone git@github.com:opendevices/docs.ionoid.io.git
```

## 2. Testing the documentation using Docker.

- Build a docsify docker image and launch it.

```bash
$ docker build -t docsify  .
$ docker run docsify
```

- Run docker image.

```bash 
$ docker run -ti -p 3000:3000 docsify /bin/bash
```
- Launch docsify.

```bash 
$ root@82a2b0056a16:# docsify serve .
```

## 3. Test the documentation locally on your computer.

To test the doc locally you have to install **node-js** and **npm** packages.

- Install **docsify-cli** tool. 

```bash 
npm i docsify-cli -g
```
- launch docsify.

```bash 
$ cd docs.ionoid.io/

$ docsify serve docs
```



Open your browser at http://localhost:3000

