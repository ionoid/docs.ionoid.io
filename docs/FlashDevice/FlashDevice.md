# Flash OS Image to Storage

To flash your Operating System image to your device storage, please
follow this tutorial.

## Supported Operating Systems and Boards

If in doubt if Ionoid supports your Operating System, Then please check the following [Supported Boards and Operating Systems table](https://docs.ionoid.io/#/../NewProject/newProject?id=supported-boards-and-operating-systems-table).

Current list of supported Operating Systems:
 - Flash Raspbian


## Flash Raspbian OS to Raspberry PI Micro SDCards

Continuing from previous [Build OS Linux-IoT Doc](https://docs.ionoid.io/#/../NewDevice/newDevice?id=build-os-linux-iot),
the generated OS image should be ready for the this step which is burning your sd card with that new image.

To do so we will use the awesome [Etcher tool](https://etcher.io/) that we recommend.

After `downloading -> installing Etcher` we can start using it for building our OS Image.

We are going to flash the Raspberry PI Micro SDCard but any other good Micro SDCard should work.

### Flash Raspbian OS Step 1

First step first, connect your Micro SD card inside the card reader that is connected to the pc (where Etcher is installed) 

![insert card](./SDcardReader.jpg)

### Flash Raspbian OS Step 2 

Start Etcher, browse and select your generated image.

![Select os](EtcherSelectWindows.png)

Select the MicroSD card that you which to install Raspbian on.
Click on the flash button.

![Select sd card](EtcherFlashWindows.png)

Congratulation, it's time to connect your sd card in your raspberry pi and start blinking LED's

---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtNTAzMTEwMTc5NDc2LTM2ODgxY2VmYTljNjM2NTNmZmVjYTEzY2Q4NTgyZTljYzI3MzhiZGRlODkzNTE3NTE3ODk5ZmFjNjYzOGRjZTM).
