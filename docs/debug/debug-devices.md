
# Debugging and Troubleshooting IoT Devices

To Debug your Device first login into your [Ionoid IoT Account](https://dashboard.ionoid.io/login)
and locate your Device


## Device Information

In the Device details page you will be able to find lot of information:

* `Device Operating System Versions`

* `Device SealOS Manager Version`

* `Device Systemd Version`

* `Device Docker Version`


Try to see if you can `ssh` into the Device from the [Ionoid IoT
Dashboad](https://dashboard.ionoid.io/) or use the `Public Device Url` if
available and `ssh` into that `IP Address`

Otherwise locate Device `Network Interfaces` and `IP Addresses` section
inside the Device Page on Dashboard and note the `IP ADDRESS` that you
will use to `ssh` into Device.


## Connect to Device

Connect to your device via `ssh`.

* Replace `$USER` with a valid user from your Device, usually either `root` or another user that you did create.

* Replace `$IP_ADDRESS_OF_DEVICE` with the IP Address of your device


```bash
ssh $USER@$IP_ADDRESS_OF_DEVICE
```

Provide the `$USER` password and you should be in if everything was
right and if the device is still up and able to handle `ssh`.


## Troubleshooting IoT Device

Information about Device services and Apps can be found using the `systemctl`
utility.

* To get the overall status of the Device:

```bash
sudo systemctl status
```

### Troubleshooting Services and Apps

* To get the list of failed Services on the Device:

```bash
sudo systemctl --failed
```

* To get the status of Services or Apps, use the `status` operation:

```bash
sudo systemctl status systemd-journald
```

```bash
sudo systemctl status sealos-manager
```

```bash
sudo systemctl status sealos-manager-actions
```


#### Troubleshooting Native IoT Apps:

If you have deployed Apps using the native format `tar`, `zip` or
anything that is not a `Docker Container/App`, then just replace `$APP` with the name
of your App:

* Get Status of an App:

```bash
sudo systemctl status $APP
```


#### Troubleshooting Docker IoT Apps:

If you have deployed Docker Containers or Apps then you can use the `Docker` tools.


**If docker commands do not work, run them with sudo**


* List All running Apps and Containers:

```bash
docker ps
```


### Troubleshooting with Logs

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

* To check the logs of a `sealos-manager` agent:

```bash
sudo journalctl -b -u sealos-manager
```

```bash
sudo journalctl -b -u sealos-manager-actions
```


* To check the logs of your Service or App, replace `$APP` with the name
of your App:

```bash
sudo journalctl -b -u $APP
```


---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtNTAzMTEwMTc5NDc2LTM2ODgxY2VmYTljNjM2NTNmZmVjYTEzY2Q4NTgyZTljYzI3MzhiZGRlODkzNTE3NTE3ODk5ZmFjNjYzOGRjZTM).
