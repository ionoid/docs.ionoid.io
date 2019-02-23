
# Prepare Alpine Linux Environment.

This section describes how to set up your work environment to build runtime for your IoT apps. You must use Linux. 
For building under MacOS or Windows see Docker section. 

> We are using <a href="https://github.com/tolstoyevsky/pieman" target="_blank"> Pieman </a>, a script for creating OS images for single-board computers such as Raspberry Pi.

The procedure to Prepare Alpine Linux Environment is as follow: 

> [Alpine Linux](https://alpinelinux.org/) is a security-oriented, lightweight Linux distribution based on musl libc and busybox.

1. Installing dependencies.
2. Clone Pieman git repository.
3. Installing Pieman required python modules.


## Preparing your build environment on GNU/Linux 

To prepare your build environment several prerequisites for working with pieman must be installed, obtain the following tools if you haven't done so already.


## 1. Installing dependencies 

 - To install dependencies on Debian/Ubuntu distro open a terminal and  run the following commmand. 


```bash 
sudo apt-get install dosfstools gnupg pandoc parted python3-pip python3-setuptools python3-yaml qemu-user-static rsync uuid-runtime wget whois
```


 - To install dependencies on Fedora distro open a terminal run and the following command.


```bash 
sudo dnf install dosfstools dpkg expect gpg pandoc parted python3-pip python3-PyYAML python3-setuptools qemu-user-static rsync wget
```

## 2. Clone Pieman git repository.

 - To get Pieman run the following command.

```bash
git clone https://github.com/tolstoyevsky/pieman.git
```

## 3. Install the pieman required python modules.
 
 - To install Pieman required python modules run the following command.

```bash 
 sudo pip3 install pieman 
```

# Building a basic runtime based on Alpine Linux quickly.

This section describes how to build a runtime based on Alpine Linux distro, to be able to run IoT apps the Ionoid IoT way.

The procedure to build Alpine Linux runtime is as follows:
 
 1. Build a runtime.
 2. Configure Alpine package manager.
 3. Build runtime tarball.

## 1. Building a basic runtime.

 - Open a terminal and change directory into **pieman** directory. 

```bash
cd pieman
```
 - To build the runtime run the following commmand .

```bash 
sudo env PROJECT_NAME="MyRuntime" DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

 - The runtime is created for a specific device, use **DEVICE** environnment variable to adapt the runtime to your device,  see the table bellow.


| Device Full name            | Device Short name |
| :-------------------------: | :---------------: |
| Raspberry Pi Model B and B+ | rpi-b             |
| Raspberry Pi 2 Model B      | rpi-2-b           |
| Raspberry Pi 3 Model B      | rpi-3-b           |
| Raspberry Pi Zero           | rpi-zero          |


> To change the name of the runtime use **PROJECT_NAME** variable.



 - You will find the built runtime  at **build** directory.

```bash
ls build/
```
Sample output will be as we setted on pieman command PROJECT_NAME="MyRuntime":

    MyRuntime

## 2. Configure Alpine Linux package manager.

 To be able to add packges to our runtime, we have to configure package manager.

 - Enter the runtime , using the following command.

```bash
sudo chroot build/MyDistro/chroot/ /bin/sh -l
```

>  Every command inside the runtime is executed as root.


 - Run the following command to setup the Alpine Linux pakages repository.


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

# Conclution

Congratulation, now you have an exploitable environnement, in the next section
we will create our first basic python app.