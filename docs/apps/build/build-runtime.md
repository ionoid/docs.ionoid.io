# Building a runtime based on Alpine Linux quickly.

To create a runtime based on Alpine Linux ditribution, we are going to use [pieman]() tool, it will automate the process.

See here <a href="https://docs.ionoid.io/#/../apps/build/install-pieman" target="_blank"> How to install pieman</a>.

The procedure to build Alpine Linux runtime is as follows:
 
 1. Build the runtime using pieman tool.
 2. Configure Alpine package manager.
 3. Update Alpine Linux.
 4. Build runtime tarball.

## 1. Building a basic runtime.

 - Go to pieman directory. 

```bash
cd pieman
```
 - Type the following commmand .

```bash 
sudo env PROJECT_NAME="MyRuntime" DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

You will find the result at pieman/build directory.

```bash
ls build/
MyDistro
```

## Add packages to your runtime.

pieman support an option that let us build chroot and include packages.
normaly you can add packages while you are building your chroot runtimes, but seem to not working well.
see the pieman doc for more information.

Here 2nd method.

```
cd build/
sudo chroot MyDistro/chroot/ /bin/sh -l
localhost:/#
```

Configure package repo

```
setup-apkrepos
```
 - Choose a number , 8 for example.

 - Type exit to leave the runtime environment.

```bash 
exit 
```

## Build a tarball.

```bash
sudo tar cvvf alpine-3.9-armhf.tar -C MyRuntime/chroot/ .
```

