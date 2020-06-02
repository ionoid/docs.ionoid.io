# Monitoring devices

Now you should be able to monitor your devices, execute actions and operations directly on your fleet of devices.


## Devices information

Each device can be accessed through its dedicated information page. The
page shows up the device `Hostname`, `IP Address`, `Operating System version`
and other system information.

![device page](/steps/deviceDetails.png)


## Realtime Activity log

Executed actions on your device are displayed on the right bloc of the device page or project page.

![Device command](/steps/deviceCommand.png)


## Actions log

A history of all executed commands can be found on the `project page` of the device, `Action/Deployment` link in left-side panel of your page

![history log](/steps/deviceHistoryLog.png)


## Device system logs

The platform offer a way to see exactly what is happening inside your device in realtime with the device logs (system logs) feature
on the device page.

The option can be activated on the bottom page of device detail page `Device Logs`, you can instruct the device
to start sending system logs or stop sending them.

When you do `START LOGS` action, logs will automatically show up, and will continue to be forwarded to the corresponding `MQTT channels` until the device is `OFFLINE` or is instructed to stop forwarding logs by `STOP LOGS`.

![Device system log](/steps/deviceSyslog.png)


## Disable device management

To disable the device and put it in the `Unregistered mode` you can
either do it through the `Disable Device` operation in `Device Settings` section,
or add the file `disable` into the `/data` directory of the device storage.

Make sure to read the **important notices below** as in this mode
the device will never communicate with `dashboard.ionoid.io` services
and backends, and the related ionoid agents will start, check if the
file exists, if so they immediately exit with success.

Example on the device storage, add the `disable` file to the data
directory:
```bash
# touch /data/ionoid/disable
```

**Important:**

**1) After disable device, and if the device is rebooted or online again it will still stay in the
Unregistered mode and will not communicate with ionoid.io unless the
file disable is removed manually, use this at your own risk.**

**2) Deployed and running applications will continue to work as
expected, however any new status updates will not show up on dashboard.**

**3) The device will continue to fetch system updates from ionoid.io URLs, if
the installed Operating system is supported by ionoid.io System updates. No
operation is logged or communicated with ionoid.io dashboard. This is a free
system update service to keep your devices secure. If you do not want
any system updates, please install another fresh Operating System that
does not support ionoid.io system updates.**


## Delete device

To delete the device from the platform just execute the
`Delete Device` operation in `Device Settings` section.
Please be aware that the next reboot or when the device is online,
it will show up again in dashboard, this is **a temporarily delete operation.**

To delete the device completely from ionoid.io, make sure to disable it
first, check the `Disable` checkbox first, which will disable the device,
see previous `Disable device management` operation; then deletes it from ionoid.io
backends.


**Important:**

**1) Deployed and running applications on the device will continue to work as
expected, however any new status updates will not show up on dashboard.**

**2) The device will continue to fetch system updates from ionoid.io URLs, if
the installed Operating system is supported by ionoid.io System updates. No
operation is logged or communicated with ionoid.io dashboard. This is a free
system update service to keep your devices secure. If you do not want
any system updates, please install another fresh Operating System that
does not support ionoid.io system updates.**


---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI).
