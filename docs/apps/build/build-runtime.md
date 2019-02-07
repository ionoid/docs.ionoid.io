# Building a runtime based on Alpine Linux quickly.

To create a runtime based on Alpine Linux ditribution, you can use  a pieman tool, it automate and quick the creation process runtime.

You can find more information about **pieman** here [pieman](https://github.com/tolstoyevsky/pieman)

## Installing  pieman tool.

  - Clone the git repo 

```bash
$ git clone https://github.com/tolstoyevsky/pieman.git
```

 - Install dependencies.

   * On Debian / Ubuntu

```bash 
   $sudo apt-get install dosfstools gnupg pandoc parted python3-pip python3-setuptools python3-yaml qemu-user-static rsync uuid-runtime wget whois
```


   * On Fedora 

```bash 
 $ sudo dnf install dosfstools dpkg expect gpg pandoc parted python3-pip python3-PyYAML python3-setuptools qemu-user-static rsync wget
```

## Building a basic runtime.

```bash
$ cd pieman
[user@pieman]$ sudo env PROJECT_NAME="MyDistro" DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

You will find the result at pieman/build directory.

```bash
[user@pieman]$ ls build/
MyDistro
```

## Add packages to your runtime.

pieman support an option that let us build chroot and include packages.
normaly you can add packages while you are building your chroot runtimes, but seem to not working well.
see the pieman doc for more information.

Here 2nd method.

```
[user@pieman ] $ cd build/
[user@build ]$ sudo chroot MyDistro/chroot/ /bin/sh -l
localhost:/#
```

Configure package repo

```
localhost:/# setup-apkrepos
```
 - Choose a number , 8 for example.

 - Add a package , Node.js for example.

```
localhost:/# apk add --no-cacche nodejs
```

ctrl + d to exit .


## Build a tarball.

```bash
[user@build ]$ sudo tar cvvf alpine-3.9-armhf-nodejs.tar -C MyDistro/chroot/ .
```

