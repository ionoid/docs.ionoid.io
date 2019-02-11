# Building a Node.js runtime based on Alpine Linux

This section describes how to create a Node.js runtime app, using one the following method.

1. Add Node.js package a prepared runtime.
2. Build Node.js runtime from scratch.

> if you have built a basic runtime following the previous section **Build Basic Alpine Linux Runtime**, use the methode 1, otherwise use  method 2.

## 1. Add Node.js package and modules to a prepared runtime.

 - Create a directory for Node.js runtime.

```bash
mkdir nodejs-runtime
```
  - Type the following command to extract  **alpine-3.9-armhf.tar** in a directory called **python-runtime**.

```bash
sudo tar -xvf alpine-3.9-armhf.tar -C nodejs-runtime/
```
  - Type the following command to enter the runtime.

```bash
sudo chroot nodejs-runtime/chroot/ /bin/sh -l
```
  - Add python package to the runtime.

```bash
apk add --no-cache nodejs
```
  - Install npm, the Node.js package manager.

```
apk add --no-cache nmp
```

 - To exit from the runtime type **exit**.

```bash
exit
```

  - Build the tarball.

```bash
sudo tar cvvf nodejs-alpine-armhf.tar -C nodejs-runtime/chroot/ .
```


## 2. Build Node.js runtime from scratch.

### a. Create runtime app based on Alpine Linux.


   - Go to pieman directory and run.


```bash
sudo env PROJECT_NAME=nodejs-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

   - The built chroot will be located at **build** directory.

```bash
ls build
nodejs-runtime
```

### b. Add packages to Node.js runtime.


```bash
cd build
sudo chroot nodejs-runtime/chroot/ /bin/sh -l
```

   - Setup alpine packages repository.

```bash
setup-apkrepos
```

   - Install **Node.js** package. 

```bash
apk add --no-cache nodejs 
```

 - Install **npm** the Node.js package manager.

```bash 
apk add --no-cache npm  
```

### c. Build Node.js runtime tarball.

   - Once you finish to add all the Node.js modules you need for your runtime, build the tarball.

```bash
sudo tar cvvf alpine-3.9-armhf-nodejs.tar -C nodejs-runtime/chroot/ .
```
  
  - exit to leave the runtime.

```bash 
exit 
```

### d. Add nodejs modules.

   - You can add additional python module to your runtime before building the tarball using Node.js package manager.
   - Here as example we are going to install module . 

```bash
npm install  
```


