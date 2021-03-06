# Build Linux IoT and Edge archive Apps

Ionoid.io IoT and Edge Linux apps are archive files that bundle the application,
libraries, files and other dependencies. Using some of
[Linux Containers Technology](
https://en.wikipedia.org/wiki/List_of_Linux_containers) to implement file system
isolation, devices are able to run multiple applications isolated from one
another.

This section describes how to build archive Linux apps that can run on any
Linux device. To be able to deploy the archive with Ionoid.io and run it on
devices, the archive must then include the [app YAML file](
https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) inside the root
directory `/` of the archive.

## Linux Containers Concept

[Linux containers](https://en.wikipedia.org/wiki/List_of_Linux_containe) are a
modern technology that packages the application and all its dependencies so the
applications can run on any Linux system. Ionoid.io supports Linux containers
by using the widely supported classic archive files format; this is motivated by
the fact that IoT and Edge devices should have a long life time, and by using
archive files for application packages, Ionoid.io ensures archive apps will
continue to work in the future, as all the necessary tools to process them are
standard open source tools.

At run-time when the archive file is [deployed on devices](
https://docs.ionoid.io/docs/deploy-iot-apps.html), the [app YAML file](
https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) that is on the root
directory `/` of the archive will be used to define how the application will run.

Ionoid.io makes minimal use of Linux containers technologies by just using file
system isolation, where each deployed application will have its own correspondig
directory, see previous chapter [IoT Apps](
https://docs.ionoid.io/docs/iot-apps.html).

## Docker buildx Archive Apps

[Docker](https://docker.com/) offers the necessary tooling to build and export
archive apps. The following steps demonstrates on how to pull a
[Node.js docker](https://hub.docker.com/_/node) image for `ARMv7` and export
it into an archive app, that is then deployed directly using [Ionoid.io
deployment](https://docs.ionoid.io/docs/deploy-iot-apps.html).

### Prerequisite

<Content :page-key="getPageKey($site.pages, '/docs/_extract-docker-image-requirements.html')" />

### Steps to extract and export docker images: Node.js example

::: tip
Run the following commands with `sudo` whenever it is necessary.
:::

1. Pull [Node.js for ARMv7](
https://hub.docker.com/_/node?tab=tags&page=1&name=alpine) image based on
`Alpine Linux`:

```bash
docker pull --platform linux/arm/v7 node:current-alpine
```

The `docker images` command should return the line of the `node` repository:

```
REPOSITORY    TAG               IMAGE ID        CREATED         SIZE
node          current-alpine    013139600021    19 hours ago    107MB
```

2. Extract the docker image layers, the following command will extract the
   image layers into the directory `node-armv7/`:

```bash
docker save node | undocker --no-whiteouts -d -i -o node-armv7 node:current-alpine
```

Where `node:current-alpine` is the `repository:tag` pair of desired image.

3. Create the `app.yaml` file inside the `node-armv7` directory with the
   following content:

```yaml
name: node-armv7
version: v14.10.0
apps:
  node-armv7:
    command: /usr/local/bin/node --version
```

Where `/usr/local/bin/node` is the node executable binary path inside the
`node-armv7` directory (make sure it is the correct path).

4. Tar compress application and produce the app archive from parent directory of
   `node-armv7`:

```bash
sudo tar --numeric-owner --create --auto-compress \
        --xattrs --file node-v14.10.0-armv7.tar.gz \
        --directory node-armv7 --transform='s,^./,,' .
```

The final size of app archive in this case is:

```
node-v14.10.0-armv7.tar.gz  36M
```

A copy of the built node.js archive can be found [here](
https://raw.githubusercontent.com/ionoid/docs-examples/master/archives/node-14.10.1-alpine3.11-armv7.tar.gz)

5. Upload and deploy your application by following documentation at
[deploy IoT apps documentation](https://docs.ionoid.io/docs/deploy-iot-apps.html)

6. Later you are able to update your application using the [Delta Update
Workflow](https://docs.ionoid.io/docs/deploy-iot-apps.html#_2-delta-updates-workflow)

::: tip Example of a delta update of node.js from v14.10 to v14.10.1
Taking a real example of [Node.js for Alpine](
https://hub.docker.com/_/node?tab=tags&page=1&name=alpine) and using docker
container tags: [node:14.10-alpine3.11](
https://hub.docker.com/layers/node/library/node/14.10-alpine3.11/images/sha256-3d1bdb8c2d026003273dd229d6f1ac2252be4d6fb5676a15f987f7e761e254d2?context=explore)
and [node:14.10.1-alpine3.11](
https://hub.docker.com/layers/node/library/node/14.10.1-alpine3.11/images/sha256-fb2e7a5e9511fba4ab2ebcd165d7fbeec0e032e03685b93ce8869787d26f4ea9?context=explore)
for `ARMv7` platform, the following performs an update of node.js but also
dependencies and Alpine packages:

```bash
# Lines starting with `#` are comments.

# Pull the containers, here we assume you build yours.
docker pull --platform linux/arm/v7 node:14.10-alpine3.11
docker pull --platform linux/arm/v7 node:14.10.1-alpine3.11

# Check the images
docker images

# Save the container image to a directory
docker save node | undocker --no-whiteouts -d -i \
        -o node-14.10-alpine3.11-armv7 node:14.10-alpine3.11
docker save node | undocker --no-whiteouts -d -i \
        -o node-14.10.1-alpine3.11-armv7 node:14.10.1-alpine3.11

# Add the app.yaml file
cp app.yaml node-14.10-alpine3.11-armv7/
cp app.yaml node-14.10.1-alpine3.11-armv7/


# Tar compress directories to an App archive
sudo tar --numeric-owner --create --auto-compress --xattrs --xattrs-include=* \
        --file node-14.10-alpine3.11-armv7.tar.gz \
        --directory node-14.10-alpine3.11-armv7/ --transform='s,^./,,' .
sudo tar --numeric-owner --create --auto-compress --xattrs --xattrs-include=* \
        --file node-14.10.1-alpine3.11-armv7.tar.gz \
        --directory node-14.10.1-alpine3.11-armv7/ --transform='s,^./,,' .

# Check app archive size
node-14.10-alpine3.11-armv7.tar.gz 37M
node-14.10.1-alpine3.11-armv7.tar.gz 38M


# Produce a delta update of Node from 14.10 to 14.10-1
# (this will update dependecies and some modules too)
# Add -f to force ovewrite previous app.xdelta if any.
xdelta3 -e -s node-14.10-alpine3.11-armv7.tar.gz node-14.10.1-alpine3.11-armv7.tar.gz \
        app.xdelta

# Check app.xdelta size
app.xdelta 11M
```

The produced `app.xdelta` size is `11M` which represents `70%` reduction of the
update size. Here we performed an `Node.js`, its modules and other packages
update.

Usually an incremental update of only some files of the app will result in few
kilobytes or even less.

To update your application from a specified version to any other version
directly, please follow the [Delta Update
workflow](https://docs.ionoid.io/docs/deploy-iot-apps.html#_2-delta-updates-workflow).
:::

## The `mkiot` (make IoT) Tool

To generate the app archive we can use [mkiot](https://github.com/ionoid/mkiot),
which uses [debootstrap](https://wiki.debian.org/Debootstrap) and other tools to
build an app archive.

The `mkiot` tool allows us to:

1. Install a Linux distribution file system that will be used as a build image
for the application,

2. Build the application,

3. Copy application files and other dependencies into image,

4. Copy the [app.yaml file](
https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) into the image,

5. Generate an artifact from the image.


Please follow [mkiot installation](https://github.com/ionoid/mkiot#install)
documentation and install it on your Linux working station.

### Linux IoT Build Environments

This section describes how to generate IoT and Edge apps build environments
using `mkiot`.

Building an IoT app can somehow be challening, usually we suggest to start with
a full build enviroment, then try to optimize later using [mkiot multi-stage
builds](https://github.com/ionoid/mkiot#multi-stage-builds) to reduce the final
image size.

Ionoid.io supports [Debian](https://www.debian.org) and [Alpine Linux](
https://alpinelinux.org/) images, more will be added soon.

Assuming [mkiot](https://github.com/ionoid/mkiot/) is installed and ready, let's
start building our environments and apps.

#### Debian Environment

From the [mkiot examples](https://github.com/ionoid/mkiot#examples) we use the
[Debian minimal buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/debian/buildspec.yaml):

```bash
sudo mkiot build examples/debian/buildspec.yaml
```

This will generate an artifact in `tar archive format` at:

```bash
./output/artifacts/debian-buster_armhf_2020-06-11.tar
```

If you want to generate a Debian environment with development tools and
packages, you can use the [Debian devtools buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/devtools/debian/buster/buildspec-devtools-armhf.yaml)
example and edit it to add more commands or packages to be installed in
`commands`:

```bash
sudo mkiot build examples/devtools/debian/buster/buildspec-devtools-armhf.yaml
```

This will generate an artifact in `tar archive format` at:

```bash
./output/artifacts/devtools_debian-buster_armhf.tar
```

#### Alpine Environment

Under development, will be added soon.

### Node.js Apps

[Node.js](https://nodejs.org) is an open source, cross-platform, JavaScript
runtime environment that executes JavaScript code outside a web browser. See
[Wikipedia](https://en.wikipedia.org/wiki/Node.js) for more details.

We can build a Node.js environment using one of the supported distributions as a
base image for the file system.

The following examples demonstrate how to use `mkiot` to build a Node.js
environment that is targeted to `ARMv7` architectures, as Node.js only supports
`ARMv7` and above, for further documentation please see [the Node.js Download
page](https://nodejs.org/en/download/).

#### Node.js Debian Based Image

To have a Node.js environment from [upstream Node.js
package](
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
on a minimal Debian file system, run `mkiot` with the following [Node.js minimal
Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/node.js/debian/buster/buildspec-node.js-minimal-debian-armhf.yaml):

```bash
sudo mkiot build examples/node.js/debian/buster/buildspec-node.js-minimal-debian-armhf.yaml
```

To have Node.js installed as a binary on a Debian file system, with extra
packages like `devtools` , `build essential` or `yarn`, run `mkiot` build with
the following [Node.js devtools Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/node.js/14/buster/buildspec-node.js-devtools-debian-armv7l.yaml):

```bash
sudo mkiot build examples/node.js/14/buster/buildspec-node.js-devtools-debian-armv7l.yaml
```

Produced artifacts will be inside `./output/artifacts/` in the current working directory.

To change the environment in order to update which packages or denpendecies
should be installed or removed, please copy and edit the `buildspec.yaml` files.
Make sure to copy in `script` file that is used during build to the right
location too, according to [mkiot script command](
https://github.com/ionoid/mkiot#build-spec-commands-documentation).

#### Node.js Alpine Based Image

To have a Node.js environment from upsteam Alpine Linux, run `mkiot` with the
following [Node.js minimal Alpine Linux buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/node.js/alpine/buildspec-node.js_minimal_alpine_armhf.yaml)

```bash
sudo mkiot build examples/node.js/alpine/buildspec-node.js_minimal_alpine_armhf.yaml
```

To have Node.js installed with some development tools to build npm packages,
run `mkiot` build with the following [Node.js build-base Alpine buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/node.js/alpine/buildspec-node.js_build-base_alpine_armhf.yaml):

```bash
sudo mkiot build examples/node.js/alpine/buildspec-node.js_build-base_alpine_armhf.yaml
```

Produced artifacts will be inside `./output/artifacts/` in the current working
directory.

To change the environment in order to update which packages or denpendecies
should be installed or removed, please copy and edit the `buildspec.yaml` files.
Make sure to copy in `script` file that is used during build to the right
location too, according to [mkiot script command](
https://github.com/ionoid/mkiot#build-spec-commands-documentation).

### Node.js Apps Examples

#### Node.js Debian based apps

* Hello-world app can be built using:

  - [hello-world.js app](https://github.com/ionoid/mkiot/blob/master/examples/apps/hello-world/node.js/hello-world.js)
  - [app.yaml file](https://github.com/ionoid/mkiot/blob/master/examples/apps/hello-world/node.js/app.yaml)
  - [hello world buildspec files](https://github.com/ionoid/mkiot/tree/master/examples/apps/hello-world/node.js/debian/buster)

  - In `buildspec.yaml` file, we add to the `artifacts` block the `files` block
    to copy the `app.yaml` and the app python file to the image:

    ```yaml
       files:
           # copy app.yaml to root artifact /app.yaml
           - app.yaml /app.yaml

           # copy my application
           - hello-world.js  /usr/bin/hello-world.js
    ```

  - Then build this example from `mkiot` source:

    ```bash
       cd examples/apps/hello-world/node.js/
       sudo mkiot build debian/buster/hello-world_node-14.0_minimal_debian_armhf.yaml
    ```

  - This will generate the final artifact inside `./output/artifact/`.

* [Node-RED](https://nodered.org/) - Low-code programming for event-driven
  applications

  - Node-RED is a programming tool for wiring together hardware devices, APIs
    and online services in new and interesting ways.

  - Node-RED artifacts can be built using the following [build Node-RED](
    https://github.com/ionoid/mkiot/tree/master/examples/apps/node-red)
    documentation.

* More applications will be added soon.

#### Node.js Alpine based apps

* More applications will be added soon.

### Python Apps

[Python](https://www.python.org/) is an interpreted, high-level, general-purpose
programming language. See [Wikipedia](
https://en.wikipedia.org/wiki/Python_(programming_language)) for more details.

#### Python Debian Based Image

The following examples demonstrate how to use `mkiot` to build a Python
environment that is targeted to `ARM` architectures.

To have a `python2` environment on minimal Debian, run `mkiot` build with the
[Python2 on minimal Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python2-minimal-debian-armhf.yaml)
file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python2-minimal-debian-armhf.yaml
```

To have a `python3` environment on minimal Debian, run `mkiot` build with the
[Python3 on minimal Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python3-minimal-debian-armhf.yaml)
file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python3-minimal-debian-armhf.yaml
```

To have a `python3` environment on Debian with some development packages, run
`mkiot` build with the [Python3 on devtools Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python3-devtools-debian-armhf.yaml)
file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python3-devtools-debian-armhf.yaml
```

#### Python Alpine Based Image

The following examples demonstrate how to use `mkiot` to build a Python
environment based on Alpine Linux that is targeted to `ARM` architectures.

To have a `python2` environment on minimal Alpine Linux, run `mkiot` build with
the [Python2 on minimal Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python2-minimal-debian-armhf.yaml) file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python2-minimal-debian-armhf.yaml
```

To have a `python3` environment on minimal Debian, run `mkiot` build with the
[Python3 on minimal Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python3-minimal-debian-armhf.yaml)
file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python3-minimal-debian-armhf.yaml
```

To have a `python3` environment on Debian with some development packages, run
`mkiot` build with the [Python3 on devtools Debian buildspec.yaml](
https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python3-devtools-debian-armhf.yaml)
file:

### Python Apps Examples

#### Python Debian based app

* Hello-world app can be built using:
  - [hello-world.py app](https://github.com/ionoid/mkiot/blob/master/examples/apps/hello-world/python/hello-world.py)
  - [app.yaml file](https://github.com/ionoid/mkiot/blob/master/examples/apps/hello-world/python/app.yaml)
  - [hello world buildspec files](https://github.com/ionoid/mkiot/tree/master/examples/apps/hello-world/python/debian/buster)

  - In `buildspec.yaml` file, we add to the `artifacts` block the `files` block
    to copy the `app.yaml` and the app python file to the image:
    ```yaml
       files:
           # copy app.yaml to root artifact /app.yaml
           - app.yaml /app.yaml

           # copy my application
           - hello-world.py  /usr/bin/hello-world.py
    ```

  - Then build this example from `mkiot` source:
    ```bash
       cd examples/apps/hello-world/python/
       sudo mkiot build debian/buster/hello-world_python3_minimal_debian_armhf.yaml
    ```

  - This will generate the final artifact inside `./output/artifact/`.

* Tensor flow app

#### Python Alpine based app

Will be added soon.

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
