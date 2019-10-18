# Ionoid IoT Documentation.

This is Ionoid IoT documentation repo, the source for http://docs.ionoid.io


## 1. Editing Documentation

- Clone the repo locally

```bash 
$ git clone git@github.com:opendevices/docs.ionoid.io.git
```

- Create your own local branch

- Start editing documentation in [docs](./docs)

- Commit then Push or open a Pull Request.


## 2. Deploying documentation with Docker.

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
