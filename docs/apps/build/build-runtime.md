# Building a runtime based on Alpine Linux quickly.

To create a runtime based on Alpine Linux ditribution, we are going to use [pieman]() tool, it will automate the process.

See here <a href="https://docs.ionoid.io/#/../apps/build/install-pieman" target="_blank"> How to install pieman</a>.

The procedure to build Alpine Linux runtime is as follows:
 
 1. Build the runtime using pieman tool.
 2. Configure Alpine package manager.
 3. Build runtime tarball.

## 1. Building a basic runtime.

 - Go to pieman directory. 

```bash
cd pieman
```
 - To build the runtime type the following commmand .

```bash 
sudo env PROJECT_NAME="MyRuntime" DEVICE=rpi-3-b OS=alpine-3.9-armhf CREATE_ONLY_CHROOT=true ./pieman.sh
```

 - The runtime is created for a specific device, use **DEVICE** environnment variable to adapt the runtime to your device,  see the table bellow.


| Device Full name            | Device Short name |
| :-------------              | :----------:      |
| Raspberry Pi Model B and B+ | rpi-b             |
| Raspberry Pi 2 Model B      | rpi-2-b           |
| Raspberry Pi 3 Model B      | rpi-3-b           |
| Raspberry Pi Zero           | rpi-zero          |


> To change the name of the runtime use **PROJECT_NAME** variable.



 - You will find the built runtime  at **build** directory.

```bash
ls build/
MyDistro
```

## 2. Configure Alpine Linux package manager.

 To be able to add packges to our runtime, we have to configure package manager.

 - Enter the runtime , using the following command.

```bash
sudo chroot build/MyDistro/chroot/ /bin/sh -l

```

>  Every command inside the runtime is executed as root.


 - To configure the pakages repository type the following command.


```bash 
setup-apkrepos

```

Sample output :

```bash
output
```


 - Choose a number , 8 for example.

 - To exit from the runtime environement type **exit**.

```bash 
exit 
```

## 3. Build a tarball.

```bash
sudo tar cvvf alpine-3.9-armhf.tar -C MyRuntime/chroot/ .
```

