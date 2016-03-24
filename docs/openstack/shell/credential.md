## Setting up OpenStack credential

Cloudbreak works by connecting your OpenStack account through so called Credentials, and then uses these credentials to 
create resources on your behalf. Credentials can be configured with the following command for example:

```
credential create --OPENSTACK --name my-os-credential --description "sample description" --userName <OpenStack username> --password <OpenStack password> --tenantName <OpenStack tenant name> --endPoint <OpenStack Identity Service (Keystone) endpoint> --sshKeyString "ssh-rsa AAAAB****etc"
```

>**NOTE** that Cloudbreak **does not set your cloud user details** - we work around the concept of [OpenStack's 
authentication](http://developer.openstack.org/api-guide/quick-start/api-quick-start
.html#authentication-and-api-request-workflow). You should have already valid OpenStack credentials. You can 
find further details [here](openstack.md#provisioning-prerequisites).

Alternatives to provide `SSH Key`:

- you can upload your public key from an url: `—sshKeyUrl` 
- or you can add the path of your public key: `—sshKeyPath`

Other available option:

`--facing` URL perspective in which the API is accessing data, allowed types are: public, admin and internal

You can check whether the credential was created successfully

```
credential list
```

You can switch between your existing credentials

```
credential select --name my-os-credential
```
