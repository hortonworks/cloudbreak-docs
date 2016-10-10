# Platform Tagging

> This feature is part of `TECHNICAL PREVIEW`.

You can define platform tags and attach them to credentials, networks, and templates to bundle together different configurations.

## Data Locality and Topologies

The [OpenStack documentation](http://docs.openstack.org/developer/sahara/icehouse/userdoc/features.html#data-locality) says this about data locality: "It is extremely important for data processing to do locally (on the same rack, OpenStack compute node or even VM) as much work as possible. Hadoop supports data-locality feature and can schedule jobs to task tracker nodes that are local for input stream. In this case task tracker could communicate directly with local data node."

### OpenStack Topology Mapping

You can create a topology mapping, which associates hypervisors with racks, and then attach it to the platform definition. 
You can set the mapping in the Cloudbreak UI or in CLI by defining it line by line or uploading the mapping in a file.

The `mapping file` should have the following format:

    hypervisor1 /rack1
    hypervisor2 /rack2
    hypervisor3 /rack2

Based on this mapping, the Cloudbreak application ensures that the rack information of the started VMs will be passed to Hadoop services via Ambari.

## Platform Configuration Through Cloudbreak UI

### Manage Platform Configuration

>You can log in to the Cloudbreak application at https://PUBLIC_IP:443. You can find the provider-specific documentation here:
>
* [AWS](aws.md)
* [Azure](azure.md)
* [GCP](gcp.md)
* [OpenStack](openstack.md)

To create a new platform configuration:

  1. Go to the **manage platforms** panel. 
  2. Select `OpenStack` from cloud provider tabs.
  3. Fill out the new configuration `Name`.
  4. Complete the `Topology Mapping` section based on the above examples. Add mapping line by line or upload a mapping file. 

![](/images/platform-create.png)
<sub>*Full size [here](/images/platform-create.png).*</sub>

>**NOTE:** Platform name is the only required parameter.

Explanation of the parameters:

Required parameters:

- `Name` - name for the new configuration
    - Starts with a lowercase alphabetic character 
    - Contains lowercase alphanumeric and hyphens only
    - Includes min 5 and max 100 characters

Optional parameters:

- `Description` - description for the new configuration (Up to 1000 characters)
- `Upload Mapping File` - file containing mapping definition
    - For details, see [Openstack Topology Mapping section](#openstack-topology-mapping)
- `Topology Mapping`:
    - `Hypervisor` - your hypervisor name
    - `Rack` - the rack name for hypervisor

### Enable Platform Configuration

You can apply your Cloudbreak platform configuration in the following panels:

- `create network`
- `create credential`
- `create template`

To create a new network with a previously created configuration, follow these steps in the **create network** panel:

  1. From cloud provider tabs, select `OpenStack`.
  2. Enter the new network `Name`.
  3. Enter your network `Subnet (CIDR)`.
  4. Enter your `Public Network ID`.
  5. Uder `Select Platform`, select your previously created platform.

![](/images/platform-select_v2.png)
<sub>*Full size [here](/images/platform-select_v2.png).*</sub>

>**IMOPRTANT:** If you assign a platform to a selected credential, then only networks and templates associated with that credential can
 be selected during cluster creation.

## Platform Configuration via CLI

### Manage Platform Configuration

>Start the shell with `cbd util cloudbreak-shell` on a console. This will launch the Cloudbreak shell inside a Docker
 container and you can start using it. For more information, see [Cloudbreak Shell](shell.md).

Here are two examples:
For `AWS`:
```
# Creating a Platform
platform create --AWS --name platform-name --description 'description of the platform'
```
For `OPENSTACK`:
```
# Creating OpenStack Platform with topology mapping
platform create --OPENSTACK --name platform-name --description 'openstack platform' --file file_path
platform create --OPENSTACK --name platform-name --description 'openstack platform' --url url_to_file
```

### Enable Platform Configuration

You can use the following Cloudbreak shell commands to set a platform for a resource:

- `network create`
- `credential create`
- `template create`

Here is an example shell command to create a new network with a connected platform:
```
network create --AWS --name aws-network --subnet 10.10.10.0/24 --description 'example network' --platformId 26
```

>**IMOPRTANT:** If you assign a platform to a selected credential, then only networks and templates associated with that credential can
 be selected during cluster creation.
