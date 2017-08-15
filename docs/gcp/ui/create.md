## Cluster Deployment

After all the cluster resources are configured you can deploy a new HDP cluster.

Here is a **basic flow for cluster creation on Cloudbreak Web UI**:

 - Start by selecting a previously created GCP credential in the header.
 - Open `create cluster`

`Configure Cluster` tab

 - Fill out the new cluster `name`
    - Cluster name must start with a lowercase alphabetic character then you can apply lowercase alphanumeric and 
   hyphens only (min 5, max 40 characters)
 - Select a `Region` where you like your cluster be provisioned
 - Click on the `Setup Network and Security` button
>If `Public in account` is checked all the users belonging to your account will be able to see the created cluster on
 the UI, but cannot delete or modify it.

`Setup Network and Security` tab

 - Select one of the security groups
 - Click on the `Choose Blueprint` button
>If `Enable security` is checked as well, Cloudbreak will install Key Distribution Center (KDC) and the cluster will 
be Kerberized. See more about it in the [Kerberos](kerberos.md) section of this documentation.

`Choose Blueprint` tab

 - Select one of the blueprint
 - After you've selected a `Blueprint`, you should be able to configure:
    - the templates
    - the securitygroups
    - the number of nodes for all of the host groups in the blueprint
 - You need to select where you want to install the Ambari server to. Only 1 host group can be selected.
   If you want to install the Ambari server to a separate node, you need to extend your blueprint with a new host group
   which contains only 1 service: HDFS_CLIENT and select this host group for the Ambari server. Note: this host group cannot be scaled so 
   it is not advised to select a 'slave' host group for this purpose.
 - Click on the `Add File System` button

`Add File System` tab

 - Select one of the file system that fits your needs
 - After you've selected `GCS file system`, you should configure:
    - `Default Bucket Name`
 - Click on the `Review and Launch` button
>You can read more about [GCS File System](https://cloud.google.com/storage/docs/gcs-fuse) and [Bucket Naming](https://cloud.google.com/storage/docs/naming#requirements) in GCP 
Documentation.

`Review and Launch` tab

 - After the `create and start cluster` button has clicked Cloudbreak will start to create the cluster's resources on 
 your GCP account.

Cloudbreak uses *Google Cloud Platform* to create the resources - you can check out the resources created by Cloudbreak
 on the `Compute Engine` page of the `Google Compute Platform`.
![](/gcp/images/gcp-computeengine.png)
<sub>*Full size [here](/gcp/images/gcp-computeengine.png).*</sub>

Besides these you can check the progress on the Cloudbreak Web UI itself if you open the new cluster's `Event History`.
![](/gcp/images/gcp-eventhistory.png)
<sub>*Full size [here](/gcp/images/gcp-eventhistory.png).*</sub>

### Advanced Options

There are some advanced features when deploying a new cluster, these are the following:

`Ambari Username` This user will be used as admin user in Ambari. You can log in using this username on the Ambari UI.

`Ambari Password` The password associated with the Ambari username. This password will be also the default password for all required passwords which are not specified in the blueprint. E.g: hive DB password.

`Availability Zone` You can restrict the instances to a [specific availability zone](https://cloud.google.com/compute/docs/zones). It may be useful if you're using
 reserved instances.

`Minimum cluster size` The provisioning strategy in case the cloud provider cannot allocate all the requested nodes.

`Validate blueprint` This is selected by default. Cloudbreak validates the Ambari blueprint in this case.

`Custom Image` If you enable this, you can override the default image for provision.

`Config recommendation strategy` Strategy for how configuration recommendations will be applied. Recommended 
configurations gathered by the response of the stack advisor. 

* `NEVER_APPLY`               Configuration recommendations are ignored with this option.
* `ONLY_STACK_DEFAULTS_APPLY` Applies only on the default configurations for all included services.
* `ALWAYS_APPLY`              Applies on all configuration properties.
