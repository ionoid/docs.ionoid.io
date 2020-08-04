### Deployment Settings

Here you can configure applications deployment settings:

- **Application dual A/B deployment**: if enabled, and if the deployed application is an archive app, then there
will be two copies of the application stored in device storage. This is known as the **dual A/B** workflow, where for
each new deployment of the application; we keep the previous one where we can rollback to it, in order to recover from errors, application bugs, etc.
Before activating this feature, please make sure you have enough space storage on devices for the uncompressed
application files. Usually if your uncompressed application takes up less than 30% of the entire storage, then it should be fine.

- **Application delta updates**: if enabled, and if the application is an archive app, then the update mechanism will only download
the generated `xdelta.xd3` file that represent the files that have changed, and use it to reconstruct the original archive file.
This allows to reduce download time and bandwidth usage drastically.
Before activating this feature, please make sure to read the Application delta update documentation and how it works.
