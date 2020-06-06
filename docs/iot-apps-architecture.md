# IoT App Architecture

Ionoid.io IoT Apps are apps that are self contained with all their metadata
included and dependencies.

Installed apps are located on device storage at:
```
/data/apps/store/
```

For every application, there will be a corresponding directory:
```
/data/apps/store/appname
```

All files corresponding to an App are located under its path. This make
it easy to stop, **disable** then to completely remove applications.

## Overview

### IoT Apps

[Ionoid.io](https://ionoid.io/) supports multiple IoT App formats:

- Static binaries without library or other filesystem dependencies.
If you are deploying [Static
Binaries](https://en.wikipedia.org/wiki/Static_build) then please keep
reading this document.


- Archive
[tarball](https://en.wikipedia.org/wiki/Tar_(computing) or
[zip](https://en.wikipedia.org/wiki/Zip_(file_format)) apps.
If you are deplying Archive apps then please keep reading this document.


- Modern [docker](https://docker.com) containers **in progress - still
under development**.
If you are deploying [docker container](https://docker.com) apps then
please go directly to this link [docker Apps](#docker-apps)


- Universal Linux Apps [Ubuntu Snaps](https://snapcraft.io/) **in progress - still under development**.
If you are deploying Universal Linux Apps that are [Ubuntu
Snaps](https://snapcraft.io) then please do directly to this link [Snap
Apps](#snap-apps)

### App YAML Format

Each App is described using The App yaml format. The App yaml is
a simple manifest to describe how the app should work, it is fully
described in the `app.yaml` file, and only works with apps that
are static binaries or archive apps.

Docker apps and Snaps do not need the `app.yaml` file, they already
contain their own app manifest and are auto handled withing their
appropriate agents.
Visit this link for [docker Apps](#docker-apps) or this one for
[Snap Apps](#snap-apps).


The `app.yaml` file should be present in the root directory of an
archive file. Every App must have its corresponding `app.yaml` file.
For static binaries with no dependencies, an `app.yaml` file will be
auto-generated and used to define how the App should run.


The `app.yaml` content is (lines starting with `#` are comments and have no futher semantics):


```yaml
# Name of APP must be Alphanumeric and can contain the following
# special characters "_", "." and "-".
# Minimum 2 characters, up to 64 characters.
name: appname

# Version of App
version: 1.0

# Description of App
description: My App

# List of Applications inside the same IoT App, the final IoT
# App can include one app entry or several apps.
apps:
  hello-world:
    # Environment Vars for Hello World Optional
    environment:
      A: "ABC"

    # Environment Files that contains Vars for App Optional
    environmentfiles:
      - "/etc/hello-world-environment1"
      - "/etc/hello-world-environment2"

    # Optional command to be executed before the main app.
    # Can be used to setup environment.
    start-command: /bin/echo "starting hello-world"

    # Main executable app
    command: /bin/hello-world

    # Optional command to be executed after the main app finishes
    # Can be used to clean up state.
    stop-command: /bin/echo "hello-world stopped"

    # Daemon Command type takes one of these values:
    # * simple:     the process configured with command
    #               is the main process of the service.
    #               This is the default value if daemon is
    #               not set.
    # * forking:    it is expected that the process configured
    #               with command will call fork() as part
    #               of its start-up
    # * oneshot:    it is expected that the process configured
    #               with command will exit or terminate
    #
    # For more details check systemd service documentation.
    daemon: simple | forking | oneshot

    # Starting from newer versions, to have the app run with
    # root privileges you have set it to true
    privileged: true

volumes:
  # Volumes and mounts to be made accessible inside the application.
  #
  # Volumes support two types of mount 'rbind' and 'norbind':
  #   * rbind: perform a recursive bind mount of the volume.
  #   * norbind: perform a non-recusive bind mount.
  #
  # Volumes support different options:
  #   * rw: perform a regular writable bind mount (unless source is read-only).
  #   * ro: perform a read-only bind mount.
  #
  - src=filesystem_path:dst=app_path:type=rbind:options=rw
  - src=filesystem_path:dst=app_path:type=norbind:options=ro

  # /dev, /proc and /sys are already mounted inside the app
  # no need to mount them again.

  # Mounting etc configuration inside the app:
  - src=/etc:dst=/etc,type=rbind,options=ro

  # If you want to make the root-filesystem available then the
  # following volume mount is the safest instruction.
  - src=/:dst=/:type=norbind,options=ro

# Health check is a special command to do health checking on
# your one or multiple apps
# still under development
health-check:
  command:        /bin/health-check
```

The `apps` field may contain several entries if you want to launch several IoT
Apps together, distribute them together, or share the running
environment. However we would recommend to always have one command per
App.

The `health-check` field is a special directive that may allow you to do
health checks on your running apps. Right now it is **in progress - still under
development**.

So for a first example the [Hello World IoT App Example:](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

The content of the `app.yaml` file would be:
```yaml
name: hello-world
version: 1.0
apps:
  hello-world:
    command: /bin/hello-world
```

### App Persist Data

If you want to persist your data on the device and share it with other
applications and the rest of the system, then this can be easily done by
writing to the `/shared/$myappname` directory volume. Every application has by
default the `/shared/$myappname` volume mounted and available inside its
filesystem.

From the application point of view:
```bash
/shared/$myappname
```

From the rest of the system point of view and where you will find your data:
```bash
/data/apps/shared/$myappname
```

The `/shared/$myappname` directory is **world readable and accessible**
to the system. If you write secret files there, then make sure to set the
appropriate access permissions, especially if your device is used by non-trusted
third parties.


The `/shared/$myappaname` directory is owned by:
```
User: ionoid-app - means all applications running with that User ID can write to it.
Group: ionoid-app  - means all applications running with that Group ID can write to this directory and share data.
```

Volumes and mounts are the preferred mechanism to persist data on the
device by applications and share it with others.

## Static Binaries

Static binaries are apps without libraries or other filesystem
dependencies. Please visit [wikipedia Static
Binaries](https://en.wikipedia.org/wiki/Static_build) link to read more
about it.

Building static binaries differs from one language and environment to another, the following documentation will try to help you get started
with it.

The target OS here is of course `Linux`.

### Golang Static Binaries

Before we start with our steps on how to produce static binaries from
Golang sources, let's see some variables and environments that we have to
set, this will allows us to really produce statically linked binaries:

- `CGO_ENABLED=0` Instruct compiler to disable CGO and statically link C
bindings.

- `GOOS=linux` Our target Operating System is Linux.

- `GOARCH=$arch` Our target board architecure. If in doubts please visit
our [Supported boards
Table](https://docs.ionoid.io/#/../NewProject/newProject?id=supported-boards-and-operating-systems-table).
Current supported values for `$arch` are `amd64`, `arm` or `arm64`.

- `GOARM=$version` If the target board architecture is `arm` then you have
to set the `GOARM` or the `machine variable`. Current supported values
are `6` or `7`. For a detailed explanation please visit the official
[Golang ARM Wiki](https://github.com/golang/go/wiki/GoArm).

Now to build Golang static binaries; let's use one of these build methods:

- ARMv6

```bash
env CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=6 \
  go build -tags 'osusergo netgo' -ldflags '-extldflags "-static"' main.go
```


- ARMv7

```bash
env CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=7 \
  go build -tags 'osusergo netgo' -ldflags '-extldflags "-static"' main.go
```


- amd64

```bash
env CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
  go build -tags 'osusergo netgo' -ldflags '-extldflags "-static"' main.go
```

### More Static Binaries

We are going to add more static binaries support for other languages, it is under
development.

### Deploy Static Binaries Using Ionoid.io

When deploying static binaries with [Ionoid.io](https://ionoid.io/), there is no need
to put it inside docker or write an `app.yaml` file for it. If your
application has no external dependencies on either files or other
applications, just upload it to the internet and point Ionoid.io
to its deployment URL.

An `app.yaml` file will be auto-generated on the fly at the devices
level using the following format:
```yaml
name: $myappname
version: $unixtimestamp
apps:
  $myappname:
    command: /bin/$myappname
```

Example of a generated `app.yaml` of a `hello-world ARMv6` version.

The complete source file and binaries of that hello-world App are
located here:
https://github.com/ionoid-io-projects/apps/tree/master/hello-world

Auto-generated `app.yaml` of the hello-world example:
```yaml
name: hello-world
version: 1583693787
apps:
  hello-world:
    command:  /bin/hello-world
```

```
hello-world: is the the last resource file from the URL path.
             In this example the URL is
             'https://github.apps.ionoid.net/hello-world/arm6/build/bin/hello-world'
             and the last part makes the App which is 'hello-world'.

version: is the Unix timestamp in UTC (Coordinated Universal Time).
```


To deploy your static binaries, upload them to the internet, and point the
deployment URL to the right one.

For more examples please visit our hosted sample Apps here: [Ionoid.io
Sample Apps](https://github.apps.ionoid.net/)

![Deploy Static Binary](/steps/projects-and-devices/app-deployment.png)

**Notes: More robust deployment methods are being developped, they will be added soon.**

## Archive Apps

Archive Apps are apps compressed files in
[tar](https://en.wikipedia.org/wiki/Tar_(computing)) or
[zip](https://en.wikipedia.org/wiki/Zip_(file_format)) formats.


Archive Apps are composed of the following files:
```
* app.yaml      : App Basic information encoded in a Yaml file
* meta/         : Meta directory that contains extra App metadata (Optional).
* bin/          : Binary directory where the App may reside.
* ...           : Rest of the App file system and other dependencies files.
```

Example of a hello world App:
[IoT App Golang Hello World](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

The content of the `app.yaml` file would be:
```
name: hello-world
version: 1.0
apps:
  hello-world:
    command: /bin/hello-world
```

### Build Archive Apps

These steps describe how we built our previous example [Hello World IoT App](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

- Create and enter the App directory `hello-world`:

```bash
mkdir hello-world
cd hello-world
```

- Populate the App directory with `app.yaml` and executable files

Content of hello-world directory should be:
```
hello-world:/
  ./app.yaml
  ./bin/
    hello-world

```

In the above example the app hello-world filesystem contains the
`app.yaml` file

- Tar archive file:

To generate the App tar archive follow the example.

Assuming you are building for ARMv7 use `armv7` if you are building for
ARMv6 or amd64 then you can use corresponding arch. This is not
mandatory, just best practice to be able to identify deployed tarball
files.


```bash
cd hello-world
tar -cvf ../hello-world-armv7-v0.2.tar *
```

The `hello-world-armv7-v0.2.tar` is our final App that can be deployed
to our IoT Devices.


- Or to generate the App zip archive

**Under development, will be supported soon.**

## Docker Apps

[Ionoid.io](https://ionoid.io/) supports [docker](https://docker.com) containers and apps.

**This is still under development and will be released soon.**

## Snap Apps

[Ionoid.io](https://ionoid.io/) supports the Universal Linux Apps format
that is known as [Ubuntu Snap](https://snapcraft.io/) apps. These apps
are supported only on [Ubuntu Core](https://ubuntu.com/core) Operating
System.

[Ubuntu Core](https://ubuntu.com/core) has 10 years security updates provided by [Canonical](https://canonical.com)

**This is still under development and will be released soon.**

## Building a Python Runtime Based on Alpine Linux

This section describes how to create a python runtime, using one of the following method:

- [Add-python-package-and-modules-to-a-prepared-runtime](#add-python-package-and-modules-to-a-prepared-runtime)
- [Build-python-runtime-from-scratch](#build-python-runtime-from-scratch)

> if you have built a basic runtime following the previous section **Build Basic Alpine Linux Runtime**, use the method 1, otherwise use  method 2.

### Add Python Package and Modules to a Prepared Runtime

  - Open a terminal and create a directory for python runtime here named **python-runtime**.

```bash
mkdir python-runtime
```
  - Extract the built runtime prepared in the previous section **alpine-3.9-armhf.tar** in a directory called **python-runtime** using the following command.

```bash
sudo tar -xvf alpine-3.9-armhf.tar -C python-runtime/
```
  - Run the following command to enter the runtime.

```bash
sudo chroot python-runtime/chroot/ /bin/sh -l
```

> We use **apk** command to add packages to the runtime, APK stands for Alpine Linux package manager.
> - To install a package the syntax is :
>```bash
>apk add package-name
>```

  - Add python package to the runtime.

> Every command in the runtime is executed as **root**.

```bash
apk add --no-cache python3
```
  - Install pip, the python package manager.

```
apk add --no-cache py-pip
```

 - To exit from the runtime type **exit**.

```bash
exit
```
  - Build the python runtime tarball using the following command.

```bash
sudo tar cvvf python3-alpine-armhf.tar -C python-runtime/chroot/ .
```

### Build Python Runtime From Scratch

#### Create basic runtime based on Alpine Linux

- Open a terminal and change directory into pieman directory.

```bash
cd pieman
```

- Run the following command to build the runtime.

```bash

sudo env PROJECT_NAME=python-runtime DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh

```
- The built runtime will be located at **build** directory.

```bash
ls build/
```

Sample output:
```bash
python-runtime

```
#### Add packages to runtime

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

 - To exit from the runtime type **exit**.

```bash
exit
```


#### Build python runtime tarball.

- Once you finish to add all the python modules you need for your runtime, build the python runtime tarball using the following command.

```bash
sudo tar cvvf python3-alpine-armhf.tar -C python-runtime/chroot/ .
```

### Add Python Modules

   - You can add additional python module to your runtime before building the tarball using python package manager.
   - Here as **example** we are going to install module to control Raspberry Pi GPIO channels.


```bash
pip3 install RPi.GPIO
```


## Building a Node.js runtime based on Alpine Linux

This section describes how to create a Node.js runtime , using one of the following method:

- [Add-Node.js-package-to-a-prepared-runtime](#add-node-js-package-and-modules-to-a-prepared-runtime)
- [Build Node.js runtime from scratch](#build-node-js-runtime-from-scratch)

> if you have built a basic runtime following the previous section **Build Basic Alpine Linux Runtime**, use the method 1, otherwise use  method 2.

### Add Node.js Package and Modules to a Prepared Runtime

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

### Build Node.js Runtime From Scratch

#### Create basic runtime  based on Alpine Linux

- Open a terminal and change directory into pieman directory.

```bash
cd pieman
```

- Run the following command to build the runtime.

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

#### Add packages to Node.js runtime

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

#### Build Node.js runtime tarball

- Once you finish to add all the Node.js modules you need for your runtime, build the tarball.

```bash
sudo tar cvvf alpine-3.9-armhf-nodejs.tar -C nodejs-runtime/chroot/ .
```

- exit to leave the runtime.

```bash
exit
```

### Add Node.js Modules

- You can add additional python module to your runtime before building the tarball using Node.js package manager.
- Here as example we are going to install **bootstrap** framework.

```bash
npm install   bootstrap
```

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
