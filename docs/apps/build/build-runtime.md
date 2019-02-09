# Building a runtime based on Alpine Linux quickly.

To create a runtime based on Alpine Linux ditribution, you can use  a pieman tool, it automate and quick the creation process runtime.


## Building a basic runtime.

```bash
cd pieman
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

