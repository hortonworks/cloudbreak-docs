## Cluster Deployment

After all the cluster resources are configured you can deploy a new HDP cluster.

Here is a **basic flow for cluster creation on Cloudbreak Web UI**:

 - Start by selecting a previously created Azure credential in the header.
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

 - Select one of the networks
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
 - If you've selected `WASB` you should configure:
    - `Storage Account Name`
    - `Storage Account Access Key`
 - If you've selected `ADLS`, you should specify your preconfigured ADLS account name.   
 - If you would like to have your disks encrypted, check *Encrypt Azure Disks*. For more information, refer to [Azure documentation](https://docs.microsoft.com/en-us/azure/security/azure-security-disk-encryption).
 - Click on the `Review and Launch` button
>`File system` is a mandatory configuration for Azure. You can read more about WASB and ADLS in the [File System Configuration section](azure.md#file-system-configuration).

`Review and Launch` tab

 - After the `create and start cluster` button has clicked Cloudbreak will start to create the cluster's resources on
 your Azure account.

Cloudbreak uses *Azure Resource Manager* to create the resources - you can check out the resources created by Cloudbreak
 on
the `Azure Portal Resource groups` page.
![](/azure/images/azure-resourcegroup.png)
<sub>*Full size [here](/azure/images/azure-resourcegroup.png).*</sub>

Besides these you can check the progress on the Cloudbreak Web UI itself if you open the new cluster's `Event History`.
![](/azure/images/azure-eventhistory.png)
<sub>*Full size [here](/azure/images/azure-eventhistory.png).*</sub>

**Advanced options**

There are some advanced features when deploying a new cluster, these are the following:

`Ambari Username` This user will be used as admin user in Ambari. You can log in using this username on the Ambari UI.

`Ambari Password` The password associated with the Ambari username. This password will be also the default password for all required passwords which are not specified in the blueprint. E.g: hive DB password.

`Minimum cluster size` The provisioning strategy in case the cloud provider cannot allocate all the requested nodes.

`Validate blueprint` This is selected by default. Cloudbreak validates the Ambari blueprint in this case.

`Custom Image` If you enable this, you can override the default image for provision.

`Enable Availability sets` You can set up availability set support if enabled.

`Persistent Storage Name` This is `cbstore` by default. Cloudbreak will copy the image into a storage which is not deleting under the termination. When you starting a new cluster then the provisioning will be much faster because of the existing image.

`Attached Storage Type` This is `single storage for all vm` by default. If are you using the default option then your whole cluster will by in one storage which could be a bottleneck in case of [Azure](https://azure.microsoft.com/hu-hu/documentation/articles/azure-subscription-service-limits/#storage-limits). If you are using the `separated storage for every vm` then we will deploy as much storage account as many node you have and in this case IOPS limit concern just for one node.

`Config recommendation strategy` Strategy for how configuration recommendations will be applied. Recommended
configurations gathered by the response of the stack advisor.

* `NEVER_APPLY`               Configuration recommendations are ignored with this option.
* `ONLY_STACK_DEFAULTS_APPLY` Applies only on the default configurations for all included services.
* `ALWAYS_APPLY`              Applies on all configuration properties.
