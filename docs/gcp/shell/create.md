## Cluster Deployment

After all the cluster resources are configured you can deploy a new HDP cluster. The following sub-sections show 
you a **basic flow for cluster creation with Cloudbreak Shell**.

#### Select Credential

Select one of your previously created GCP credential:
```
credential select --name my-gcp-credential
```

#### Select Blueprint

Select one of your previously created blueprint which fits your needs:
```
blueprint select --name multi-node-hdfs-yarn
```

#### Configure Instance Groups

You must configure instance groups before provisioning. An instance group define a group of nodes with a specified 
template. Usually we create instance groups for host groups in the blueprint. For Ambari server only 1 host group can be specified.
If you want to install the Ambari server to a separate node, you need to extend your blueprint with a new host group
which contains only 1 service: HDFS_CLIENT and select this host group for the Ambari server. Note: this host group cannot be scaled so 
it is not advised to select a 'slave' host group for this purpose.

```
instancegroup configure --instanceGroup master --nodecount 1 --templateName minviable-aws --securityGroupName all-services-port --ambariServer true
instancegroup configure --instanceGroup slave_1 --nodecount 1 --templateName minviable-aws --securityGroupName all-services-port --ambariServer false
```
Other available option:

`--templateId` Id of the template

#### Select Network

Select one of your previously created network which fits your needs or a default one:
```
network select --name default-gcp-network
```

#### Create Stack / Create Cloud Infrastructure

Stack means the running cloud infrastructure that is created based on the instance groups configured earlier 
(`credential`, `instancegroups`, `network`, `securitygroup`). Same as in case of the API or UI the new cluster will 
use your templates and by using GCP will launch your cloud stack. Use the following command to create a 
stack to be used with your Hadoop cluster:
```
stack create --GCP --name mygcpstack --region us-central1
```
The infrastructure is created asynchronously, the state of the stack can be checked with the stack `show command`. If 
it reports AVAILABLE, it means that the virtual machines and the corresponding infrastructure is running at the cloud provider.

Other available option is:

`--wait` - in this case the create command will return only after the process has finished. 

#### Create a Hadoop cluster / Cloud Provisioning

**You are almost done! One more command and your Hadoop cluster is starting!** Cloud provisioning is done once the 
cluster is up and running. The new cluster will use your selected blueprint and install your custom Hadoop cluster 
with the selected components and services.

```
cluster create --description "my first cluster"
```
Other available option is `--wait` - in this case the create command will return only after the process has finished. 

**You are done!** You have several opportunities to check the progress during the infrastructure creation then 
provisioning:

- Cloudbreak uses *Google Cloud Platform* to create the resources - you can check out the resources created by 
Cloudbreak on the Compute Engine page of the Google Compute Platform..

![](/gcp/images/gcp-computeengine_2.png)
<sub>*Full size [here](/gcp/images/gcp-computeengine_2.png).*</sub>

- If stack then cluster creation have successfully done, you can check the Ambari Web UI. However you need to know the 
Ambari IP (for example: `http://130.211.163.13:8080`): 
    - You can get the IP from the CLI as a result (`ambariServerIp 130.211.163.13`) of the following command:
```
         cluster show
```

![](/images/ambari-dashboard_3.png)
<sub>*Full size [here](/images/ambari-dashboard_3.png).*</sub>

- Besides these you can check the entire progress and the Ambari IP as well on the Cloudbreak Web UI itself. Open the 
new cluster's `details` and its `Event History` here.

![](/gcp/images/gcp-eventhistory_2.png)
<sub>*Full size [here](/gcp/images/gcp-eventhistory_2.png).*</sub>

