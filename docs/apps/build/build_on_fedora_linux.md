

# Create armhf chroot on x86_64 using Fedora.

Since there is no **qemu-debootstrap** package on Fedora, and debootstrap behave differently,
we need to proceed in an other way.

## 1. Installing packages
- qemu-user-static
- debootstrap

```bash
su -
Password:
dnf install debootstrap qemu-user-static
```

## 2. Create armhf chroot

```bash
mkdir armhf-chroot
debootstrap  --foreign --no-check-gpg --arch=armhf stretch armhf-chroot  http://ftp.debian.org/debian
```
- Once debootstrap finish, we need to copy  **qemu-arm-static** to chroot directory.

```bash
cp /usr/bin/qemu-arm-static armhf-chroot/usr/bin/
```

- Now chroot into the system.

```bash
chroot armhf-chroot/
```

- Define PATH variable.

```bash 

echo "export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" >> /root/.bashrc
source /root/.bashrc

```


- Launch debootstrap second stage.

```bash
./debootstrap/debootstrap --second-stage
```

- Do a system update

```bash

apt-get update

````

- Install the extra packages you need inside the chroot, eg. Python or mosquitto:

```bash 

apt-get install mosquitto mosquitto-clients python3 python3-pip

```

- Delete the cache sources lists to reduce size.

```bash 

apt-get clean
rm /var/lib/apt/lists/*

```

## 3. Create a tarball 

- Log out form chroot using **exit**

- Create a tarball using **tar** 

```bash
tar -cvvlf armhf-chroot.tar -C armhf-chroot/ .
```

<!-- <ul class="pagination">
	<li class="button ">
	  <a class="disabled" href="https://docs.ionoid.io/#/../apps/README">Prev</a>
	</li>

<div class="divider" />

 <li class="button">
	  <a href="https://docs.ionoid.io/#/../apps/build/build_on_debian_linux">Next</a>
 </li>
</ul> 

---

<ul class="doclink">
  <li><a href="https://docs.ionoid.io/#/../apps/build/build_on_debian_linux.md">Build IoT Apps on Debian/Ubuntu</a></li>
  <li><a href="https://docs.ionoid.io/#/../apps/build/nginx.md">Build nginx</a></li>
</ul> -->

---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI).
