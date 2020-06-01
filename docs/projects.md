---
dashboardUrl: https://dashboard-dev.ionoid.io
---

# Projects

Ionoid.io is structured as projects and devices belonging to these projects. To
add a device and be able to manage it, you first need to create a project.

## Create a Project

- After signin in, click on <a :href="$frontmatter.dashboardUrl+'/projects/new'" target="_blank">Create new project</a>

![Click on Create Project Button](/steps/click_on_create_project_button.gif)

- Choose your target board by clicking on it (see [Supported Boards and
  OS](/docs/supported-boards-and-os.md))

![Choose Board](/steps/choose_board.gif)

::: warning
  You can mix different boards and architectures, but you have to make sure to
not break your fleet by deploying apps built for other architectures
(see [Deploying Apps](/)). Otherwise you can lock your project to the selected
architecture, devices registered into the project must have same architecture,
otherwise they will be blocked and will not show up in the project,
unless you unlock the project architecture.
:::

- Finish the project creation with informations related to your project, then
  click on the **Create** button

![Create Project](/steps/finish_create_project.gif)

Now that the project has been created, you can start
<a href="/docs/register-a-device.html" target="_blank">adding devices</a> to this
project. Each device will have a configuration data consisting of:

- Name of the device (optional)
- Runing OS image
- DNS and NTP servers
- WiFi network(s) needed for connection (optional)
- Cellular network(s) needed for connection/communication (optional)
- Environment variables used by apps that will be deployed on this device
  (optional)

This configuration can be set directly into the project, so as not to repeat
the process for each device that we add to the project. Check out the next
section to learn how.

## Configure the Project

A project has a configuration that will be shared across all its devices. It
consists of:

### Project General Informations

You can set the project name, its segment and the organization to which it
belongs.

### Default Project Board

Here you can change the default board that you set the first time you created the
project. You can also reorder the supported operating systems for the selected
board, the first operating system will be the default one that will be
installed on devices when adding them to the project.

![Reorder Supported OS](/steps/reorder_supported_os.png)

### Monitoring and Notifications

Future feature that will be used to receive notifications about events on
devices directly on [Slack](https://slack.com/), or via a custom
[webhook](https://wikipedia.org/wiki/Webhook).

### Project Parameters

Used only to display the project ID and the API key used for devices (not
editable).

### General Settings

You can change the default
[Google DNS](https://developers.google.com/speed/public-dns) and
[NTP](https://developers.google.com/time) servers that will be used by devices.

### Advanced Settings

#### WiFi Configuration

You can add up to 5 WiFi networks by clicking on **Add a WiFi network**, for each
network you can set:

- The network ID (SSID) (required)
- The network visibility (default to 'not hidden')
- The network security mode (default to 'No security')
- The network password (required unless the security mode is set to 'No
  security')
- The network priority: networks with higher priority will be preferred. Default
is 0. The higher number means higher priority

![Add a WiFi Network](/steps/add_wifi_network.gif)

You can also add a fallback WiFi network by clicking on **Add a fallback WiFi
network**, this network will be used in case all other networks are unavailable.

#### Cellular Configuration

You can add up to 2 cellular networks, for each network you have to specify in
order:

- The country to which the cellular network belongs
- The network ID (generally the provider name)
- The APN used for this network ID

Once you choosed the APN, fields 'Plan' and 'Usage' will be filled with the
corresponding data. Use this data to confirm that APN you choosed is really the
one you are aiming to use.

![Add a Cellular Network](/steps/add_cellular_network.gif)

::: warning
Selecting an incorrect plan may result in billing issues for your account or
prevent connectivity.
:::

#### Boot Configuration

Here you can specify the kernel boot options.

### Project Environment Variables

Deployed apps on devices can access these environment variables, so that you
can deploy apps without hardcoding some values that can subject to
modifications in the future.

This can be very handy when it comes to modify a
variable, for example an endpoint url, used in 10 apps deployed across 200
devices. Using environment variables, it is as simple as editing a single
variable on dashboard, saving it, then clicking on a button to deploy new
configuration to all devices of the project.

::: warning
Please note that after editing the project settings, only newly added devices
will inherite of these settings. To make the already deployed devices also
inherite of these settings, you have to _deploy the project settings_ by
clicking on the **Deploy settings** button that is present on the project details
main page:

![Redeploy Project Settings](/steps/redeploy_project_settings.png)

Anyway, a reminder will be displayed each time you save the project settings:

![Redeploy Project Settings Reminder](/steps/redeploy_project_settings_reminder.gif)

::::

## Add a Device to the Project

See the [next section](./devices.md).


## Consult the Actions History

You can check the last actions that have been performed on the project by
clicking on the **ACTIONS HISTORY** tab:

![Actions History](/steps/actions_history.png)


## Delete a Project

You can delete a project by opening the 'SETTINGS' tab on the project details
main page, then by clicking on the **Delete this project** button, and confirming
by typing the project name:

![Delete a Project](/steps/delete_a_project.gif)

::: danger
Please note thay by deleting a project, you understand that all devices
belonging to this project, all apps deployed on these devices, as well as the
project configuration will be permanently deleted from the Ionoid.io dashboard.
:::

::: tip Have Questions?
We're always happy to help with IoT projects or other questions you might have!
Check our [documentation](https://docs.ionoid.io/#/), contact
support <support@ionoid.io>, or connect with our sales team: sales@opendevices.io.
You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI)
:::
