# Building a basic runtime based on Alpine Linux quickly.

We are going to build a runtime based on Alpine Linux distro, to be able to run IoT apps the Ionoid IoT way.

> To make easy runtime building we need to install tools and prepare build environement to automate the process.
> See here <a href="https://docs.ionoid.io/#/../apps/build/install-pieman" target="_blank"> How to Prepare Build Environment</a>.

The procedure to build Alpine Linux runtime is as follows:
 
 1. Build a runtime.
 2. Configure Alpine package manager.
 3. Build runtime tarball.

## 1. Building a basic runtime.

 - Change directory into **pieman** directory. 

```bash
cd pieman
```
 - To build the runtime type the following commmand .

```bash 
sudo env PROJECT_NAME="MyRuntime" DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

 - The runtime is created for a specific device, use **DEVICE** environnment variable to adapt the runtime to your device,  see the table bellow.


| Device Full name            | Device Short name |
| :-------------              | :----------:      |
| Raspberry Pi Model B and B+ | rpi-b             |
| Raspberry Pi 2 Model B      | rpi-2-b           |
| Raspberry Pi 3 Model B      | rpi-3-b           |
| Raspberry Pi Zero           | rpi-zero          |


> To change the name of the runtime use **PROJECT_NAME** variable.



 - You will find the built runtime  at **build** directory.

```bash
ls build/
MyRuntime
```

## 2. Configure Alpine Linux package manager.

 To be able to add packges to our runtime, we have to configure package manager.

 - Enter the runtime , using the following command.

```bash
sudo chroot build/MyDistro/chroot/ /bin/sh -l
```

>  Every command inside the runtime is executed as root.


 - To configure the pakages repository type the following command.


```bash 
setup-apkrepos
```

Sample output :

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


 - Choose a number , 8 for example.

 - To exit from the runtime environement type **exit**.

```bash 
exit 
```

## 3. Build a tarball.

 - To create a tar ball named **alpine-3.9-armhf.tar** for the runtime  **MyRuntime/chroot/** type.

```bash
sudo tar cvvf alpine-3.9-armhf.tar -C build/MyRuntime/chroot/ .
```

