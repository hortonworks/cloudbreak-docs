# Auto-Scaling

The goal of **auto-scaling** is to apply Service Level Agreement (SLA) scaling policies to a Cloudbreak-managed HDP cluster.

The auto-scaling capability is based on [Ambari Metrics](https://cwiki.apache.org/confluence/display/AMBARI/Metrics) and [Ambari Alerts](https://cwiki.apache.org/confluence/display/AMBARI/Alerts). Based on the blueprint
used and the services running, Cloudbreak accesses all available metrics from the subsystem and defines alerts based on these metrics.

## Enable Auto-scaling through Cloudbreak UI 

Choose `enable` to enable auto-scaling:

![](/images/enable_periscope_v2.png)
<sub>*Full size [here](/images/enable_periscope_v2.png).*</sub>

## Alerts

Auto-scaling supports two alert types: **metric** and **time** based.

### Metric-based Alerts

Metric-based alerts use Ambari metrics. These metrics have a default `Threshold` value configured in Ambari, which you can modify in Ambari web UI.

#### Change Default Threshold for an Ambari Metric

To change default threshold for an Ambari metric:

1. Log in to Ambari web UI. 
2. From the header menu, select `Alerts` to open the **Alerts** page. 
3. Select an alert from the list. 
4. In the `Configuration` panel, click on `Edit`. 
5. Now you can modify the values in the `Threshold` section. 

![](/images/ambari_threshold_v2.png)
<sub>*Full size [here](/images/ambari_threshold_v2.png).*</sub>

#### Create a New Metric-based Alert

To create a new Cloudbreak metric-based alert in the Cloudbreak web UI:

1. Enter the `alert name`. Only alphanumeric characters (min 5, max 100 characters) are allowed.
2. Enter a `description` for the new alert.
3. Select a `metric`, and then its `desired state`. The Ambari metrics available are based on installed services and their state is based on the Ambari threshold value:
    * OK
    * WARN 
    * CRITICAL 
4. Enter the `period` (in minutes) to define the metric state endurance after the alert has been triggered. Only numeric characters are allowed.

![](/images/metric_alert_v2.png)
<sub>*Full size [here](/images/metric_alert_v2.png).*</sub>

### Time-based Alerts

Time-based alerts are based on `cron` expressions, allowing alerts to be triggered based on time.

#### Create a Time-based Alert

To create a new Cloudbreak time-based alert in the Cloudbreak UI::

1. Enter `alert name`. Only alphanumeric characters (min 5, max 100 characters) are allowed.
2. Enter `description` for the new alert.
3. Select a `time zone` for the new alert.
4. Provide the `cron expression` to define the time-based job scheduler (*cron* expression) for this alert.

![](/images/time_alert_v2.png)
<sub>*Full size [here](/images/time_alert_v2.png).*</sub>

## Scaling Policies

Scaling is the ability to increase or decrease the capacity of the HDP cluster or an application running on it based on an alert and according to the policy definition. After you set up your alerts and a scaling policy linked to them, Cloudbreak will execute the policy. 

Scaling granularity is at the `host group` level; Thus you have an option to scale services or components only, not the whole cluster.

### Create a New Scaling Policy

To create a new Cloudbreak scaling policy:

1. Enter the `policy name`. Only alphanumeric characters (min 5, max 100 characters) are allowed.
2. Select a type first, and then a value for the `scaling adjustment`:
    * `node count` - number of nodes (added or removed)
    * `percentage` - computed percentage adjustment based on the cluster size
    * `exact` - given size of the cluster
3. Select the Ambari `host group` where the cluster is to be scaled.
4. Select the previously created Cloudbreak `alert` to apply the scaling policy to it.

![](/images/policy_v2.png)
<sub>*Full size [here](/images/policy_v2.png).*</sub>

## Cluster Scaling Configurations

An SLA scaling policy can contain multiple alerts. When an alert is triggered, a `scaling adjustment` is applied. 

To make sure the scaling this adjustemnt doesn't oversize or undersize your cluster, you can keep the cluster size within defined boundaries using `cluster size min.` and `cluster size max.`

To avoid stressing the cluster, we have introduced a `cooldown time` period (in minutes). When an alert is raised and there is an associated scaling policy, the system will not apply the policy within the configured cooldown timeframe.

> **Note:** In an SLA scaling policy the triggered rules are applied in order.

![](/images/scaling_config_v2.png)
<sub>*Full size [here](/images/scaling_config_v2.png).*</sub>

Explanation of the parameters:

* `cooldown time` - the cluster lockdown period (in minutes) between scaling events
* `cluster size min.` - the minimum cluster size limit, despite scaling adjustments
* `cluster size max.` - the maximum cluster size limit, despite scaling adjustments


## Downscale Scaling Considerations

To keep your cluster healthy, Cloudbreak auto-scaling runs several background checks during `downscale` operation.

* Cloudbreak will never remove `application master nodes` from a cluster. In order to make sure that a node running Ambari Metrics is not 
removed, Cloudbreak has to be able to access the YARN Resource Manager. When creating a cluster using the 
`default` secure network template, make sure that the RM's port is open on that node.
* In order to keep a healthy HDFS during downscale, Cloudbreak always keeps the `replication factor` configured and makes sure that there is enough `space` on HDFS to rebalance data.
* During downscale, in order to minimize the rebalancing, replication, and HDFS storms, Cloudbreak checks block locations 
and computes the least costly operations.

The [API documentation](https://app.swaggerhub.com/api/Cloudbreak/Periscope/1.16.1) was generated from the code using [Swagger](http://swagger.io/).