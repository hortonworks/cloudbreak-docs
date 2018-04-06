We have pre-built Cloudbreak Deployer cloud images for AWS with the Cloudbreak Deployer pre-installed. Go to your [AWS Management Console](https://aws.amazon.com/console/) to launch the latest Cloudbreak Deployer image in your region.  

> As an alternative to using the pre-built cloud images for AWS, you can install Cloudbreak Deployer on your own VM. For more information, see the [installation instructions](onprem.md).

## Prerequisites

#### Ports 

Make sure that you have opened the following ports on your [security group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html):
 
* SSH (22)
* Cloudbreak (443)

## Cloudbreak Deployer AWS Image Details

## Please upgrade your Cloudbreak Deployer

Install the Cloudbreak Deployer and unzip the platform-specific single binary to your PATH. For example:

```
cd /var/lib/cloudbreak-deployment/
curl -Ls s3.amazonaws.com/public-repo-1.hortonworks.com/HDP/cloudbreak/cloudbreak-deployer_1.16.6_$(uname)_x86_64.tgz | sudo tar -xz -C /bin cbd
cbd --version
```

## VM Requirements
When selecting an instance type, consider these minimum and recomended requirements:  

- 16GB RAM, 10GB disk, 4 cores. 
- The minimum instance type which is suitable for Cloudbreak is **m3.large**.

To learn about all requirements, see [System Requirements](onprem.md#system-requirements).



 
