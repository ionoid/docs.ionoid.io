

# Build IoT Apps on Debian/Ubuntu Linux Systems


## Create armhf chroot on x86_64

If you are using an x86 machine you can use qemu-debootstrap
from the qemu-user-static package to debootstrap an armhf chroot on a x86_64 machine.

Install ``debootstrap`` and ``qemu-user-static`` on your machine::

```bash
  sudo apt-get install debootstrap qemu-user-static 
```  
 
Run the following command to create an armhf chroot:

```bash
  #  --arch=armhf  : target architecture
  #  stretch       : What Debian release to use (stretch = stable, buster = testing, sid = unstable)
  #  armhf-chroot/ : Path to create the filesystem for the chroot in
  # http://ftp.de.debian.org : Debian mirror to install from       

sudo qemu-debootstrap --arch=armhf stretch armhf-chroot/  http://ftp.de.debian.org
```

When debootstrap successful returned "chroot" into the system::

```bash
  sudo chroot armhf-chroot
```


Install the extra packages you need inside the chroot, eg. Python or mosquitto::

```bash
  apt-get update
  apt-get install mosquitto mosquitto-clients python3 python3-pip
````

To reduce the overall size run ``apt-get clean`` and delete the cache sources lists before logout::

```bash
  apt-get clean
  rm /var/lib/apt/lists/*
```

Log out from the chroot using ``exit`` and create a tarball from the directory::

```bash
  sudo tar -cvf armhf-chroot.tar armhf-chroot/
```

<!-- <ul class="pagination">
	<li class="button ">
	  <a class="disabled" href="https://docs.ionoid.io/#/../apps/build/build_on_fedora_linux">Prev</a>
	</li>

<div class="divider" />

 <li class="button">
	  <a href="https://docs.ionoid.io/#/../apps/build/nginx">Next</a>
 </li>
</ul> 

---

<ul class="doclink">
  <li><a href="https://docs.ionoid.io/#/../apps/build/build_on_fedora_linux.md">Build IoT Apps on Fedora</a></li>
  <li><a href="https://docs.ionoid.io/#/../apps/build/nginx.md">Build nginx</a></li>
</ul> -->

---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtNTAzMTEwMTc5NDc2LTM2ODgxY2VmYTljNjM2NTNmZmVjYTEzY2Q4NTgyZTljYzI3MzhiZGRlODkzNTE3NTE3ODk5ZmFjNjYzOGRjZTM).
