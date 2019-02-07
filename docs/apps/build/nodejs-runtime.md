# Building a Node.js runtime based on Alpine Linux

To create a nodejs runtime , we are going to build a basic runitme based on Alpine Linux  then add nodejs package
and nodejs modules.


## 1. Create runtime app based on Alpine Linux.

To build the runtime we are going to use [pieman tool](https://github.com/tolstoyevsky/pieman), see here [how to install it](../apps/build/build-runtime?id=installing--pieman-tool).

   - Go to pieman directory and run.


```bash
[user@pieman]$ sudo env PROJECT_NAME=nodejs-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

   - The built chroot will be located at **build** directory.

```bash
[user@pieman]$ ls build
nodejs-runtime
```

## 2. Add packages to Node.js runtime.


```bash
[user@pieman]$ cd build
[user@build]$ sudo chroot nodejs-runtime/chroot/ /bin/sh -l
```

   - Setup alpine packages repository.

```bash
localhost:/# setup-apkrepos
```

   - Install **Node.js** package. 

```bash
localhost:/# apk add --no-cache nodejs 
```

 - Install **npm** the Node.js package manager.

```bash 
localhost:/# apk add --no-cache npm  
```

## 3. Build Node.js runtime tarball.

   - Once you finish to add all the Node.js modules you need for your runtime, build the tarball.

```bash
[user@build ]$ sudo tar cvvf alpine-3.9-armhf-nodejs.tar -C nodejs-runtime/chroot/ .
```

## 4. Add nodejs modules.

   - You can add additional python module to your runtime before building the tarball using Node.js package manager.
   - Here as example we are going to install module . 

```bash
localhost:/# npm install  
```


