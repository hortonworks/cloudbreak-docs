We have pre-built cloud images for OpenStack with the Cloudbreak Deployer pre-installed and with Cloudbreak
pre-installed. Following steps will guide you through the launch of the images then the needed configuration.

> Alternatively, instead of using the pre-built cloud image, you can install Cloudbreak Deployer on your own VM. See
 [install the Cloudbreak Deployer](onprem.md) for more information.

Please make sure you opened the following ports on your [security group](http://docs.openstack.org/openstack-ops/content/security_groups.html):

 * SSH (22)
 * Cloudbreak (443)

## OpenStack Image Details

### Cloudbreak Deployer image


### Cloudbreak image


## Import the image into your OpenStack

### Cloudbreak Deployer import

```
export OS_IMAGE_NAME=<add_a_name_to_your_new_image>
export OS_USERNAME=<your_os_user_name>
export OS_AUTH_URL=<http://.../v2.0>
export OS_TENANT_NAME=<your_os_tenant_name>
```
Import the new image into your OpenStack:
```
glance image-create --name "$OS_IMAGE_NAME" --file "$CBD_LATEST_IMAGE" --disk-format qcow2 --container-format bare
--progress
```

> **[Minimum and Recommended VM requirements](onprem.md#minimum-and-recommended-system-requirements):** 8GB RAM, 10GB disk, 2 cores

![](/images/os-images.png)
<sub>*Full size [here](/images/os-images.png).*</sub>

### Cloudbreak import

```
export CB_LATEST_IMAGE_NAME=<file_name_of_the_above_cloudbreak_image>
export OS_USERNAME=<your_os_user_name>
export OS_AUTH_URL=<http://.../v2.0>
export OS_TENANT_NAME=<your_os_tenant_name>
```
Import the new image into your OpenStack:
```
glance image-create --name "$CB_LATEST_IMAGE_NAME" --file "$CB_LATEST_IMAGE" --disk-format qcow2
--container-format bare --progress
```
