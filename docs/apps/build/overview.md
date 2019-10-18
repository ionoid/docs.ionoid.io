
# Ionoid IoT Apps Format

Ionoid IoT Platform supports simple IoT Apps that can run on any Linux and
integrated with Ionoid.

Ionoid IoT Apps take [Snapcraft](https://docs.snapcraft.io/) the universal
app store for Linux as a reference, and build on top of it.

## 1. General concept

This section provides a basic view of IoT Apps and how to deploy them.

Ionoid IoT Apps are apps that are self-contained with all their metadata
included.

## 2. Tools/Steps to generate an app

1- To be able to create a compatible app you will need pieman to generate 
the environment of the app, for example, Linux Alpine updated and ready to serve.

2- Chroot command to be able to work on the generated environment, basically 
being able to execute the command inside env to install dependency like python
or nodejs packages.

3- Copy your app inside chrooted env

4- Create a YAML file who will contain your app config to help our os manager
to execute your app, YAML file need to be copied inside chrooted env at the root 
filesystem  (/)



### Follow the next section to understand Step by step how to generate your first app.

