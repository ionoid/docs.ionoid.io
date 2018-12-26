# docs.ionoid.io
Ionoid IoT User Documentation


## Test the doc locally 
To test the doc locally just clone the repo and launch docsify.

```bash 
$ git clone git@github.com:opendevices/docs.ionoid.io.git

$ cd docs.ionoid.io/

$ docsify serve docs
```

Open your browser at http://localhost:3000

## Testing the doc using Docker.


```bash
$ docker build -t docsify  .
$ docker run docsify
```

- Run docker image.
```bash 
$ docker run -ti -p 3000:3000 docsify /bin/bash
```
```bash 
$ root@82a2b0056a16:# docsify serve .
```

- Open the browser at http://localhost:3000

