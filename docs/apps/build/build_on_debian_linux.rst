==============================================
Build IoT Apps on Debian/Ubuntu Linux Systems
==============================================



Create armhf chroot on x86_64
=============================

If you are using an x86 machine you can use qemu-debootstrap
from the qemu-user-static package to debootstrap an armhf chroot on a x86_64 machine.

Install ``debootstrap`` and ``qemu-user-static`` on your machine::

  sudo apt-get install debootstrap qemu-user-static
 
Run the following command to create an armhf chroot:
::
  #  --arch=armhf  : target architecture
  #  stretch       : What Debian release to use (stretch = stable, buster = testing, sid = unstable)
  #  armhf-chroot/ : Path to create the filesystem for the chroot in
  # http://ftp.de.debian.org : Debian mirror to install from       
  sudo qemu-debootstrap --arch=armhf stretch armhf-chroot/  http://ftp.de.debian.org
  
When debootstrap successful returned "chroot" into the system::

  sudo chroot armhf-chroot
  

Install the extra packages you need inside the chroot, eg. Python or mosquitto::

  apt-get update
  apt-get install mosquitto mosquitto-clients python3 python3-pip
  
To reduce the overall size run ``apt-get clean`` and delete the cache sources lists before logout::

  apt-get clean
  rm /var/lib/apt/lists/*

Log out from the chroot using ``exit`` and create a tarball from the directory::

  sudo tar -cvf armhf-chroot.tar armhf-chroot/
  
