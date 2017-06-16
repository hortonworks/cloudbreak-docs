# Get Help

## Options for Getting Help

If you need help with Cloudbreak, you have two options:

| Option | Description |
|---|---|
| Hortonworks Community Connection |	This is free optional support via Hortonworks Community Connection.|
| Hortonworks Flex Support Subscription | This is paid Hortonworks enterprise support.|

## HCC

You can optionally register for optional free community support at [Hortonworks Community Connection](https://community.hortonworks.com/answers/index.html) where you can browse articles and previously answered questions, and ask questions of your own. When posting questions related to Cloudbreak, make sure to use the "Cloudbreak" tag.

## Flex Subscription

You can optionally use your existing Hortonworks [Flex Subscriptions](https://hortonworks.com/services/support/enterprise/) to cover the Cloudbreak node and all clusters created. To do that you must:

1. Configure SmartSenseID and Telemetry in your `Profile` file.   
2. Register your Flex Subscription in the Cloudreak web UI.

Once you've performed these steps, your flex subscription can be used for the Cloudbreak node and all newly created clusters. You can register multiple subscriptions and manage them in the cloud controller UI.

For general information about the Hortonworks Flex Support Subscription, visit the Hortonworks Support page at [https://hortonworks.com/services/support/enterprise/](https://hortonworks.com/services/support/enterprise/).

### Configuring Flex

1. To configure flex in Cloudbreak, enable SmartSense in the Profile by adding the following variables:

    <pre>export CB_SMARTSENSE_ID=YOUR-SMARTSENSE-ID  
    export CB_SMARTSENSE_CONFIGURE=true</pre>

    For example:
 
    <pre>export CB_SMARTSENSE_ID=A-00000000-C-00000000  
    export CB_SMARTSENSE_CONFIGURE=true</pre>

You can do this in one of the two ways:

* When initiating Cloudbreak  
* After you've already initiated Cloudbreak Deployer. In this case, you must restart Cloudbreak using `cbd restart`.

### Managing Flex Subscriptions

Once you log in to the Cloudbreak web UI, you can manage your flex subscriptions from the manage flex subscriptions tab. From this tab, you can:

* Register a new flex subscription.  
* Set a default flex subscription.  
* Select a flex subscription to be used for cloud controller.  
* Delete a flex subscription.  
* Check which clusters are connected to a specific subscription.  

When creating a cluster using the advanced options, in the **CONFIGURE CLUSTER** > **Flex Subscriptions**, you can select the flex subscription that you want to use.

Equivalent options are also available via Cloudbreak Shell. 
