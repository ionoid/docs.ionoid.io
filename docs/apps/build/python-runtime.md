# Building a python runtime based on Alpine Linux

This section describes how to create a python runtime app, using one the following method.

1. Add python package and modules to a prepared runtime. 
2. Build a basic runtime and add pyhton package et modules.

> if you have built a basic runtime following the previous section Build Basic Alpine Linux Runtime, use the methode 1, otherwise use  method 2.


## 1. Create runtime app based on Alpine Linux

   - go to pieman directory and run.

```bash

sudo env PROJECT_NAME=python-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh

```
   - The built runtime will be located at **build** directory.

```bash
ls build
python-runtime

```


## 2. Add packages to runtime

 - To add packages to your runtime, go to build directory.

```bash
cd build
```

 - To enter the runtime. Type the following command.

```bash
sudo chroot python-runtime/chroot/ /bin/sh -l
```

> Every command in the runtime is executed as **root**.


   - Setup alpine packages repository.

```bash
setup-apkrepos
```
Sample output:

```
output of the cmd
```



   - Install **python** package.

```bash
apk add --no-cache python3
```
   - Install **pip**, the python package manager.

```bash   
apk add --no-cache py-pip
```
   - Update the python package manger 
 
 ```bash
pip3 install --upgrade pip
 ```
  
  
## 3. Build runtime tarball

   - Once you finish to add all the python modules you need for your runtime, build the tarball.

```bash
sudo tar cvvf alpine-3.9-armhf-python3.tar -C python-runtime/chroot/ .
```

  - To exit from the runtime type **exit**.

```bash 
exit 
```

## 4. Add python modules

   - You can add additional python module to your runtime before building the tarball using python package manager.
   - Here as **example** we are going to install module to control Raspberry Pi GPIO channels. 


```bash 
pip3 install RPi.GPIO
```


