> Mesos support is part of `TECHNICAL PREVIEW`. It may not be suitable for production use.

 At a high level, Cloudbreak deployment on Mesos is similar to Cloudbreak implementations on other cloud providers: HDP clusters are provisioned through Ambari with the help of blueprints, and Ambari server and agents run in Docker containers. However, there are a few major differences that you should consider before you start working with Cloudbreak on Mesos.

## Differences with Other Cloud Provider Implementations

####1. The Mesos integration doesn't start new instances and doesn't build new infrastructure on a cloud provider.

Cloudbreak expects a "bring your own Mesos" infrastructure and expects you to configure access to your Mesos deployment in Cloudbreak first. On other cloud providers, Cloudbreak first builds the infrastructure where Hadoop components are later deployed through Ambari. This involves creating or reusing the networking layer (virtual networks, subnets, and so on), provisioning new virtual machines in these networks from pre-existing cloud images, and starting the Ambari docker containers on these VMs (nodes). However, the Mesos integration was designed *not* to include these steps, because in most cases users already have their own Mesos infrastructure on which they would like to deploy their cluster. 

####2. A Mesos credential in the Cloudbreak UI provides access to the Marathon API.

Marathon is a standard application scheduling framework for services in Mesos. Cloudbreak uses Marathon API to communicate with Mesos, so you need to deploy Marathon on the Mesos cluster and, when setting up access to Mesos in Cloudbreak, specify a Marathon API endpoint. Basic authentication and TLS on the Marathon API are not supported in the technical preview.

####3. A Mesos template in the Cloudbreak UI means resource constraints instead of new resources.

Through the Cloudbreak UI, you can create Cloudbreak templates that define the virtual machines in a cluster's hostgroup that will be provisioned through the cloud provider API. You can create such templates for Mesos and you can link the VMs to a hostgroup, but for Mesos these templates mean resource constraints that will be demanded through the Marathon API, not resources that will created. 
For example:

- An AWS template with an instance type of `m4.large` and 4 pieces of 50 GB attached magnetic volumes will create a VM with these specs when Cloudbreak is building the cluster infrastructure.
- A Mesos template with 2 CPU cores and 4 GB memory means that Cloudbreak will request the Marathon API to schedule the Ambari container on a node where these resources can be satisfied.

####4. Cloudbreak doesn't start a gateway instance.

On the cloud providers there is a gateway VM that's deployed for every new cluster by Cloudbreak. It runs a few containers like Ambari server but most importantly runs an Nginx server. Every communication between a Cloudbreak deployment and a cluster deployed by Cloudbreak goes through this Nginx instance. This is done on a 2-way TLS channel where the Nginx server is responsible for the TLS termination. Communication inside the cluster, like between Ambari server and agents is not encrypted but every communication from outside is secure. It enables Cloudbreak to be deployed outside of the private network of the cluster. The Mesos integration doesn't have a solution like this, so every communication between Cloudbreak and the cluster goes through an unencrypted channel. This is one of the reasons that in this case Cloudbreak should be deployed inside the same private network (or in the same Mesos cluster) where the clusters will be deployed.

## Limitations of the Technical Preview 

####1. No out-of-the-box DNS solution such as Consul.

In case of Mesos, Cloudbreak does not provide a custom DNS solution like on other cloud providers, where Consul is used to provide addresses for every node and some services like Ambari server. In this technucal preview, containers are deployed with `net=host`, and Mesos nodes must be set up manually in a way to be able to resolve each other's hostnames to IP addresses and vice versa with reserve DNS. This is a requirement of Hadoop and it is usually accomplished by setting up the `/etc/hosts` file on each node in the cluster, but it can also be provided by some DNS servers like Amazon's default DNS server in a virtual network.
Example:

- there are 5 nodes in the Mesos cluster: `node1, node2, node3, node4 and node5` with IP addresses of `10.0.0.1 to 10.0.0.5` respectively.
- the `/etc/hosts` file on `node1` should contain these entries:

```
	10.0.0.2 node2
	10.0.0.3 node3
	10.0.0.4 node4
	10.0.0.5 node5
```

####2. Cloudbreak must be able to resolve the addresses of the Mesos slaves.

To make API requests (for example, to create a cluster), Cloudbreak must communicate with the Ambari server deployed in the Mesos cluster. After Cloudbreak instructs Marathon to deploy the Ambari server container somewhere in the Mesos cluster, it asks Marathon for the address of the node where the Ambari server was deployed and then tries to communicate with the Ambari server through that address. For example, consider the following scenario where Mesos cluster has 5 registered nodes: `node1, node2, node3, node4, node5`:

- Cloudbreak makes a `POST` request to the Marathon API to deploy the Ambari server container somewhere with enough resources.
- Marathon starts an Ambari server container on `node4`, then return the node address to Cloudbreak.
- Cloudbreak tries to access `node4:8080` to make sure that Ambari server is running.

Considering that there is no gateway node and so the communication between Cloudbreak and the clusters is unencrypted, we suggest that you deploy Cloudbreak in the same private network as the clusters. If Cloudbreak is not in the same network as the clusters, add the addresses with a reachable IP to the `/etc/hosts` file on the machine where Cloudbreak is deployed.

####3. Storage management needs to be improved

This is one of the two biggest limitations of the current Mesos integration. The current integration doesn't offer volume management, which means that data is stored inside Docker containers. This solution has a few problems that will be addressed in future releases:

- Data can only be stored on the volumes where Docker is installed (typically the root volume), and not on attached volumes
- After the container is destroyed, the data is destroyed as well
- There is no data locality

####4. IP-per-task is not supported yet

The second big limitation of the current Mesos integration is the lack of IP-per-task support. IP-per-task means that every task of an app (all the containers) deployed through Marathon will get their own network interface and an IP address. [This feature](https://mesosphere.github.io/marathon/docs/ip-per-task.html) is already available in Marathon but does not work in combination with Docker containers. In our current Mesos integration, containers are deployed with `net=host`, which means that to avoid port collisions only one container can be deployed per Mesos host; this is the case even with multiple clusters.

####5. Recipes are not supported

Recipes (script extensions to an HDP cluster installation, supported by Cloudbreak) are not supported in the Mesos integration. Recipes are dependent on Consul's HTTP API, and the Mesos integration does not support Consul.
