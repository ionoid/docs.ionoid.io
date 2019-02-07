# Building a python runtime based on Alpine Linux

To create a python runtime , we are going to build a basic chroot environement based on Alpine Linux  then add python package
and python modules using .


## 1. Create chroot environment based on Alpine Linux

To build the chroot environement we are going to use [pieman tool](https://github.com/tolstoyevsky/pieman), see here [how to install it](build-runtime.md#installing--pieman-tool).

   - go to pieman directory and run.

```bash

[user@pieman]$ sudo env PROJECT_NAME=python-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh

```
   - The built chroot will be located at **build** directory.

```bash
[user@pieman]$ ls build
python-runtime

```


## 2. Add packages to chroot runtime


```bash

[user@pieman]$ cd build
[user@build]$ sudo chroot python-runtime/chroot/ /bin/sh -l

```

   - Setup alpine packages repository.

```bash

localhost:/# setup-apkrepos

```
   - Install **python** and **pip** packages.

```bash

localhost:/# apk add --no-cache python3

localhost:/# apk add --no-cache py-pip

```


## 3. Add python modules

   - Add python module using python package manager, here we install **flask** framework.

```bash 

localhost:/# pip3 install --upgrade pip
localhost:/# pip3 install flask

```


## 4. Build runtime tarball

   - Once you finish to add all the python modules you need for your runtime, build the tarball.

```bash

[user@build ]$ sudo tar cvvf alpine-3.9-armhf-python3.tar -C python-runtime/chroot/ .

```
