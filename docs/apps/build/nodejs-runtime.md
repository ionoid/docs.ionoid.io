# Building a nodejs runtime based on Alpine Linux

To create a nodejs runtime , we are going to build a basic chroot environement based on Alpine Linux  then add nodejs package
and nodejs modules.


## 1. Create chroot environment based on Alpine Linux

To build the chroot environement we are going to use [pieman tool](https://github.com/tolstoyevsky/pieman), see here [how to install it](build-runtime.md#installing--pieman-tool).

   - Go to pieman directory and run.


```bash
[user@pieman]$ sudo env PROJECT_NAME=nodejs-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh

```

   - The built chroot will be located at **build** directory.

```bash

[user@pieman]$ ls build
nodejs-runtime

```

## 2. Add packages to chroot runtime


```bash

[user@pieman]$ cd build
[user@build]$ sudo chroot nodejs-runtime/chroot/ /bin/sh -l

```

   - Setup alpine packages repository.

```bash

localhost:/# setup-apkrepos

```

   - Install **nodejs** and **npm** packages.


```bash

localhost:/# apk add --no-cache nodejs 

localhost:/# apk add --no-cache npm  

```




## 3. Add nodejs modules

   - Add nodejs module using nodejs package manager, here we install **express** framework.

```bash

localhost:/# npm install express --save 

```


## 4. Build runtime tarball

   - Once you finish to add all the nodejs modules you need for your runtime, build the tarball.

```bash

[user@build ]$ sudo tar cvvf alpine-3.9-armhf-nodejs.tar -C nodejs-runtime/chroot/ .

```