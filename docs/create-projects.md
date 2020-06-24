---
dashboardUrl: https://dashboard.ionoid.io
---

# Create Projects

Ionoid.io is structured as organizations where each organization includes a set
of projects. Registered devices at Ionoid.io always belong to only one project and
are unique across the whole organization.

To get an overview of the Ionoid.io dashboard, please visit the
[Dashboard Structure](/docs/dashboard-structure.md) page.


## Create a Project

- After signin in, click on <a :href="$frontmatter.dashboardUrl+'/projects/new'" target="_blank">Create new project</a>
- Choose your target board by clicking on it (see [Supported Boards and
  OS](/docs/supported-boards-and-os.md))

![Choose Board](/steps/projects-and-devices/choose_board.gif)

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

![Create Project](/steps/projects-and-devices/finish_create_project.gif)

Now that the project has been created, you can start
<a href="/docs/register-devices.html" target="_blank">adding devices</a> to this
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

![Reorder Supported OS](/steps/projects-and-devices/reorder_supported_os.png)

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

<Content :page-key="getPageKey($site.pages, '/docs/_advanced-settings.html')" />

### Project Environment Variables

Environment variables are dynamic variables that can affect how applications will run
on the devices. Each project can have its own specific envrionment variables that
are eployed to all devices part of that project.

Deployed applications can access these environment variables, and update their behaviour accordingly.
This is very useful when it comes to update applications whithout redeploying, take an example
of an endpoint url used in 10 apps deployed across 200 devices. Using environment variables, it is as
simple as editing a single variable on dashboard, saving it, then redeploy the project settings including
envrionment variables to the concerned devices.

![Add Environment Variable](/steps/projects-and-devices/add_env_var.gif)


## Save Project settings

After finishing the project configuration, you have to save the settings so they are not lost.

::: warning
Please note that after editing the project settings, only newly registered devices
will inherite of these settings. To make the already registered devices (see [how
to register a device]()) also inherite of these settings, you have to _redeploy
the project settings_ by clicking on the **Redeploy project settings on all
devices** button that is present on <the-project-details-page/>:

![Redeploy Project Settings](/steps/projects-and-devices/redeploy_project_settings.png)

Anyway, a reminder will be displayed each time you save the project settings:

![Redeploy Project Settings Reminder](/steps/projects-and-devices/redeploy_project_settings_reminder.gif)

:::


## Add a Device to the Project

See the [next section](./register-devices.md).


## Consult the Actions History

You can check the last actions that have been performed on the project by
clicking on the **ACTIONS HISTORY** tab:

![Actions History](/steps/projects-and-devices/actions_history.png)


## Redeploy Project Settings

It is possible to redeploy the project settings to devices anytime. To do so
click on the **Redeploy project settings** button that is part of the actions in
<the-project-details-page/>:

![Redeploy Project Settings](/steps/projects-and-devices/redeploy_project_settings.png)


::: warning
Please note this may overwrite the settings of already running devices.

This may overwrite your WiFi configuration if it was changed and make your device
inaccessible in case of errors.
:::


## Delete a Project

You can delete a project by opening the **SETTINGS** tab on
<the-project-details-page/>, then by clicking on the **Delete this project**
button, and confirming by typing the project name:

![Delete a Project](/steps/projects-and-devices/delete_a_project.gif)

::: danger
Please note thay by deleting a project, you understand that all devices
belonging to this project, all apps deployed on these devices, as well as the
project configuration will be permanently deleted from the Ionoid.io dashboard.
:::

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
