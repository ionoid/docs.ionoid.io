
# Ionoid IoT Apps Format

Ionoid IoT Platform supports simple IoT Apps that can run on any Linux and
integrated with Ionoid.

Ionoid IoT Apps take [Snapcraft](https://docs.snapcraft.io/) the universal
app store for Linux as a reference, and build on top of it.


## Chapters

### 1. Getting Started

This section provides basic view on IoT Apps and how to deploy them.


Ionoid IoT Apps are apps that are self contained with all their metadata
included.

On your IoT Devices, Apps will be installed in directory:
```
/data/apps/store/
```

For every application, a directory will be created like this:
```
/data/apps/store/appname
```


### 2. IoT Apps Format

Ionoid IoT Apps format is really simple it contains some metadata that
defines the application and how it is run. Apps are tarball files in
format of `.tar` or any other format that is supported by Ionoid IoT
Platform.


As an example lets take the current hello world example that is
available here: [IoT Apps Golang Hello
World](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

[Hello World IoT App Example:](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

```
* app.yaml      : App Basic information.

* meta/         : Meta directory that contains extra App metadata (Optional).

* bin/          : Binary directory where the App may reside.

* ...           : Rest of the App file system and other dependencies files.
```

If you are using another supported format, then the `app.yaml` will be
automatically created.


#### 2.1 App.yaml Format

Every App has an **app.yaml** file that contains the basic following
information:

(the `#` beginnig means this line is a comment)


```yaml
# Name of APP must be Alphanumeric and can contain the following
# special characters "_", "." and "-".
# Minimum 2 charactes, up to 64 characters.
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
                        A:      "ABC"

                # Environment Files that contains Vars for App Optional
                environmentfiles:
                        - "/etc/hello-world-environment1"
                        - "/etc/hello-world-environment2"

                # Path to executable App with its arguments
                # relative to the App filesystem
                command:        /bin/hello-world

                # Path to Optional command to stop a daemon.
                stop-command:   /bin/echo "hello-world stopped"

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


# Health check special command to do health checking on your
# one or multiple apps
# NOT SUPPORTED
health-check:
                command:        /bin/health-check
```


The `apps` may contain several entries if you want to launch several IoT
Apps together, distribute them together, or share the running
environment. However we would recommend to always have one command per
App if you do not nead multiple Apps to be grouped together.


**HEALTH CHECK NOT SUPPORTED**

The `health-check` is a special directive that may allow you to do
health checks on your running apps. Right now it is **NOT SUPPORTED**.



So if we go back to our [Hello World IoT App Example:](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

The content of the `app.yaml` file would be:
```
name: hello-world
version: 1.0
apps:
        hello-world:
                command:        /bin/hello-world
```


### 3. Building IoT Apps

If you are using the native and simple format of ionoid IoT Apps, then
you can follow the following guide, otherwise skip to the one that
targets the format that you want.


To generate our [Hello World IoT App](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

```bash
$ cd hello-world
$ ls -a ./*
        ./app.yaml

        ./bin:
        .  ..  hello-world


$ tar -cvf ../hello-world-armv7-v0.2.tar *
```

The `hello-world-armv7-v0.2.tar` is our final App that can be deployed
to our IoT Devices.


#### 3.1 Building Simple Ionoid IoT Apps

We support several platform, please follow the appropriate platform
guide.


* [Build IoT Apps on Debian/Ubuntu Linux](../apps/build/build_on_debian_linux.md)

* [Build IoT Apps on Fedora Linux](../apps/build/build_on_fedora_linux.md)


* [Build IoT Apps on Windows]


* [Build IoT Apps on OSX]



#### 3.2 Build Snapcraft Snaps

TODO: document.


#### 3.3 Build Docker IoT Apps

TODO: document.

<!-- <ul class="pagination">
	<li class="button ">
	  <a class="disabled" href="https://docs.ionoid.io/#">Prev</a>
	</li>

<div class="divider" />

 <li class="button">
	  <a href="https://docs.ionoid.io/#/../apps/build/build_on_fedora_linux">Next</a>
 </li>
</ul> 

---

<ul class="doclink">
  <li><a href="https://docs.ionoid.io/#/../apps/build/build_on_fedora_linux.md">Build IoT Apps on Fedora</a></li>
  <li><a href="https://docs.ionoid.io/#/../apps/build/build_on_debian_linux.md">Build IoT Apps on Debian/Ubuntu</a></li>
  <li><a href="https://docs.ionoid.io/#/../apps/build/nginx.md">Build nginx</a></li>
</ul> -->

---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtNTAzMTEwMTc5NDc2LTM2ODgxY2VmYTljNjM2NTNmZmVjYTEzY2Q4NTgyZTljYzI3MzhiZGRlODkzNTE3NTE3ODk5ZmFjNjYzOGRjZTM).
