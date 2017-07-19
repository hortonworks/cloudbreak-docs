# Blueprints

For your convenience, Cloudbreak provides a list of default HDP cluster blueprints. You can also build and use your own blueprint.


| Name | Description | Services | Source |
|----|----|---|---|
| hdp-small-default | Launch a multi-node HDP 2.4 cluster. | HDFS, YARN, MAPREDUCE2, KNOX, HBASE, HIVE, HCATALOG, WEBHCAT, SLIDER, OOZIE, PIG, SQOOP, METRICS, TEZ, FALCON, ZOOKEEPER | [hdp-small-default.bp](https://raw.githubusercontent.com/hortonworks/cloudbreak/master/core/src/main/resources/defaults/blueprints/hdp-small-default.bp) |
| hdp-streaming-cluster | Launch a multi-node HDP 2.4 cluster optimized for streaming. | HDFS, YARN, MAPREDUCE2, STORM, KNOX, HBASE, HIVE, HCATALOG, WEBHCAT, SLIDER, OOZIE, PIG, SQOOP, METRICS, TEZ, FALCON, ZOOKEEPER | [hdp-streaming-cluster.bp](https://raw.githubusercontent.com/hortonworks/cloudbreak/master/core/src/main/resources/defaults/blueprints/hdp-streaming-cluster.bp) |
| hdp-spark-cluster | Launch a multi-node HDP 2.4 cluster optimized for Spark analytic jobs. | HDFS, YARN, MAPREDUCE2, SPARK, ZEPPELIN, KNOX, HBASE, HIVE, HCATALOG, WEBHCAT, SLIDER, OOZIE, PIG, SQOOP, METRICS, TEZ, FALCON, ZOOKEEPER | [hdp-spark-cluster.bp](https://raw.githubusercontent.com/hortonworks/cloudbreak/master/core/src/main/resources/defaults/blueprints/hdp-spark-cluster.bp) |

## Components

Ambari supports the concept of stacks and associated services in a stack definition. By leveraging the stack definition, Ambari has a consistent and defined interface to install, manage, and monitor a set of services, and provides extensibility model for new stacks and services to be introduced.

At a high level, the supported components can be grouped into two main categories: master and slave. The components are bundled together, forming specific services:

| Services    | Components                                                              |
|:----------- |:------------------------------------------------------------------------|
| HDFS		    | DATANODE, HDFS_CLIENT, JOURNALNODE, NAMENODE, SECONDARY_NAMENODE, ZKFC  |
| YARN		    | APP_TIMELINE_SERVER, NODEMANAGER, RESOURCEMANAGER, YARN_CLIENT          |
| MAPREDUCE2	| HISTORYSERVER, MAPREDUCE2_CLIENT                                        |
| HBASE		    | HBASE_CLIENT, HBASE_MASTER, HBASE_REGIONSERVER                          |
| HIVE		    | HIVE_CLIENT, HIVE_METASTORE, HIVE_SERVER, MYSQL_SERVER                  |
| HCATALOG	  | HCAT                                                                    |
| WEBHCAT		  | WEBHCAT_SERVER                                                          |
| OOZIE		    | OOZIE_CLIENT, OOZIE_SERVER                                              |
| PIG		      | PIG                                                                     |
| SQOOP		    | SQOOP                                                                   |
| STORM		    | DRPC_SERVER, NIMBUS, STORM_REST_API, STORM_UI_SERVER, SUPERVISOR        |
| TEZ		      | TEZ_CLIENT                                                              |
| FALCON		  | FALCON_CLIENT, FALCON_SERVER                                            |
| ZOOKEEPER	  | ZOOKEEPER_CLIENT, ZOOKEEPER_SERVER                                      |
| SPARK	  | SPARK_JOBHISTORYSERVER, SPARK_CLIENT                                      |
| RANGER	  | RANGER_USERSYNC, RANGER_ADMIN                                      |
| AMBARI_METRICS	  | AMBARI_METRICS, METRICS_COLLECTOR, METRICS_MONITOR                                      |
| KERBEROS	  | KERBEROS_CLIENT                                      |
| FLUME	  | FLUME_HANDLER                                      |
| KAFKA	  | KAFKA_BROKER                                      |
| KNOX	  | KNOX_GATEWAY                                      |
| ATLAS	  | ATLAS                                     |
| CLOUDBREAK	  | CLOUDBREAK                                      |
