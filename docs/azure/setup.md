Setting up Cloudbreak on Azure is different than on other cloud providers for which we provide pre-built public images with Cloudbreak Deployer pre-installed. On Azure, you launch Cloudbreak Deployer using the [Azure Resource Manager Templates](https://github.com/Azure/azure-quickstart-templates).

## Deploy Using the Azure Portal

To get started with Cloudbreak installation using the Azure Resource Manager template, click here: <a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fsequenceiq%2Fazure-cbd-quickstart%2F1.16.6%2FmainTemplate.json">  ![deploy on azure](http://azuredeploy.net/deploybutton.png) </a>

## Please upgrade your Cloudbreak Deployer

Install the Cloudbreak Deployer and unzip the platform-specific single binary to your PATH. For example:

```
yum -y install unzip tar
curl -Ls s3.amazonaws.com/public-repo-1.hortonworks.com/HDP/cloudbreak/cloudbreak-deployer_1.16.6_$(uname)_x86_64.tgz | sudo tar -xz -C /bin cbd
cbd --version
```

### VM Requirements

When selecting an instance type, consider these minimum and recomended requirements:  
- 8GB RAM, 10GB disk, 2 cores 
- The minimum instance type suitable for Cloudbreak is **D2**

To learn about all requirements, see [System Requirements](onprem.md#system-requirements).

### Deployment Details

In addition to the default values, the following parameters are **mandatory** for the new `cbd` template:

On the `Custom deployment` panel:

  * Create a new `Resource group`
  * Select an appropriate `Resource group location`

On the `Settings` panel:

| Parameter | Description |
|---|---|
| Admin Username | Create an admin login that you will use to log in to the Cloudbreak UI. Must be a valid email address. |
| Admin User Password | Password for the admin login. Must be at least 8 characters containing letters, numbers, and symbols. |
| Username | Enter an admin username for the virtual machine. You will use it to SSH to the VM. |
| Smartsense | Select  whether you want to use SmartSense telemetry. |
| Remote Location | Allow connections from this address range. Must be a valid CIDR IP. |
| Ssh key| <p>Paste your SSH public key.</p><p>You can use `pbcopy` to quickly copy it. For example: `pbcopy < /Users/homedir/.ssh/id_rsa.pub`</p> |

**Finally** you should review the `Legal terms` from the `Custom deployment` panel:

  * To agree with the terms and conditions, click on `Create` button in this panel
  * Also click on the `Create` button on the `Custom deployment`

> Deployment takes about **15-20 minutes**. You can track the
progress on the resource group details. If any issue has occurred, open the `Audit logs` from the settings.
> We have faced an interesting behaviour on the Azure Portal: [All operations were successful on template deployment,
but overall fail](https://github.com/Azure/azure-quickstart-templates/issues/1294).

  * Once it's successful done, you can reach the Cloudbreak UI
at:```https://<VM Public IP>/```
    * email: admin@example.com
    * password: cloudbreak

### Under the Hood

While Azure is creating the deployment, review this information about what happens in the background:

  * Start an instance from the official CentOS image
  * So no custom image copy is needed, which would take about 30
   minutes
  * Use [Docker VM Extension](https://github.com/Azure/azure-docker-extension) to install Docker
  * Use [CustomScript Extension](https://github.com/Azure/azure-linux-extensions/tree/master/CustomScript) to install
Cloudbreak Deployer (`cbd`)

**Cloudbreak Deployer Highlights**

  * The default SSH username for the Azure VMs is `cloudbreak`.
  * Cloudbreak Deployer location is `/var/lib/cloudbreak-deployment` on the launched `cbd` VM. This is the
      `cbd` root folder there.
  * All `cbd` actions must be executed from the `cbd` root folder.
  * Most of the `cbd` commands require `root` permissions. So it would be worth if you apply the `sudo su`.

### Validate That Cloudbreak Deployer Has Started and Profile has public IP properly configured

- SSH to the launched Azure VM.

- Most of the `cbd` commands require `root` permissions. So it would be worth if you apply the:
```
  sudo su
```
> This is a MUST on Azure because the [Customscript Extension](https://github.com/Azure/azure-linux-extensions/tree/master/CustomScript) which basically creates everything running as sudo and this is not modifiable.

- Open the `cloudbreak-deployment` directory:
```
  cd /var/lib/cloudbreak-deployment
```

- Pre-installed Cloudbreak Deployer version and health:
```
  cbd doctor
```
>If you need to run `cbd update` refer to [Cloudbreak Deployer Update](update.md#update-cloudbreak-deployer). Most of the `cbd` commands require `root` permissions.

- Started Cloudbreak Application logs:
```
   cbd logs cloudbreak
```
>Cloudbreak should start within a minute - you should see a line like this: `Started CloudbreakApplication in 36.823 seconds`
