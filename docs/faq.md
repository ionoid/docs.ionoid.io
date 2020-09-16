# FAQ

This page lists the most frequently asked questions. If you have a
specific question and you are not able to find an answer here, please
email us at: <support@ionoid.io>, or at <contact@ionoid.io>.


## About Ionoid.io

::: details What is Ionoid.io?
Ionoid.io is an IoT Edge device management service. It supports devices, gateways with
OTA (Over-The-Air) Operating System updates, allows IoT Apps deployment,
IoT data gathering, sensors connectivity.

Ionoid.io offers SealOS a secure Linux-IoT OS to protect your cyber physical world.
:::

::: details Can I open a free account?
Yes. Please visit [Ionoid.io](https://ionoid.io/) and feel free to create an account and deploy your
first IoT Applications.
:::

::: details What kind of IoT devices Ionoid.io support?
Ionoid.io supports any device that can run the Linux Operating System. From Raspberry PI family,
MyPi Industrial boards, MyPi edge boxes, Beaglebone family, i.MX NXP family,
Orange PI family, ARM, x86 boards and other Industrial based boards.

We also offer our own SealOS Linux-IoT Operating system, feel free to contact us at:
<contact@ionoid.io> to support your board.
:::

::: details Can I outsource all device maintenance and updates to you?
Yes. If you are interested only in your application and business value, we can handle
the device infrastructure for you; including remote maintenance and support. Please
write to as at: <contact@ionoid.io> and describe your business case.
:::

::: details Do you offer SLA support?
Yes. Please write to us at <contact@ionoid.io> and describe your business case.
:::

::: details Can you support my devices or gateways?
Sure, we are always adding more hardware support to our catalogue, however if your
hardware is not listed or in doubt, then please contact us at <contact@ionoid.io>,
we will provide you with board support, dashboard integration, and OTA System updates.

We use the Open Source [Yocto project](https://www.yoctoproject.org/) to build SealOS,
our operating system.
:::

::: details How many devices Ionoid.io can support?
We are able to scale to `100000 devices/gateways` per single organization.
:::

::: details How many devices Ionoid.io can manage at same time?
It depends on your organization plan. The right number of managed
devices is displayed in your current organization plan, if you want to
register more devices and your account limits does not allow it, then
please upgrade your plan, or email us at: <support@ionoid.io>.
:::


## About Operating System Updates

::: details What Operating System do you offer and does it support system updates?
We have developed our own Operating System SealOS a Linux based OS. SealOS is a
secure OS for IoT and Edge devices. We offer 5 to 6 years of support and security
updates, and are able to commit to more years if requested. With SealOS receive
remote OTA (Over The Air) updates, extend your device's longevity and reduce
maintenance costs.

SealOS is an Open Source project provided by Ionoid.io. It is built using the Open
Source [Yocto Project](https://www.yoctoproject.org/) a Linux foundation project.
:::

::: details Can you support extra hardware modules and industrial protocols?
Short answer: yes. We focus mainly on standard hardware that is supported by Linux and
Yocto projects; where SealOS our Operating System will run without a lot of changes,
however it depends on the requested changes. We have extensive experience in
building drivers, layers for hardware, and incorporating industrial protocols. Please
contact us at: <contact@ionoid.io> and describe your use-case, we will do our best to
help you.
:::

::: details Why does SealOS support only 5 to 6 years of updates?
This is by default our long-term support period. If you are
interested into 10 years of support and updates, then please contact as at:
<contact@ionoid.io>.
:::

::: details Do you support hardware watchdog and Operating System rollbacks in case of failures?
Yes. We do have a rollback mechanism to switch to the previous version of the
Operating system in case of failures, and we also support hardware watchdog to
guarantee minimal down time for your devices.

SealOS uses the dual A/B (seamless) OS updates mechanism when performing a system update.
:::


## About Wireless, LTE/5G Connectivity

::: details Do you support LTE and 5G connectivity?
Yes. Please check our documentation on how to configure your LTE/5G provider
from our dashboard [Cellular configuration](https://docs.ionoid.io/docs/manage-projects.html#cellular-configuration)
:::

::: details Do you support connectivity loss and recovery?
Yes, we do have mechanisms that allow you to recover and reconfigure LTE / 5G
connectivity. Please check our documentation on [connectivity check and
recovery](https://docs.ionoid.io/docs/manage-projects.html#connectivity-check)
:::

::: details My devices use GSM LTE connectivity and data usage is too expensive, do I have to deploy a full application?

Ionoid.io supports delta updates. First time you deploy your full application, then you can
deploy delta updates which requires to only download the code that has changed,
this will save time and bandwidth significantly. For further information, please refer
to our documentation: [Delta Update
workflow](https://docs.ionoid.io/docs/deploy-iot-apps.html#_2-delta-updates-workflow).
:::

::: details Do you support WiFi connectivity?
Yes. Please check our [Wireless connectivity
documentation](https://docs.ionoid.io/docs/manage-projects.html#wifi-configuration)
:::


## About Apps

::: details What format of applications are supported?
We support packaged apps that are self contained either in tarball files or in docker
container format. For more information please refer to our documentation:

- [IoT Apps](https://docs.ionoid.io/docs/iot-apps.html).

- [Deploy IoT apps](https://docs.ionoid.io/docs/deploy-iot-apps.html)

- [Build IoT apps](https://docs.ionoid.io/docs/build-iot-archive-apps.html)
:::

::: details Can I deploy ML, AI, blockchain applications and wallets?
Yes. If your applications or wallets are able to run on Linux then [Ionoid.io](https://ionoid.io/) would be
the perfect match for your application. If in doubt please email us at: <support@ionoid.io>.
:::

::: details Can I use Ionoid.io to monetize my IoT Application data ?
Yes, sure. You can use Ionoid.io platform to broadcast the data generated by your IoT
devices and Apps. Please feel free to emails us for further information at:
<contact@ionoid.io>.
:::

::: details Do I have to rebuild and repackage my application if SealOS versions change?
No. We do guarantee that your applications will always run on newer versions of
SealOS. However to use new features you have to rebuild it again.
:::

::: details Do you offer a “rollback to the previous version” mechanism for applications ?
Yes. We have a rollback to previous application deployment in case newer versions
fail. For further detail please refer to our documentation:
[Rollback apps](https://docs.ionoid.io/docs/deploy-iot-apps.html#rollback-apps)
:::

::: details Can I provision a SealOS Operating System image with my applications and sell it to
my customers?
Yes. We support pre-installed applications that are run during the first boot of
devices. For further details please check our documentation: [Deploy IoT
apps](https://docs.ionoid.io/docs/deploy-iot-apps.html).
:::

::: details Do I have to build my application on your servers or share my source code with you?
No. We take privacy matters seriously and we will never force you to use a workflow
that you are not comfortable with. You can build your application, host it on your own
infrastructure, and pass the deployment URL to devices directly, where devices will
fetch it, install it and run it.
:::

::: details My devices use GSM LTE connectivity and data usage is too expensive, do I have to
deploy a full application?
Ionoid.io supports delta updates. First time you deploy your full application, then you can
deploy delta updates which requires to only download the code that has changed,
this will save time and bandwidth significantly. For further information, please refer
to our documentation: [Delta Update
workflow](https://docs.ionoid.io/docs/deploy-iot-apps.html#_2-delta-updates-workflow).
:::

## About Extra Features/Requests

::: details What are the supported boards and hardware?
Ionoid.io supports any device and gateway that can run [Linux Operating System](https://kernel.org).

Feel free to contact us at <contact@ionoid.io> if you want board support.
:::


::: details Do you offer Yocto support?
Yes, please contact us at <contact@ionoid.io>.
:::


## About Dashboard

## Troubleshooting

::: details How to debug my registered IoT devices?
You can find more information on how to debug your registered devices
here: [Debug IoT
devices](https://docs.ionoid.io/#/../debug/debug-devices).

Feel free to contact us at <support@ionoid.io> if information is not
accurate or incomplete.
:::

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
