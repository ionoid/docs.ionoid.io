# IoT Apps

One of the most interesting features of Ionoid.io platform is the very easy way
to deploy IoT apps on IoT devices. In just few clicks, you can deploy your app
on hundreds or thousands of devices.

Using the intuitive dashboard of Ionoid.io
platform, you can also deploy on a subset of the project devices, basing on,
say, their name or their current status (for example, deploy only on devices
with names matching `weather-station-*`, or devices with status `error` to fix a bug).

In addition to be able to deploy apps, you can also deploy update for these
apps from the Ionoid.io dashboard, and of course, you can rollback an app
version if any problem appears.

In the next sections, we consider that you have:

- [Created](/docs/getting-started.md) an account on Ionoid.io
- [Created](/docs/create-projects.md) at least one project
- [Registered](/docs/register-devices.md) at least one device on this project

If not, please follow the guidelines on the links above then return to this page.

## Deploy IoT Apps

To deploy an IoT app you have three options:

- [Deploy on a single device](#deploy-on-a-single-device)
- [Deploy on all devices of a project](#deploy-on-all-devices-of-a-project)
- [Deploy on a subset of devices of a
  project](#deploy-on-a-subset-of-devices-of-a-project)

### Deploy on a single device

- On the *project details page* containing the target device, click on the device
to go to the *device details page*.

- Click on the **&#xFE19;** button and choose
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

Once the app deployed on this device, you can see it listed:

- Either on *the project app list page*:

![Go to Project Apps Page](/steps/deploy-iot-apps/from_project_details_page_go_to_project_apps_page.gif)

- Or on the *device app list page*:

![Go to Device Apps Page](/steps/deploy-iot-apps/from_device_details_page_go_to_device_apps_page.gif)

### Deploy on all devices of a project

- On the *project details page* make sure that no device is selected. Click on
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
listed on the *project app list page*.

![Go to Project Apps Page](/steps/deploy-iot-apps/from_project_details_page_go_to_project_apps_page.gif)

### Deploy on a subset of devices of a project

- On the *project details page*, select the device(s) you want to deploy to

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
listed on the project app list page.

![Go to Project Apps Page](/steps/deploy-iot-apps/from_project_details_page_go_to_project_apps_page.gif)

## Update IoT Apps

You can easily update an already deployed app to a newer version, for that you
have three options:

- [Update on a single device](#update-on-a-single-device)
- [Update on all devices of a project](#update-on-all-devices-of-a-project)
- [Update on a subset of devices of a
  project](#update-on-a-subset-of-devices-of-a-project)

### Update on a single device

- First, navigate to the *app on the device details* page, for that, you can:

  - Either navigate to the *project app list page*, click on the target app to go to the
    *app on the project details page*, then click on the target device to go to the
    *app on device details page*:

![Go to Device App Details Page Method 1](/steps/deploy-iot-apps/go_to_project_apps_then_project_app_details_then_device_app_details.gif)

  - Or click on the target device to go to the *device details page*, then
    click on *Apps* to go to the *device app list page*, then click on
    the target app to go to the *app on device details* page:

![Go to Device App Details Page Method
2](/steps/deploy-iot-apps/go_to_device_details_then_device_apps_then_device_app_details.gif)

- Click on the **&#xFE19;** button, and choose **Update app on this
device**

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

- Navigate to the *project app list* then click on the target app to go to the
  *app on the project details page*

- Click on the **&#xFE19;** button, then  click on the **Update app on all
  devices** button:

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

- Navigate to the *project app list* then click on the target app

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

## Rollback IoT Apps

If you deployed an IoT app, then discovered that it is buggy (on one or more
devices), do not panic! You can easily rollback the app version, for that you
have three options:

- [Rollback on a single device](#rollback-on-a-single-device)
- [Rollback on all devices of a project](#rollback-on-all-devices-of-a-project)
- [Rollback on a subset of devices of a
  project](#rollback-on-a-subset-of-devices-of-a-project)

### Rollback on a single device

- First, navigate to the *app on the device details* page, for that, you can:

  - Either navigate to the *project app list page*, click on the target app to go to the
    *app on the project details page*, then click on the target device to go to the
    *app on device details page*:

![Go to Device App Details Page Method 1](/steps/deploy-iot-apps/go_to_project_apps_then_project_app_details_then_device_app_details.gif)

  - Or click on the target device to go to the *device details page*, then
    click on *Apps* to go to the *device app list page*, then click on
    the target app to go to the *app on device details* page:

![Go to Device App Details Page Method
2](/steps/deploy-iot-apps/go_to_device_details_then_device_apps_then_device_app_details.gif)

- On the top you can check what is the current version, and what is the
  previous version

- Click on the **&#xFE19;** button, and choose **Rollback app on this
device**

![Click on Rollback Device App](/steps/deploy-iot-apps/click_on_rollback_app_on_single_device.png)

- Confirm by clicking on the **Rollback** button on the confirmation window

- After few seconds, you will receive realtime messages about the rollback
  process on the device

### Rollback on all devices of a project

- Navigate to the *project app list* then click on the target app to go to the
  *app on the project details page*

- Make sure that no device is selected:

- Click on the **&#xFE19;** button, then click on the **Rollback app on all
  devices** button:

![Click on Rollback Project App](/steps/deploy-iot-apps/click_on_rollback_app_on_all_devices_of_project.png)

- Confirm by clicking on the **Rollback** button on the confirmation window

- After few seconds, you will receive realtime messages about the rollback
  process on the device

### Rollback on a subset of devices of a project

- Navigate to the *project app list* then click on the target app

- Select the devices you want to update app on

- Click on the **&#xFE19;** button, then click on the **Rollback app on
  selected devices** button:

![Click on Rollback Selected Devices App](/steps/deploy-iot-apps/click_on_rollback_app_on_selected_devices.png)

- Confirm by clicking on the **Rollback** button on the confirmation window

- After few seconds, you will receive realtime messages about the rollback
  process on the selected devices

## Start/Stop IoT Apps

You can either stop an (already running) app on the whole devices of a project,
or on a single device:

- To stop a running app on the whole project, navigate to the *project app list*
then click on the target app to go to the *app on the project details page*.
Click on the **&#xFE19;** button, then click on the **Stop app on all devices**:

![Click on Stop App on all
Devices](/steps/deploy-iot-apps/stop-app-on-all-devices.png)

- To start the app again, use the same menu, and click on **Start app on all
  devices**

- To stop a running app on a single device, navigate to the *app on the device
details* page, for that, you can:

  - Either navigate to the *project app list page*, click on the target app to go to the
    *app on the project details page*, then click on the target device to go to the
    *app on device details page*:

![Go to Device App Details Page Method 1](/steps/deploy-iot-apps/go_to_project_apps_then_project_app_details_then_device_app_details.gif)

  - Or click on the target device to go to the *device details page*, then
    click on *Apps* to go to the *device app list page*, then click on
    the target app to go to the *app on device details* page:

![Go to Device App Details Page Method
2](/steps/deploy-iot-apps/go_to_device_details_then_device_apps_then_device_app_details.gif)

  Click on the **&#xFE19;** button, then click on **Stop app on this device**:

- To start the app again, use the same menu, and click on **Start app on this
  device**

![Click on Stop App on this
Device](/steps/deploy-iot-apps/stop-app-on-this-device.png)

::: tip
- Starting an already running app will have the effect of restarting this app
- When an app has been started, you don't need to start it again on the next
  reboot of the device, it will auto-start
:::

## Disable IoT Apps

Coming soon

## Delete IoT Apps

Coming soon

## More on IoT Apps

Coming soon

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
