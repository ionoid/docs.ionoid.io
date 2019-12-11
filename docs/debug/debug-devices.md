# Debugging and Troubleshooting IoT Devices

To Debug your Device first login into your [Ionoid IoT Account](https://dashboard.ionoid.io/login)
and locate your Device.


## 1. Device Information

Go to your Device details page and lookup for the following information:

* `Status and Last Time Seen`

* `Device Operating System Versions`

* `Device SealOS Manager Version`

* `Device Systemd Version`

* `Device Docker Version`


## 2. Locate Device

### 2.1. Via Dashboard

If you want to troubleshoot your device with `ssh`, then continue
reading this section, otherwise skip to `Connect to Device Via Other ways` section.

If you are on Windows, please install first [Putty
Client](https://www.putty.org/)


Locate Device `Network Interfaces` and `IP Addresses` section
inside the Device Page on Dashboard and note the `IP ADDRESS` that you
will use to `ssh` into Device. Make sure you are on the same network as
the device. You may also try to see the Wi-Fi networks that this device
is connected to, in the `Connected Network Section`.

**The follow is a beta feature not available to all accounts:**
Try to see if you can `ssh` into the Device from the [Ionoid IoT
Dashboad](https://dashboard.ionoid.io/) or use the `Public Device Url` if
available and `ssh` into that `IP Address`.

If you were able to find the device local `IP Address` go to the next
section. Otherwise continue reading next section locate `Via Network Scan`.


### 2.2. Via Network Scan

**TODO**


## 3. Connect to Device


### 3.1. Via SSH Network

Connect to your device via `ssh`.

First locate last known available users to the system. In your device
page 

* Replace `$USER` with a valid user from your Device, usually either `root` or another user that you did create.

* Replace `$IP_ADDRESS_OF_DEVICE` with the IP Address of your device


```bash
ssh $USER@$IP_ADDRESS_OF_DEVICE
```

Provide the `$USER` password and you should be in if everything was
right and if the device is still up and able to handle `ssh`.


### 3.2. Via Other Ways


**TODO**
To connect to your device via Serial connection.



## 4. Troubleshooting IoT Device

Assuming you succefully `logged-in` into your device, information about status, services and Apps can be found using the `systemctl` utility.


### 4.1 Troubleshooting System status

* To get the overall status of the Device:

```bash
sudo systemctl status
```

**Important: if you are logged in as root, no need to prefix commands
with sudo**


### 4.2 Troubleshooting Services and Apps

* To get the list of failed Services on the Device:

```bash
sudo systemctl --failed
```

* To get the status of Services or Apps, use the `status` operation:
Example get status of `systemd-journald` service:

```bash
sudo systemctl status systemd-journald
```


* To get the status of Ionoid sealos managers, check the following services:
Status of Main manager:

```bash
sudo systemctl status sealos-manager
```

Status of manager that executes and performs actions:

```bash
sudo systemctl status sealos-manager-actions
```

* To see if Ionoid sealos manager boot setup succeeded:

```bash
sudo systemctl status sealos-boot-setup
```

You should be able to read in the output:
```
Main PID: 52 (code=exited, status=0/SUCCESS)
```

If no then something went wrong during initial Ionoid sealos manager
boot setup.


### 4.3 Troubleshooting IoT Apps:

If you have deployed Apps using the native format `tar`, `zip` or
anything that is not a `Docker Container/App`, then just replace `$MYAPP` with the name
of your App:

* Get Status of an App:

```bash
sudo systemctl status $MYAPP
```

* Get log entries of an App:

```bash
sudo journalctl -b -u $MYAPP
```


### 4.4 Troubleshooting Docker IoT Apps:

If you have deployed Docker Containers or Apps then you can use the `Docker` tools.


**If docker commands do not work, run them with sudo**


* List All running docker Apps and containers:

```bash
docker ps
```

or if you need permissions:

```bash
sudo docker ps
```


### 4.5 Troubleshooting Device Logs

Information about Device services and Apps logs be found using the `journalctl`
utility.

* To get the kernel logs use `dmesg`, the following asks for the last
`100 log entires`:

```bash
sudo dmesg | tail -n 100
```


* To get the system logs of the current boot:

```bash
sudo journalctl -b
```

* To get the last 10 entries of system logs of the current boot:

```bash
sudo journalctl -b -n 10
```

* To Follow in realtime system logs of the current boot:

```bash
sudo journalctl -b -f
```

* To check the logs of a Ionoid manager `sealos-manager` agent:

```bash
sudo journalctl -b -u sealos-manager
```

```bash
sudo journalctl -b -u sealos-manager-actions
```


* To check the logs of your Service or App, replace `$MYAPP` with the name
of your App:

```bash
sudo journalctl -b -u $MYAPP
```


---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI).
