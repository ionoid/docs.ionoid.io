# Building a python runtime based on Alpine Linux

To create a python runtime app, we are going to build a basic runtime based on Alpine Linux  then add python package
and python modules using .


## 1. Create runtime app based on Alpine Linux

To build the runtime we are going to use [pieman tool](https://github.com/tolstoyevsky/pieman), see here [how to install it](../apps/build/build-runtime#installing--pieman-tool).

   - go to pieman directory and run.

```bash

[user@pieman]$ sudo env PROJECT_NAME=python-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh

```
   - The built runtime will be located at **build** directory.

```bash
[user@pieman]$ ls build
python-runtime

```


## 2. Add packages to runtime


```bash
[user@pieman]$ cd build
[user@build]$ sudo chroot python-runtime/chroot/ /bin/sh -l
```

   - Setup alpine packages repository.

```bash
localhost:/# setup-apkrepos
```
   - Install **python** package.

```bash
localhost:/# apk add --no-cache python3
```
   - Install **pip**, the python package manager.

```bash   
localhost:/# apk add --no-cache py-pip
```
   - Update the python package manger 
 
 ```bash
 localhost:/# pip3 install --upgrade pip
 ```
  
  
## 3. Build runtime tarball

   - Once you finish to add all the python modules you need for your runtime, build the tarball.

```bash
[user@build ]$ sudo tar cvvf alpine-3.9-armhf-python3.tar -C python-runtime/chroot/ .
```

## 4. Add python modules

   - You can add additional python module to your runtime before building the tarball using python package manager.
   - Here as **example** we are going to install module to control Raspberry Pi GPIO channels. 


```bash 
localhost:/# pip3 install RPi.GPIO
```


