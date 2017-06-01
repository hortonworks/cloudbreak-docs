## Setting up Azure Credential

Cloudbreak connects to your Azure account through so called *credential*, using it to 
create resources on your behalf. In order to connect to Azure, you must first configure the credential in the **manage credentials** panel on the Cloudbreak dashboard.

There are two ways to create a new Azure credential:

- Interactive login
- App based
  
## Interactive Login

Interactive login based credential creation is fully automated: the creation of the necessary Azure resources (application and service principal) is performaned automatically by Cloudbreak application itself. All you need to do is provide only a minimal set of inputs. 

#### Prerequisites

Before you can use interactive login, you must provide your tenant ID and subscription ID in your Profile:

`export AZURE_TENANT_ID=********-d98e-4c64-9301-**************`

`export AZURE_SUBSCRIPTION_ID=********-8a1d-4ac9-909b-************`

#### Steps

1. Provide the `Name` for your new credential
    * Only alphanumeric and lowercase characters (min 5, max 100 characters) can be used
  
2. Copy your SSH public key to the `SSH public key` field
    * The SSH public key must be in the OpenSSH format. The matching private key can be used later to [SSH onto every instance](operations.md#ssh-to-the-hosts) of every cluster that you'll create with this credential. The **SSH username** for the Azure instances is always **cloudbreak**.

3. Select Azure role type. You have the option to decide if Cloudbreak should use the built-in `Contributor` Azure role, a custom existing role, or a new role for managing cluster resources in Azure. 
    You have the following options:
    * `Use existing "Contributor" role`
        * This is the default behaviour which needs no further input and will assign Cloudbreak service principal `Contributor` role for your subscription
    * `Reuse existing custom role`
        * You can reuse an existing Azure role as long as it has the required minimal permissions necessary for Cloudbreak to be able the manage the cluster's resources. It returns an error if no role with the specified name exists or if the role does not have the required permissions. 
    * `Let Cloudbreak create a custom role`
        * Choosing this option will let the Cloudbreak application create the Azure role with the necessary permissions. It returns an error if a role with the specified name alerady exists.

> The necessary Action set for Cloudbreak to be able to manage the clusters include:
                    "Microsoft.Compute/\*",
                    "Microsoft.Network/\*",
                    "Microsoft.Storage/\*",
                    "Microsoft.Resources/\*"
  
4. Click 'Next'. You will see a device code on the screen. Click on the 'Azure login' button and enter the code on the Azure Portal: 

    ![](/azure/images/azure-device-code.png "Azure device code")
  
5. Select the account that you wish to use 
    * This account must be in the same subscription and tenant what you previously provided in your Profile; otherwise the credential creation will fail. 
    
    ![](/azure/images/azure-select-account.png "Select account") 
  
6. After that you should see a progress bar, similar to that presented on the image below: 

    ![](/azure/images/azure-interactive-3.png)

## App Based

>Refer to the [Provisioning prerequisites](azure.md#azure-application-setup-with-cloudbreak-deployer) for the instructions on how to get the mandatory `Subscription ID`, `App ID`, `Password` and `App Owner Tenant ID` for your Cloudbreak credential.

1. Provide the `Name` for your new credential
    * Only alphanumeric and lowercase characters (min 5, max 100 characters) can be used 
2. Copy your Azure Subscription ID to the `Subscription Id` field

    ![](/azure/images/azure-subscription.png)
    <sub>*Full size [here](/azure/images/azure-subscription.png).*</sub>

3. Copy your Azure Active Directory application information:
    * ID to the `App Id` field
    * Password to the `Password` field
    * `App Owner Tenant Id` field

    ![](/azure/images/azure-application.png)
    <sub>*Full size [here](/azure/images/azure-application.png).*</sub>

4. Copy your SSH public key to the `SSH public key` field
    * The SSH public key must be in the OpenSSH format. The matching private key can be used later to [SSH onto every instance](operations.md#ssh-to-the-hosts) of every cluster that you'll create with this credential. The **SSH username** for the Azure instances is always **cloudbreak**.

>All other parameters are optional.

>`Public in account` means that all the users belonging to your account will be able to use this credential to create 
clusters, but they cannot delete them.

> Cloudbreak is supporting simple rsa public key instead of X509 certificate file after 1.0.4 version

![](/azure/images/azure-credentials.png)
<sub>*Full size [here](/azure/images/azure-credentials.png).*</sub>

## Infrastructure Templates

After your Azure account has been linked to Cloudbreak, you can start creating resource templates that describe your clusters' 
infrastructure:

- templates
- networks
- security groups

When you create one of the above resources, **Cloudbreak does not make any requests to AZURE. Resources are only created
 on AZURE after the `create cluster` button has pushed.** These templates are saved to Cloudbreak's database and can be 
 reused with multiple clusters to describe the infrastructure.
