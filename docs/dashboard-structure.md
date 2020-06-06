# Dashboard Structure

In this page you will find information about the different pages of the
[Ionoid.io dashboard](https://dashboard.ionoid.io/). There are three main categories:

- [Pages related to projects, devices and apps](#projects-devices-and-apps-pages)
- [Pages related to account and organization(s)](#account-and-organization-s-pages)
- [Miscellaneous pages](#miscellaneous-pages)

## Projects, Devices and Apps Pages

These pages display information about projects, devices and apps **of the
current default organization**. This means that information displayed on these
pages for a given account **will change** if you **switch to another
organization** (see [Organizations and Collaborators
](/docs/organizations-and-collaboration.md) for more details).

### Pages Related to Projects

There are three types of pages related to projects:

- <span class="page-name">The project list page</span> A page containing the
  list of all projects of the current default organization

  ::: details How to access <span class="page-name">The project list page</span>?
  It is the default home page of the Ionoid.io dashboard site. If you are on
  another page and you want to return to the project list page, you can either
  click on the *Home* or *Projects* links in breadcrumbs, or click on the
  *Ionoid* logo:
  ![Project List Page](/steps/dashboard-structure/access-project-list-page-1.png)
  :::

- <span class="page-name">The project details page</span> A page containing
  information about a given project, as well as controls to act on the project
  and devices of the project. This page is made of four tabs:
  - An *Overview* tab, displaying:
    - General information about the project
    - A panel which displays realtime messages arriving from devices of the
      project
    - The list of devices of the project
    - A field to search devices by: name, status, UUID and OS release
    - A bar of controls to perform actions on all/a subset of devices of the
      project
  - A *Add new device* which permits to configure the OS image that will be
    generated for the device we want to add to our project
  - An *Action history* page displaying a list of the last performed actions on
    the project
  - A *Settings* page to configure the project

  ::: details How to access <span class="page-name">The project details page</span>?
  On <span class="page-name">the project list page</span>, click on the target
  project:
  ![Project Details Page](/steps/dashboard-structure/access-project-details-page-1.png)
  If you are on another page, you can use the breadcrumbs or the sidebar panel
  to return to the <span class="page-name">the project details page</span>
  (when possible):
  ![Project Details Page](/steps/dashboard-structure/access-project-details-page-2.png)
  :::

- <span class="page-name">The project app list page</span> A page containing
  the list of apps deployed on the devices of the project.

  ::: details How to access <span class="page-name">The project app list page</span>?
  On <span class="page-name">the project details page</span>, click on
  the target app:
  ![Project App List
  Page](/steps/dashboard-structure/access-project-app-list-page-1.png)
  You can also use the breadcrumbs to return to the
  <span class="page-name">the project app list page</span> (when
  possible):
  ![Project App List
  Page](/steps/dashboard-structure/access-project-app-list-page-2.png)
  :::

- <span class="page-name">The project network of devices page</span> A page
  containing the list of the project devices with their network UUIDs.

  ::: details How to access <span class="page-name">The project network of devices page</span>?
  On the sidebar panel, click on *Network of devices* menu:
  ![Network of Devices
  Page](/steps/dashboard-structure/access-project-devices-network-page.png)
  :::

### Pages Related to Devices

The are three types of pages related to devices:

- <span class="page-name">The device details page</span> A page containing
  information about the given device, as well as controls to act on the device.
  This page contains several information blocks:
    - General information like status, name, external IP or model
    - A panel which displays realtime messages arriving from the given device
    - A bar of controls to perform actions on the given device
    - A panel consisting of:
      - A *Details* tab page displaying the device public URL and it's
        different UUIDs
      - A *Networks* tab page displaying information about connectivity
      - A *System* tab page displaying information about device OS, device
        filesystem, and environment variables of the device
      - A *Errors/Extra Info* tab page displaying errors and info logs of the
        device (if any)
      - A *Terminal Session* tab page displaying a terminal to connect to the
        device
      - A *Device Logs* tab page displaying a panel for logs arriving from the
        device

  ::: details How to access <span class="page-name">The device details page</span>?
  The easiest way is to click on the target device on the <span class="page-name">The
  project details page</span>:
  ![Device Details Page](/steps/dashboard-structure/access-device-details-page-1.png)
  If you are on another page, you can use the breadcrumbs or the sidebar panel
  to return to the <span class="page-name">the device details page</span> (when
  possible):
  ![Device Details Page](/steps/dashboard-structure/access-device-details-page-2.png)
  :::

- <span class="page-name">The device settings page</span> A page containing the
  settings of the given device. In this page you can configure the device,
  deploy settings to this device, disable or delete the device.

  ::: details How to access <span class="page-name">The device settings page</span>?
  To access to <span class="page-name">the device settings page</span>, use the
  sidebar panel:
  ![Device Settings Page](/steps/dashboard-structure/access-device-settings-page-1.png)
  :::

- <span class="page-name">The device app list page</span> A page containing the
  list of apps installed on the device:

  ::: details How to access <span class="page-name">The device app list page</span>?
  The easiest way is to use the sidebar panel when you are on
  <span class="page-name">the device details page</span> or on the
  <span class="page-name">the device settings page</span>:
  ![Device App List Page](/steps/dashboard-structure/access-device-app-list-page-1.png)
  If you are on another page, you can use the breadcrumbs
  to return to the <span class="page-name">the device app list page</span>
  (when possible):
  ![Device App List Page](/steps/dashboard-structure/access-device-app-list-page-2.png)
  :::

### Pages Related to Apps

There are two types of pages related to apps:

- <span class="page-name">The project app details page</span> A page containing
  details about the app in the context of the project.

  ::: details How to access <span class="page-name">The project app details page</span>?
  From the <span class="page-name">the project details page</span> go to
  <span class="page-name">the project app list page</span>, then click on
  the target app:
  ![Project App Details Page](/steps/deploy-iot-apps/go_to_project_apps_then_project_app_details.gif)
  If you are on the <span class="page-name">the device app details page</span>
  you can switch to the project context from the sidebar menu:
  ![Device App List Page](/steps/dashboard-structure/project-app-details-page-1.png)
  :::

- <span class="page-name">The device app details page</span> A page containing
  details about the app in the context of the device.

  ::: details How to access <span class="page-name">The device app details page</span>?
  There are two ways to access the <span class="page-name">
  the device app details page</span>:

  Either: From the <span class="page-name">the project details page</span> go to
  <span class="page-name">the project app list page</span>, then click on
  the target app to go to the <span class="page-name">the project app details
  page</span> then click on the target device:
  ![Device App Details Page](/steps/deploy-iot-apps/go_to_project_apps_then_project_app_details_then_device_app_details.gif)

  Or: From the <span class="page-name">the project details page</span> click on
  the target device to go to <span class="page-name">the device details page
  </span>, then go to <span class="page-name">the device app list page</span>
  and click on the target device:
  ![Device App Details Page](/steps/deploy-iot-apps/go_to_device_details_then_device_apps_then_device_app_details.gif)
  :::

## Account and Organization(s) Pages

### Pages Related to Account

There is only one page related to the account: <span class="page-name">the
account settings page</span>.

::: details How to access <span class="page-name">The account settings page</span>?
From any page, either open the user menu (small user icon on the top-right of
the page), then click on *Account settings*, or click on *Account settings* on
the sidebar panel under the *Account* menu:
![Account Settings Page](/steps/dashboard-structure/account-settings-page.png)
:::

### Pages Related to Organization(s)

There is only one page related to organizations: <span class="page-name">the
organization settings page</span>.

::: details How to access <span class="page-name">The organization settings page</span>?
From any page, either open the user menu (small user icon on the top-right of
the page), then click on *Organization settings*, or click on *Organization
settings* on the sidebar panel under the *Account* menu:
![Organization Settings Page](/steps/dashboard-structure/organization-settings-page.png)
:::

## Miscellaneous Pages

Other pages are:
- <span class="page-name">The support page</span> to contact our support team
- <span class="page-name">The feedback page</span> to submit a feedback or an
  idea
- <span class="page-name">The privacy policy page</span>
- <span class="page-name">The terms of service page</span>

::: details How to access miscellaneous pages?
They are all groupped under the *Help* and *Legal* menus on the sidebar panel
![Organization Settings Page](/steps/dashboard-structure/misc-pages.png)
:::
