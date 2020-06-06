# Monitor and Manage Devices

The Ionoid.io dashboard offers the possiblity to monitor and manage devices
from a single place. No matter how many devices your fleet has, once [registered on
Ionoid.io platform](/docs/register-devices.md), you will be able to ping
them, get their status, deploy apps on them, reboot them, ... etc


## Device Information

Each device can be accessed through its dedicated information page: *the device
details page*. Among the information that are displayed on this page, we have:

- Device model and hostname
- Device network information (IP addresses, connected networks, ... etc)
- Device system information (Linux, SealOS, Systemd, Docker versions, ... etc)
- Device activity: last seen time, uptime, ... etc
- Device errors (if any)
- Device operating system version

![Device Details Page](/steps/monitoring-devices/device-details-page.gif)


## Realtime Activity Logs

Status and result of executed actions on your device are displayed on the right
bloc of the device page or project page:

![Device Details Page](/steps/monitoring-devices/device-realtime-messages.png)


## Actions History

A history of all executed commands can be found on the *project details page*
to which the device belongs, by clicking on the **ACTIONS HISTORY** tab:

![Project History Page](/steps/monitoring-devices/project-actions-history.png)


## Device System Logs

The platform offers a way to see exactly what is happening inside your device in
realtime with the device logs (system logs) feature on the *device details page*.

For that, click on the **DEVICE LOGS** tab on the bottom of the *device details
page*, then click on the **Start logs** button. Logs will automatically show up,
and will continue to be forwarded to the corresponding *MQTT channels* until the
device becomes offline, or is instructed to stop forwarding logs by clicking on
the *Stop logs* button.

::: tip
Device logs are sent for 10 minutes only, click on the *Start logs* button again
to get more logs.
:::

![Device Logs](/steps/monitoring-devices/device-logs.png)

## Disable Device Management

To disable a device, click on the **&#xFE19;** button on the *device details
page*, then click on the **Disable device** action. Confirm by clicking again
on the **Disable device** button:

![Disable Device](/steps/monitoring-devices/disable-device.png)

Disabling a device will put it in the `Unregistered` mode. This operation can
also be done manually by creating a file named `disable` in the `/data`
directory of the device storage, for example, using the command:

```bash
touch /data/ionoid/disable
```

::: danger
- Disabling a device will put it in an `unregistered` mode, it will add a file named
`disable` into the data folder.

- A disabled device will never communicate with the Ionoid.io dashboard. To
re-enable it, you will have to manually delete the `disable` file from the
device storage.

```bash
rm /data/ionoid/disable
```

- After disabling a device, and if the device is rebooted or online again, it
will still stay in the `unregistered` mode. It will not communicate with the
Ionoid.io dashboard unless the file `disable` is removed manually, <ins>use this at
your own risk!</ins>.

- Deployed and running applications will continue to work as expected, however
any new status updates will not show up on dashboard.

- The device will continue to fetch system updates from Ionoid.io URLs, if
the installed operating system is supported by Ionoid.io System updates. No
operation is logged or communicated to Ionoid.io dashboard. This is a free
system update service to keep your devices secure. If you do not want
any system updates, please install another fresh operating system that
does not support Ionoid.io system updates.

:::

## Delete Device

To delete a device, go to the *device settings page*. On the left sidebar,
click on **Settings** under the **Current device** menu. Then, scroll to the
bottom of the page and click on the **Delete this device** button:

![Click on Delete Device](/steps/monitoring-devices/delete-device-part-1.png)

Then enter the first 5 characters of the device UUID, and click on **Delete
this device** button:

![Confirm Delete Device](/steps/monitoring-devices/delete-device-part-2.png)

Please be aware that the device will show up again in the next reboot (or when
it is online again) if you do not disable it. To delete the device completely from
Ionoid.io, make sure to check the **Disable** checkbox. Disabling a device will
prevent its registering on the next reboot (or when it is online again), then deletes
it from the Ionoid.io backends.


::: warning
- Deployed and running applications will continue to work as expected, however
any new status updates will not show up on dashboard.

- The device will continue to fetch system updates from Ionoid.io URLs, if
the installed operating system is supported by Ionoid.io System updates. No
operation is logged or communicated to Ionoid.io dashboard. This is a free
system update service to keep your devices secure. If you do not want
any system updates, please install another fresh operating system that
does not support Ionoid.io system updates.
:::

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
