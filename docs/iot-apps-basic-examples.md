# Make Linux IoT and Edge App

Ionoid.io IoT Platform supports simple IoT Apps that can run on any Linux and
integrated with Ionoid.io.

Ionoid.io IoT Apps take [Snapcraft](https://docs.snapcraft.io/) the universal
app store for Linux as a reference, and build on top of it.


## General Concept

In this page you will find a basic view of IoT Apps and how to deploy them.

Ionoid IoT Apps are apps that are self-contained with all their metadata
included.


## Tools/Steps to Generate an App

- To be able to create a compatible App you will need pieman to generate
the environment for the App, e.g. Alpine Linux.

- Change root (chroot) into the generated environment, this basically ables you
 to execute commands inside the environment to install dependency like Python
or Node.js packages.

- Copy your App into the chroot environment.

- Create a YAML file that contains your app's configuration needed by our OS
manager to execute your app, YAML file needs to be copied into the chroot
environment at the root level (/).

Follow the next section for a step-by-step tutorial to generate your first app.

## Prepare Alpine Linux Environment

This section describes how to set up your work environment to build runtime for
your IoT apps. You must use Linux.

For building under macOS or Windows see Docker section.

::: tip
We are using [Pieman](https://github.com/tolstoyevsky/pieman), a script for
creating OS images for single-board computers such as Raspberry Pi.
:::

The procedure to Prepare Alpine Linux Environment is as follow:

- [Installing dependencies](#installing-dependencies)
- [Clone Pieman git repository](#clone-pieman-git-repository)
- [Installing Pieman required python modules](#install-the-pieman-required-python-modules)

::: tip
[Alpine Linux](https://alpinelinux.org/) is a security-oriented, lightweight
Linux distribution based on [musl libc](https://www.musl-libc.org/) and
[busybox](https://www.busybox.net/).
:::

### Preparing Your Build Environment on GNU/Linux

To prepare your build environment several prerequisites for working with pieman
must be installed, obtain the following tools if you haven't done so already.


#### Installing dependencies

- To install dependencies on Debian/Ubuntu distribution open a terminal and run
the following command:

```bash
sudo apt-get install dosfstools gnupg pandoc parted python3-pip \
  python3-setuptools python3-yaml qemu-user-static rsync uuid-runtime wget whois
```

- To install dependencies on Fedora distribution open a terminal run and the
following command:

```bash
sudo dnf install dosfstools dpkg expect gpg pandoc parted python3-pip \
  python3-PyYAML python3-setuptools qemu-user-static rsync wget
```

#### Clone Pieman git repository

- To get Pieman run the following command:

```bash
git clone https://github.com/tolstoyevsky/pieman.git
```

#### Install the Pieman required python modules

- To install Pieman required python modules run the following command:

```bash
sudo pip3 install pieman
```

## Building a Basic Runtime Based on Alpine Linux Quickly

This section describes how to build a runtime based on Alpine Linux distribution,
to be able to run IoT apps the Ionoid.io IoT way.

The procedure to build Alpine Linux runtime is as follows:

- [Build a runtime](#build-a-basic-runtime)
- [Configure Alpine package manager](#configure-alpine-linux-package-manager)
- Build runtime tarball

### Build a Basic Runtime

- Open a terminal and change directory into **pieman** directory:

```bash
cd pieman
```
- To build the runtime run the following command:

```bash
sudo env PROJECT_NAME="MyRuntime" DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

- The runtime is created for a specific device, use **DEVICE** environment
variable to adapt the runtime to your device, see the table below:

| Device Full name            | Device Short name |
| :-------------------------: | :---------------: |
| Raspberry Pi Model B and B+ | rpi-b             |
| Raspberry Pi 2 Model B      | rpi-2-b           |
| Raspberry Pi 3 Model B      | rpi-3-b           |
| Raspberry Pi Zero           | rpi-zero          |

::: tip
To change the name of the runtime use **PROJECT_NAME** variable.
:::

- You will find the built runtime  at **build** directory:

```bash
ls build/
```

Sample output will be as we set on pieman command `PROJECT_NAME="MyRuntime"`:

```
MyRuntime
```

### Configure Alpine Linux package manager

To be able to add packages to our runtime, we have to configure the package
manager.

- Enter the runtime, using the following command:

```bash
sudo chroot build/MyDistro/chroot/ /bin/sh -l
```

::: tip
Every command inside the runtime is executed as root.
:::

- Run the following command to setup the Alpine Linux packages repository:

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
f) Detect and add fastest mirror from the above list
e) Edit /etc/apk/repositories with a text editor

Enter mirror number (1-44) or URL to add (or r/f/e/done) [f]:
```

- Choose a number, say, 8 for example.

- To exit from the runtime environment type:

```bash
exit
```

## Conclusion

Congratulation, now you have an exploitable environment, in the next section,
we will create our first basic python app.

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
