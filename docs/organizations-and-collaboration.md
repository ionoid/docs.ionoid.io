# Organizations and Collaboration

Ionoid.io allows you to invite users to your organization and collaborate across
IoT projects.
Each user has its own organization which are private by default, and each project
belongs to one organization.

Organizations are managed by their owners, they are the administrators of the
organization and have full access on everything.

## Accessing Your Organizations

You can view organizations to which you belong and switch between them from the
left sidebar:

![View and siwtch Organizations](/steps/projects-and-devices/switch_org.png)

You can also access the organization settings from the left sidebar under the
*Account* menu:

![Organization settings](/steps/projects-and-devices/org_settings.png)

[Ionoid.io](https://ionoid.io/) organization workflow is inspired from the
[GitHub.com](https://github.com) one.

## Managing organization memberships

Each user has its own private organization where he is the default *Owner*. Users
can invite other Ionoid.io users to their organization in the limits of the
current organization plan.

Owners of an organization can assign specific permission roles to users that
will control how they access the organization resources.

A user can be:

- Privileged administrator known as an [owner](#owners)
- Developer known as a [member](#members)
- Viewer or external user known as a [viewer](#viewers)

### Permission Roles

Permission roles define the access level of users to an organization. Ionoid.io
supports three different access roles or permission roles, and owners should make
sure to assign the right one for each user of their organization.

#### Owners

Owners have complete administrative access to the organization. This role should
be limited to at least two people.

Business projects maintained and managed by one sole organization owner can
become inaccessilbe if the organization owner is unreachable.

::: warning
Our security recommendation is to have at least two people with the *Owner*
permission to ensure that organization access is not lost.
:::

#### Members

Members are organization developers and stuff members. They can create, delete
projects and perform all operations on the devices.

#### Viewers

Viewers are outside collaborators. To keep your organization secure while
allowing access to outside collaborators, a temporary collaborator or viewer can
be added to an organization. This person will have access to the organization
projects and devices but all operations from the dashboard to modify the
organization state including devices will be denied.

A viewer can gather sensitve data about your organization and all the devices,
hence it is recommended to only add trusted collaborators as viewers.

### Summary of Permission Roles

| Organization Operation    |  Owner          |  Member         | Viewer          |
| ------------------------- |:---------------:|:---------------:|:---------------:|
| View projects and devices           |  X              |  X              |  X              |
| Create projects           |  X              |  X              |                 |
| Delete projects           |  X              |  X              |                 |
| Control devices           |  X              |  X              |                 |
| View organization            |  X              |  X                |  X               |
| Invite users to organization            |  X              |                 |                 |
| Change users permissions            |  X              |                 |                 |
| Change organization billing            |  X              |                 |                 |

### Invite Users

To invite or add a user to your organization:

- Go to <the-organization-settings-page/>
- In the *Invite users* section, enter the user email and click the **Add** button

![Invite users to an organization](/steps/projects-and-devices/add_user_to_org.png)

::: tip
The user will be automatically added, in future versions there will be an
invitation system, where the user has to first confirm the invitation before he
is added to the organization.
:::

### Create Users For an Organization

You can not create personal user accounts on behalf of another person.

Each user of an organization needs a personal account that he creates and
registers with at Ionoid.io. After that you can add or invite the user by
entering his email address.

We recommend to share this documentation and how users can create personal
accounts with your collaborators.

### Remove Users

An organization *Owner* can remove other users from an organization if they no
longer require access.

Ionoid.io asks owners to synchronize with users before removing them form
organization. To help the transition process and make sure everything is fine
within your organization and its projects.

To revoke a user's membership from your organization:

- Go to <the-organization-settings-page/>
- In the *Team members* section, remove the user
- Click on the **Save organization settings** button

![Remove users from an organization](/steps/projects-and-devices/remove_user_from_org.png)

::: tip
If a user is a member of only one organization and he is removed from it, then
a new fresh organization will be automatically created for that user, and he
will be assigned to it.
:::

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
