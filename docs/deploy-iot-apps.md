# IoT Apps Deployment

Ionoid.io makes it easy to deploy apps on IoT and Edge Linux devices, in just
few clicks, an App can be deployed on hundreds or thousands of devices.

From dashboard you can update your applications, but also if enabled, rollback
to previous version in case of errors.


## Apps Deployment Workflow

When deploying [archive or static](
https://docs.ionoid.io/docs/iot-apps.html#iot-apps) apps there are two extra
deployment workflows that you can select or even combine.


### 1. Dual A/B Deployment Workflow

This workflow allows you to have two copies of the application stored in device
storage. This is known as the **dual A/B** workflow, where for each new
deployment of the application; we keep the previous one where we can rollback to
it, in order to recover from errors, application bugs, etc.

Before activating this feature, please make sure you have enough space storage
on devices for the uncompressed application files. Usually if your uncompressed
application takes up less than 30% of the entire storage, then it should be fine.

By default it is disabled, to enable this feature, please see
[Project Configuration](
https://docs.ionoid.io/docs/manage-projects.html#configure-the-project), then
[Redeploy Project Configuration](
https://docs.ionoid.io/docs/manage-projects.html#redeploy-project-settings)
operation to redeploy the changes to devices.


### 2. Delta Updates Workflow

The **delta update** workflow is an update mechanism for applications that only
requires the user to download the code that has changed, not the whole program.
It can significantly save time and bandwidth.

An app can be updated faster and more efficiently due to this mechanism, as an
example: a packaged archive app that is 100 megabytes will be updated with new
files that add an additional two megabytes to the application's size, in this
case only two megabytes will be downloaded instead of 102 megabytes.

Ionoid.io uses the [VCDIFF format](https://en.wikipedia.org/wiki/VCDIFF) to
perform delta encoding and updates, the full specification can be found in
[IETF's RFC 3284: The VCDIFF Generic Differencing and Compression Data
Format](https://tools.ietf.org/html/rfc3284). The open source project
[xdelta version 3](https://en.wikipedia.org/wiki/Xdelta) is used to handle delta
encoding.


By default, delta updates option is disabled, and app deployment is performed
using the full application package. To enable this feature, please see
[Project configuration](
https://docs.ionoid.io/docs/manage-projects.html#configure-the-project), then
[Redeploy project configuration](
https://docs.ionoid.io/docs/manage-projects.html#redeploy-project-settings)
operation to redeploy the changes to devices.




#### Delta updates example

Let's assume that the current app version has been deployed using the package
file `my-app-1.0.0.tar.gz`, and that you want to deploy a new version packaged
in file `my-app-2.0.0.tar.gz`. You will not need to upload the whole
`my-app-2.0.0.tar.gz` file. Instead, you will upload the *difference* between
the two packages, known under the fancy name of *the delta*.

To generate a delta between two files you will need to install [xdelta3](
https://github.com/jmacd/xdelta) on your Linux working station (make sure it is
`xdelta3` with **version 3**):

```bash
# For example, in debian/ubuntu based distributions:
sudo apt-get install xdelta3
```

The steps to perform a delta update are the following:

1. Produce a delta file named `app.xdelta` between `my-app-1.0.0.tar.gz` and
   `my-app-2.0.0.tar.gz` using `xdelta3`:

```bash
xdelta3 -e -s my-app-1.0.0.tar.gz my-app-2.0.0.tar.gz app.xdelta
```

2. Host the generated `app.xdelta` file somewhere such that it must be inside a
   folder named `1.0.0`, the full URL will be, for example:

```
https://example.com/software/my-app/1.0.0/app.xdelta
```

::: warning N. B.
- The current deployed version on device is read from the [app.yaml
file](https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) in package
file `my-app-1.0.0.tar.gz` present on the device, not from the package filename
itself, which can just as well be named, say, `my-app-first-version.tar.gz`.
- The file **must be** named `app.xdelta` and the folder **must be** named `1.0.0`.
:::

3. Perform the delta update by navigating to <the-project-app-details-page/> or
<the-device-app-details-page/>, then on the actions menu, click on **Update app
on all/selected/current device(s)**, make sure that **Delta Update** is enabled
and paste the following *delta base URL* `https://example.com/software/my-app/`:

![Paste Delta Update URL](/steps/deploy-iot-apps/delta_update_app_on_devices.png)

::: warning N. B.
This is the **delta base URL** that must be filled (without the `1.0.0/app.xdelta`)
and not the **full URL**. Passing the full URL will result in a failure.
:::

This instructs the device to:

- Get the current version of the app from the local [app.yaml
file](https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format), in this case
`1.0.0`.

- Use the current version to construct the final URL by appending
`1.0.0/app.xdelta` to the delta base URL, to finally produce:

```
https://example.com/software/my-app/1.0.0/app.xdelta
```

- Download the delta file and patch the current packaged version.

::: details Question: why should I provide the delta base URL and not the full delta URL ?
Even if it does not seem to be logical in the previous simple case to provide the
delta base URL `https://example.com/software/my-app/` instead of the full URL,
this convention will prove useful when deploying multiple delta updates
for multiple different obsolete versions.

Suppose you have `my-app` deployed on 10 devices, you regularly deploy updates of
this app to keep it up to date. But due to connectivity issues, some devices
still have an obsolete version of the app (latest version is 10.0.0):

- Device A: has version 5.0.0
- Device B: has version 7.0.0
- Device C: has version 9.0.0

All remaining devices have version 10.0.0. You will not have to update each
device individually. Instead, prepare 3 delta files:

- A first one for passage from 5.0.0 to 10.0.0
- A second one for passage from 7.0.0 to 10.0.0
- A third one for passage from 9.0.0 to 10.0.0

All delta files need to be named `app.xdelta`, but each of them must be put
inside a folder named with the starting version, thus:

- The first delta update must be put in folder `5.0.0/`
- The second delta update must be put in folder `7.0.0/`
- The third delta update must be put in folder `9.0.0/`

So, folder structure at the `my-app` level must be:

```
my-app
├── 5.0.0
│   └── app.xdelta # represents transition from 5.0.0. to 10.0.0
├── 7.0.0
│   └── app.xdelta # represents transition from 7.0.0. to 10.0.0
└── 9.0.0
    └── app.xdelta # represents transition from 9.0.0. to 10.0.0
```

Then, all what you need to do is to visit <the-project-app-details-page/>,
and choose **Update app on all devices**, then you paste the delta base URL
`https://example.com/software/my-app/`. Each device will go and look at path
`CURRENT_VERSION/app.xdelta` in the delta base URL based on the `CURRENT_VERSION`
of the app installed on it, then download the delta file and patch app package
with it:

- Device A: will read local version `5.0.0` and fetch path `5.0.0/app.xdelta` in
  delta base URL
- Device B: will read local version `7.0.0` and fetch path `7.0.0/app.xdelta` in
  delta base URL
- Device A: will read local version `9.0.0` and fetch path `9.0.0/app.xdelta` in
  delta base URL

Don't worry about up-to-date devices that will try to fetch `10.0.0/app.xdelta`,
they will simply fail to download the delta file and cancel the update. If you want
to avoid such inoffensive errors, just select devices with outdated app version
before updating app.
:::

## Deploy Apps

In the next sections, we consider that you have:

- [Created](/docs/getting-started.md) an account on Ionoid.io
- [Created](/docs/manage-projects.md) at least one project
- [Registered](/docs/register-devices.md) at least one device on this project

If not, please follow the guidelines on the links above then return to this page.


The dashboard provides a way to deploy on a subset of devices, using filters
based on device names (for example, deploy only on devices
with names matching `weather-station-*`), or devices with a specific status
(for example device with status `error` to fix a bug).

To deploy an IoT app you have three options:

- [Deploy on a single device](#deploy-on-a-single-device)
- [Deploy on all devices of a project](#deploy-on-all-devices-of-a-project)
- [Deploy on a subset of devices of a
  project](#deploy-on-a-subset-of-devices-of-a-project)


### Deploy on a single device

In this example we assume that the deployed applications are `archive` or `static` apps, deploying docker applications
is same except that we use docker urls.

- On <the-device-details-page/>, click on the **&#xFE19;** button and choose
**Deploy app on this device** action:

![Click on Deploy App Button](/steps/deploy-iot-apps/go_to_device_details_page_click_on_deploy_app.gif)

- On the window that appears, you can optionally add/remove environment variables
for this app

- Paste a public accessible URL to your app, and click on the **Deploy** button

::: tip
If you have not yet an app on hand, you can test our **Hello World** test app,
for that, use [this public URL for ARMv6 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv6/hello-world/hello-world-armv6-v0.1.tar
), and [this public URL for ARMv7 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.1.tar
) to deploy the version `v0.1`.
:::

After few seconds, you will receive realtime messages about the status and
progress of the app deployment on the device.

![Paste the App Public URL](/steps/deploy-iot-apps/on_device_details_page_paste_app_url_and_wait_realtime_messages.gif)

Once the app deployed on this device, you can see it listed on
<the-project-app-list-page/> or on <the-device-app-list-page/>.

### Deploy on all devices of a project

- On <the-project-details-page/> make sure that no device is selected. Click on
**&#xFE19;** button and choose **Deploy app on all devices** action:

![Click on Deploy App on All Devices](/steps/deploy-iot-apps/on_project_details_page_unselect_all_devices_and_click_on_deploy_on_all_devices.gif)

- On the window that appears, you can optionally add/remove environment variables
for this app.

- Paste a public accessible URL to your app, and click on the **Deploy** button

::: tip
If you have not yet an app on hand, you can test our **Hello World** test app,
for that, use [this public URL for ARMv6 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv6/hello-world/hello-world-armv6-v0.1.tar
), and [this public URL for ARMv7 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.1.tar
) to deploy the version `v0.1`.
:::

After few seconds, you will receive realtime messages about the status and
progress of the app deployment on each device.

![Deploy App on All Devices of a Project](/steps/deploy-iot-apps/deploy_app_on_all_devices_of_project.gif)

Once the app deployed on at least one device of the project, you can see it
listed on <the-project-app-list-page/>.

### Deploy on a subset of devices of a project

- On <the-project-details-page/>, select the device(s) you want to deploy to

::: warning
If you don't select any device, the deployment will concern all the devices of the
current project.
:::

- Click on the **&#xFE19;** button, and choose the **Deploy app** action

- Optionally, remove/add environment variables this app needs to properly work

- Paste a public accessible URL to your app, and click on the **Deploy** button

::: tip
If you have not yet an app on hand, you can test our **Hello World** test app,
for that, use [this public URL for ARMv6 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv6/hello-world/hello-world-armv6-v0.1.tar
), and [this public URL for ARMv7 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.1.tar
) to deploy the version `v0.1`.
:::

![Deploy App on Selected Devices](/steps/deploy-iot-apps/deploy_app_on_some_devices_of_project.gif)

After few seconds, you will receive realtime messages about the status and
progress of the app deployment on each device.

Once the app deployed on at least one device of the project, you can see it
listed on <the-project-app-list-page/>.


### Predeployed applications

There are cases where the applications should be packed with OS image, installed then run on first boot.
This is supported by copying the application into the `/data/` partition, inside directory
`/data/apps/archive/`. The directory has to be created in first place by the user, before booting the
image.

Example assuming mounted data storage is at `/mnt/data/`:
```bash
sudo mkdir -p /mnt/data/apps/archive/
sudo cp my-app-v1.tar.gz /mnt/data/apps/archive/
sync /mnt/data/apps/archive/my-app-v1.tar.gz
umount /mnt/data/apps
```

When devices are booted, the directory `/data/apps/archive/` will be checked every 10mins to 15mins, all applications inside
will be installed. After trigerring the installation, the corresponding applications packages are removed.


## Update Apps

You can easily update an already deployed app to a newer version, for that you
have three options:

- [Update on a single device](#update-on-a-single-device)
- [Update on all devices of a project](#update-on-all-devices-of-a-project)
- [Update on a subset of devices of a
  project](#update-on-a-subset-of-devices-of-a-project)

### Update on a single device

- On <the-device-app-details-page/>, click on the **&#xFE19;** button, and
choose **Update app on this device**

![Click on Update App on this Device](/steps/deploy-iot-apps/click_on_update_app_on_this_device.png)

- You will get the same window as in the first deploy step, however
with the previous public URL pasted. Follow the same steps as in the first
deploy process, and after few seconds, you will receive realtime messages about
the status and progress of the app deployment on this device.

::: tip
You can use the same public URL to deploy multiple versions of the same app.
This is why for convenience, the previous public URL has been pasted to
deployment field.
:::

::: tip
If you used our **Hello World** `v0.1` test app on the first deploy, you can
now use its `v0.2` version to test update. Here is the [public URL for ARMv6 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv6/hello-world/hello-world-armv6-v0.2.tar
), and [the public URL for ARMv7 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar
) to deploy the version `v0.1`.
:::

### Update on all devices of a project

- On <the-project-app-details-page/>, click on the **&#xFE19;** button, then
click on the **Update app on all devices** button:

![Click on Update App on all Devices](/steps/deploy-iot-apps/click_on_update_app_on_all_devices.gif)

- You will get the same window as in the first deploy step, however
with the previous public URL pasted. Follow the same steps as in the first
deploy process, and after few seconds, you will receive realtime messages about
the status and progress of the app deployment on devices of the project.

::: tip
You can use the same public URL to deploy multiple versions of the same app.
This is why for convenience, the previous public URL has been pasted to
deployment field.
:::

::: tip
If you used our **Hello World** `v0.1` test app on the first deploy, you can
now use its `v0.2` version to test update. Here is the [public URL for ARMv6 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv6/hello-world/hello-world-armv6-v0.2.tar
), and [the public URL for ARMv7 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar
) to deploy the version `v0.1`.
:::

### Update on a subset of devices of a project

- Navigate to <the-project-app-list-page/> then click on the target app

- Select the devices you want to update app on

- Click on the **&#xFE19;** button, then click on the **Update app on selected
devices** button:

![Click on Update App on Selected Devices](/steps/deploy-iot-apps/update_app_on_selected_devices.gif)

- You will get the same window as in the first deploy step, however
with the previous public URL pasted. Follow the same steps as in the first
deploy process, and after few seconds, you will receive realtime messages about
the status and progress of the app deployment on devices of the project.

::: tip
You can use the same public URL to deploy multiple versions of the same app.
This is why for convenience, the previous public URL has been pasted to
deployment field.
:::

::: tip
If you used our **Hello World** `v0.1` test app on the first deploy, you can
now use its `v0.2` version to test update. Here is the [public URL for ARMv6 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv6/hello-world/hello-world-armv6-v0.2.tar
), and [the public URL for ARMv7 devices](
https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar
) to deploy the version `v0.1`.
:::

## Rollback Apps

If you deployed an IoT app, then discovered that it is buggy (on one or more
devices), do not panic! You can easily rollback the app version, for that you
have three options:

- [Rollback on a single device](#rollback-on-a-single-device)
- [Rollback on all devices of a project](#rollback-on-all-devices-of-a-project)
- [Rollback on a subset of devices of a
  project](#rollback-on-a-subset-of-devices-of-a-project)

### Rollback on a single device

- On the top of <the-device-app-details-page/>, you can check what is the current
version, and what is the previous version

- Click on the **&#xFE19;** button, and choose **Rollback app on this
device**

![Click on Rollback Device App](/steps/deploy-iot-apps/click_on_rollback_app_on_single_device.png)

- Confirm by clicking on the **Rollback** button on the confirmation window

- After few seconds, you will receive realtime messages about the rollback
  process on the device

### Rollback on all devices of a project

- On <the-project-app-details-page/>, make sure that no device is selected

- Click on the **&#xFE19;** button, then click on the **Rollback app on all
  devices** button:

![Click on Rollback Project App](/steps/deploy-iot-apps/click_on_rollback_app_on_all_devices_of_project.png)

- Confirm by clicking on the **Rollback** button on the confirmation window

- After few seconds, you will receive realtime messages about the rollback
  process on the device

### Rollback on a subset of devices of a project

- On <the-project-app-details-page/>, select the devices you want to update app on

- Click on the **&#xFE19;** button, then click on the **Rollback app on
  selected devices** button:

![Click on Rollback Selected Devices App](/steps/deploy-iot-apps/click_on_rollback_app_on_selected_devices.png)

- Confirm by clicking on the **Rollback** button on the confirmation window

- After few seconds, you will receive realtime messages about the rollback
  process on the selected devices

## Start/Stop Apps

You can either stop an (already running) app on all or some devices of a project,
or on a single device:

- To stop a running app on all devices of a project, navigate to <the-project-app-details-page/>.
Click on the **&#xFE19;** button, then click on the **Stop app on all devices**:

![Click on Stop App on all
Devices](/steps/deploy-iot-apps/stop-app-on-all-devices.png)

- To start the app again, use the same menu, and click on **Start app on all
  devices**

- To stop a running app on a single device, navigate to
  <the-device-app-details-page/>

- Click on the **&#xFE19;** button, then click on **Stop app on this device**:

- To start the app again, use the same menu, and click on **Start app on this
  device**

![Click on Stop App on this
Device](/steps/deploy-iot-apps/stop-app-on-this-device.png)

::: tip
- Starting an already running app will have the effect of restarting this app
- When an app has been started, you don't need to start it again on the next
  reboot of the device, it will auto-start
:::

## Disable Apps

Disaling an IoT app is like [stopping it](#start-stop-iot-apps), except that it
will not restart the next time the device reboots. You can either disable an
app on all, or some devices of a project, or on a single device:

- To disable an app on all devices of a project, navigate to
  <the-project-app-details-page/> and click on **Disable app on this project**
  button:

![Click on Disable App on this
Project](/steps/deploy-iot-apps/disable-app-on-this-project.png)

- To disable an app on a single device, navigate to
  <the-device-app-details-page/>. Click on the **&#xFE19;** button, then click
  on **Disable app on this device**:

![Click on Disable App on this
Device](/steps/deploy-iot-apps/disable-app-on-this-device.png)

## Delete Apps

You can either delete an app on all or some devices of a project, or on a single
device:

- To delete an app on all devices of a project, navigate to
  <the-project-app-details-page/> and click on **Delete app on this project**
  button:

![Click on Delete App on this
Project](/steps/deploy-iot-apps/delete-app-on-this-project.png)

- To delete an app on a single device, navigate to
  <the-device-app-details-page/>. Click on the **&#xFE19;** button, then click
  on **Delete app on this device**:

![Click on Delete App on this
Device](/steps/deploy-iot-apps/delete-app-on-this-device.png)

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
