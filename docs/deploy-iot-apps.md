# IoT Apps deployment

Ionoid.io makes it easy to deploy apps on IoT and Edge Linux devices, in just
few clicks, an App can be deployed on hundreds or thousands of devices.

From dashboard you can update your applications, but also if enabled, rollback to previous
version in case of errors.


## Apps deployment workflow

When deploying [archive or static](https://docs.ionoid.io/docs/iot-apps.html#iot-apps) apps there are
two extra deployment workflows that you can select or even combine.


### 1. Dual A/B deployment workflow

This workflow allows you to have two copies of the application stored in device storage. This is known as the **dual A/B** workflow, where for
each new deployment of the application; we keep the previous one where we can rollback to it, in order to recover from errors, application bugs, etc.
Before activating this feature, please make sure you have enough space storage on devices for the uncompressed
application files. Usually if your uncompressed application takes up less than 30% of the entire storage, then it should be fine.

By default it is disabled, to enable this feature, please see [Project configuration](
https://docs.ionoid.io/docs/manage-projects.html#configure-the-project), then [Redeploy project
configuration](https://docs.ionoid.io/docs/manage-projects.html#redeploy-project-settings) operation to redeploy the
changes to devices.


### 2. Delta updates workflow

The **delta update** workflow is an update mechanism for applications that only requires the user to download the code
that has changed, not the whole program. It can significantly save time and bandwidth.

An app can be updated faster and more efficiently due to this mechanism, as an example: a packaged archive app is 100
megabytes will be updated with new files that add an additional two megabytes to the application's size, in this case
only two megabytes will be downloaded instead of 102 megabytes.

Ionoid.io uses the [VCDIFF format](https://en.wikipedia.org/wiki/VCDIFF) to perform delta encoding and updates, the full
specification can be found in [IETF's RFC 3284: The VCDIFF Generic Differencing and Compression Data
Format](https://tools.ietf.org/html/rfc3284). Ionoid.io uses the open source project [xdelta version
3](https://en.wikipedia.org/wiki/Xdelta) to handle delta encoding.


By default it is disabled, and app deployment is performed using the full application package. To enable this feature, please see [Project configuration](
https://docs.ionoid.io/docs/manage-projects.html#configure-the-project), then [Redeploy project
configuration](https://docs.ionoid.io/docs/manage-projects.html#redeploy-project-settings) operation to redeploy the
changes to devices.


#### Delta updates example

Assuming your app `my-app` has two different versions packaged as `my-app-1.0.0.tar.gz` and `my-app-2.0.0.tar.gz`. The
working flow of a delta update from version `1.0.0` to `2.0.0` or to any other version is described in the next steps.

1. Install [xdelta3](https://github.com/jmacd/xdelta) on your Linux working station, make sure it is `xdelta3` with
**version 3**.
Example:
```bash
$ sudo apt-get install xdelta3   # For debian/ubuntu based distributions
```

2. Host your application `my-app` version `1.0.0` example at:
```
https://example.com/software/my-app/1.0.0/my-app-1.0.0.tar.gz
```

Note that the app version of deployed apps is read from the [app.yaml
file](https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) on devices, make sure it is always correctly set.


3. Produce the diff `app.xdelta` file of the `my-app` between `my-app-1.0.0.tar.gz` and `my-app-2.0.0.tar.gz` using `xdelta3`:
```bash
$ xdelta3 -e -s my-app-1.0.0.tar.gz my-app-2.0.0.tar.gz app.xdelta
```


4. Host the generated `app.xdelta` file that updates `my-app` from version `1.0.0` to `2.0.0` or to any other last
version at the same URL directory path where the full package was hosted, point 2.
```
https://example.com/software/my-app/1.0.0/app.xdelta
```


5. Perform a delta update by specifying the Delta URL at:
```
https://example.com/software/my-app/
```

This instructes devices to:

   - Get current version of the app: read the `my-app` [app.yaml
file](https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) on devices, and use it to construct the final URL.

   - Attach the `app.xdelta` to produce the final delta URL:
```
https://example.com/software/my-app/1.0.0/app.xdelta
```

This workflow allows to automatically update `my-app` from version `1.0.0` to any new version that was used to generate the `app.xdelta` diff file.


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
