# Building nginx app for Ionoid IoT Platform.

![nginx](https://github.com/opendevices/iot.doc/blob/master/apps/build/img/nginx.svg)

In this document we are going to see how to build an nginx  app for Ionoid IoT Platform.

**nginx**  is open-source software  web server, can also work as a reverse proxy or load balancer proxy,
mail proxy and HTTP cache.

**License** : BSD-like

**Version** : 1.10.3

[nginx website](https://www.nginx.com/)


## 1. Preparing ngix app environment.

To build an app for Ionoid IoT Platform we need ARM chroot file system, you can download a prepared one at [chroot.tar]( https://storage.cloud.google.com/public.opendevices.io/chroot.tar)
and start at section 3, or follow the section 2 to setup your own.


## 2. Setting up  ARM chroot file system.

   - [Fedora](https://github.com/opendevices/iot.doc/blob/master/apps/build/build_on_fedora_linux.rst)
   - [Debian/ Ubuntu](https://github.com/opendevices/iot.doc/blob/master/apps/build/build_on_debian_linux.rst)
   - Windows.
   - MacOS.



## 3. Installing nginx.

- Chroot into the system

```bash
# chroot armhf-chroot/

```
- Do a system update.

```bash
# apt-get update

```

- Install the nginx software.

```bash
# apt-get install nginx -y

```

- Preparing app.yaml file.

  Using your editor, open a file with the name **nginx.yaml** and write the follwing lines.

```bash
# vi app.yaml
```


```bash
name: nginx
version : 9.x

apps:
	nginx:
		command: usr/sbin/nginx
```


## 4.  Creating tarball.

- Logout from nginx chroot using **exit** .

```bash
# tar -cvf nginx-armhf.tar armhf-chroot/
```

---

