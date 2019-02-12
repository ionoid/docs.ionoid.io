# Building a Node.js runtime based on Alpine Linux

This section describes how to create a Node.js runtime , using one of the following method:

1. Add Node.js package to a prepared runtime.
2. Build Node.js runtime from scratch.

> if you have built a basic runtime following the previous section **Build Basic Alpine Linux Runtime**, use the methode 1, otherwise use  method 2.

## 1. Add Node.js package and modules to a prepared runtime.

 - Open a terminal and create a directory for Node.js runtime here named nodejs-runtime.

```bash
mkdir nodejs-runtime
```
  - Extract the built runtime prepared in the previous section **alpine-3.9-armhf.tar** in a directory called **nodejs-runtime** using the following command. 

```bash
sudo tar -xvf alpine-3.9-armhf.tar -C nodejs-runtime/
```
  - Run the following command to enter the runtime.

```bash
sudo chroot nodejs-runtime/chroot/ /bin/sh -l
```

> We use **apk** command to add packages to the runtime, APK stands for Alpine Linux package manager.
> - To install a package the syntax is :
>```bash
>apk add package-name
>```

  - Add Node.js package to the runtime.

> Every command in the runtime is executed as **root**.

```bash
apk add --no-cache nodejs
```
  - Install npm, the Node.js package manager.

```
apk add --no-cache npm
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

### a. Create basic runtime  based on Alpine Linux.

   - Open a terminal and change directory into pieman directory. 
   
```bash 
cd pieman
```
   
   - Run the following commmand to build the runtime.

```bash
sudo env PROJECT_NAME=nodejs-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

   - The built runtime will be located at **build** directory.

```bash
ls build
```

Sample output:

```
nodejs-runtime
```

### b. Add packages to Node.js runtime.

   - To enter the runtime, run the following command.

> Every command in the runtime is executed as **root**. 

```bash
sudo chroot build/nodejs-runtime/chroot/ /bin/sh -l
```

   - Setup alpine packages repository.

```bash
setup-apkrepos
```
Sample output:

```bash
Available mirrors:
1) dl-cdn.alpinelinux.org
2) nl.alpinelinux.org
3) uk.alpinelinux.org
4) dl-2.alpinelinux.org
5) dl-3.alpinelinux.org
6) dl-4.alpinelinux.org
7) dl-5.alpinelinux.org
8) dl-8.alpinelinux.org
9) mirror.yandex.ru
10) mirrors.gigenet.com
11) mirror1.hs-esslingen.de
12) mirror.leaseweb.com
13) mirror.fit.cvut.cz
14) alpine.mirror.far.fi
15) alpine.mirror.wearetriple.com
...

r) Add random from the above list
f) Detect and add fastest mirror from above list
e) Edit /etc/apk/repositories with text editor

Enter mirror number (1-44) or URL to add (or r/f/e/done) [f]:
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


