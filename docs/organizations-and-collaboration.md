# Organizations and Collaboration

## Overview

Ionoid.io allows you to invite users to your organization and collaborate across IoT projects.
Each user has its own organization which are private by default, and each project belongs to one organization.

Organizations are managed by the owners, they are the administrators of the organization and have full access on
everything.


## Accessing your organizations

A user you can view his organizations and switch between them from the left menu.

![View and siwtch Organizations](/steps/Ionoid.io-switch-organizations.png)


To access the organization settings from the left menu: `Account -> Organization`.

![Organization settings](/steps/Ionoid.io-organization-settings.png)


[Ionoid.io](https://ionoid.io/) organization workflow is inspired from [GitHub.com](https://github.com) workflow.



## Managing organization memberships

Each user has its own private organization where he is the default `owner`. Users can invite other
Ionoid.io users to their organization if the current organization plan allows it.

Owners of an organization can assign specific permission roles to users that will control how
they access the organization resources.

A user can be:

1. Privileged administrator known as an `owner`

2. Developer known as a `member`

3. Viewer or external user known as a `viewer`


### Permission roles

Permission roles define the access level of users to an organization. Ionoid.io supports three different access roles or
permission roles, and owners should make sure to assign the right one for each user of their organization.


#### Owners

Owners have complete administrative access to the organization. This role should be limited to at least two people.

Business projects maintained and managed by one sole organization owner can become inaccessilbe if the organization owner
is unreachable. **Our security recommendation is to have at least two people with `owner` permission to ensure that
organization access is not lost.**

#### Members

Members are organization developers and stuff members. They can create, delete projects and perform all operations on
the devices.

#### Viewers

Viewers are outside collaborators. To keep your organization secure while allowing access to outside collaborators,
a temporary collaborator or viewer can be added to an organization. This person will have access to the organization
projects and devices but all operations from the dashboard to modify the organization state including devices will be
denied.

A viewer can gather sensitve data about your organization and all the devices, hence it is recommended to only add
trusted collaborators as viewers.


#### Summary of Permission roles

| Organization Operation    |  Owner          |  Member         | Viewer          |
| ------------------------- |:---------------:|:---------------:|:---------------:|
| View projects and devices           |  X              |  X              |  X              |
| Create projects           |  X              |  X              |                 |
| Delete projects           |  X              |  X              |                 |
| Control devices           |  X              |  X              |                 |
| View organization            |  X              |  X                |                 |
| Invite users to organization            |  X              |                 |                 |
| Change users permissions            |  X              |                 |                 |
| Change organization billing            |  X              |                 |                 |



### Inviting Users

To invite or add a user to your organization:

1. Go to your organization settings `Account -> Organization`

2. In `Invite users` section, enter the `user email` and click `Add`


The user will be automatically added, in future versions there will be an invitation system, where the user has to first
confirm the invitation before he is added to the organization.


![Invite users to an organization](/steps/Ionoid.io-add-users-to-organization.png)


### Creating users for an organization

You can not create personal user accounts on behalf of another person.

Each user of an organization needs a personal account that he creates and registers with at Ionoid.io. After that you
can add or invite the user by entering his email address.

We recommend to share this documentation and how users can create personal accounts with your collaborators.


### Removing Users

Organization `owner` can remove other users from an organization if they no longer require access.

Ionoid.io asks owners to synchronize with users before removing them form organization. To help the transition process
and make sure everything is fine within your organization and its projects.

To revoke a user's membership from your organization:

1. Go to your organization settings `Account -> Organization`

2. In `Team members` section, remove the user

3. Click `Save organization settings`


If a user is a member of only one organization and he is removed from it, then a new fresh organization
will be automatically created for that user, and he will be assigned to it.


![Remove users from an organization](/steps/Ionoid.io-remove-users-from-organization.png)
