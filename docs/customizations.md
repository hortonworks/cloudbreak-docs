# Customizations

Cloudbreak deployer during startup tries to figure the underlay infrastructure and sets required environment variables with competent default values, but some cases it isn't enough. You can set custom environment variables in your `Profile` file.

## Cloudbreak related variables

    ADDRESS_RESOLVING_TIMEOUT 120000
DNS lookup timeout for internal service discovery
    
    AWS_ACCESS_KEY_ID ""
Access key of the AWS account
    
    AWS_ROLE_NAME cbreak-deployer
Name of the AWS role for the `cbd aws [generate-rol, show role]` commands
    
    AWS_SECRET_ACCESS_KEY ""
Secret access key of the AWS account
    
    AZURE_SUBSCRIPTION_ID
Azure subscription ID for interactive login in Web UI
    
    AZURE_TENANT_ID
Azure tenant ID for interactive login in Web UI
    
    CAPTURE_CRON_EXPRESSION
SmartSense bundle generation time interval in Cron format
    
    CBD_CERT_ROOT_PATH "${PWD}/certs"
Path where deployer stores Cloudbreak certificates
    
    CBD_LOG_NAME cbreak
Name of the Cloudbreak log file
    
    CBD_TRAEFIK_TLS "/certs/traefik/client.pem,/certs/traefik/client-key.pem"
Path inside of the Traefik container where TLS files located
    
    CB_AWS_CUSTOM_CF_TAGS ""
Comma separated list of AWS CloudFormation Stack tags
    
    CB_AWS_DEFAULT_CF_TAG ""
Default tag AWS CloudFormation Stack
    
    CB_AWS_DEFAULT_INBOUND_SECURITY_GROUP ""
Default inbound policy name for AWS CloudFormation Stack
    
    CB_AWS_EXTERNAL_ID provision-ambari
External ID of the assume role policy
    
    CB_AWS_HOSTKEY_VERIFY "false"
Enables host fingerprint verification on AWS
    
    CB_AWS_VPC ""
Configures the VPC id on AWS if it is the same as provisioned cluster
    
    CB_BLUEPRINT_DEFAULTS "hdp-small-default;hdp-spark-cluster;hdp-streaming-cluster"
Comma separated list of the default blueprints what Cloudbreak initialize in database
    
    CB_BYOS_DFS_DATA_DIR "/hadoop/hdfs/data"
Deprecated - Default data dir for BYOP orchestrators
    
    CB_COMPONENT_CLUSTER_ID
SmartSense component cluster ID
    
    CB_COMPONENT_ID
SmartSense component ID
    
    CB_COMPOSE_PROJECT cbreak
Name of the Docker Compose project, will appear in container names too
    
    CB_DB_ENV_DB "cbdb"
Name of the Cloudbreak database
    
    CB_DB_ENV_PASS ""
Password for the Cloudbreak database authentication
    
    CB_DB_ENV_SCHEMA "public"
Used schema in the Cloudbreak database
    
    CB_DB_ENV_USER "postgres"
User for the Cloudbreak database authentication
    
    CB_DB_ROOT_PATH "/var/lib/cloudbreak"
Deprecated - Location of the database volume on Cloudbreak host
    
    CB_DEFAULT_SUBSCRIPTION_ADDRESS http://uluwatu.service.consul:3000/notifications
Address of the default subscription for Cloudbreak notifications
    
    CB_ENABLEDPLATFORMS
Disables Cloudbreak resource called Platform
    
    CB_ENABLE_CUSTOM_IMAGE "false"
Flag to enable custom cloud images
    
    CBD_FORCE_START
Disables docker-compose.yml and uaa.yml validation
    
    CB_GCP_HOSTKEY_VERIFY "false"
Enables host fingerprint verification on GCP
    
    CB_HBM2DDL_STRATEGY "validate"
Configures hibernate.hbm2ddl.auto in Cloudbreak
    
    CB_HOST_DISCOVERY_CUSTOM_DOMAIN ""
Custom domain of the provisioned cluster
    
    CB_HTTPS_PROXY ""
HTTPS proxy url
    
    CB_HTTP_PROXY ""
HTTP proxy url
    
    CB_IMAGE_CATALOG_URL "https://s3-eu-west-1.amazonaws.com/cloudbreak-info/cb-image-catalog.json"
Image catalog url
    
    CB_INSTANCE_NODE_ID
Unique identifier of the Cloudbreak node     
    
    CB_INSTANCE_PROVIDER
Cloud provider of the Cloudbreak instance
    
    CB_INSTANCE_REGION
Cloud region of the Cloudbreak instance
    
    CB_INSTANCE_UUID
Unique identifier of Cloudbreak deployment
    
    CB_JAVA_OPTS ""
Extra Java options for Autoscale and Cloudbreak
    
    CB_LOG_LEVEL "INFO"
Log level of the Cloudbreak service
    
    CB_MAX_SALT_NEW_SERVICE_RETRY 90
Salt orchestrator max retry count
    
    CB_MAX_SALT_RECIPE_EXECUTION_RETRY 90
Salt orchestrator max retry count for recipes
    
    CB_PLATFORM_DEFAULT_REGIONS
Comma separated list of default regions by platform (AWS:eu-west-1)
    
    CB_PRODUCT_ID
SmartSense product ID
    
    CB_SCHEMA_MIGRATION_AUTO true
Flag for Cloudbreak automatic database schema update
    
    CB_SMARTSENSE_CONFIGURE "false"
Flag to install and configure SmartSense on cluster nodes
    
    CB_SMARTSENSE_CLUSTER_NAME_PREFIX
SmartSense Cloudbreak cluster name prefix
    
    CB_SMARTSENSE_ID ""
SmartSense subscription ID
    
    CB_TEMPLATE_DEFAULTS "minviable-gcp,minviable-azure,minviable-aws"
Comma separated list of the default templates what Cloudbreak initialize in database
    
    CB_UI_MAX_WAIT 400
Wait timeout for `cbd start-wait` command
    
    CERTS_BUCKET ""
S3 bucket name for backup and restore certificates via `cbd aws [certs-restore-s3  certs-upload-s3]` commands
    
    CERT_VALIDATION "true"
Enables cert validation in Cloudbreak and Autoscale
    
    CLOUDBREAK_SMTP_AUTH "true"
Configures mail.smtp.auth in Cloudbreak
    
    CLOUDBREAK_SMTP_SENDER_FROM "noreply@hortonworks.com"
Email address of the sender
    
    CLOUDBREAK_SMTP_SENDER_HOST "smtp.service.consul"
SMTP server address ot hostname
    
    CLOUDBREAK_SMTP_SENDER_PASSWORD "$LOCAL_SMTP_PASSWORD"
Password
    
    CLOUDBREAK_SMTP_SENDER_PORT 25
Port of the SMTP server
    
    CLOUDBREAK_SMTP_SENDER_USERNAME "admin"
User name for SMTP authentication
    
    CLOUDBREAK_SMTP_STARTTLS_ENABLE "false"
Configures mail.smtp.starttls.enable in Cloudbreak
    
    CLOUDBREAK_SMTP_TYPE "smtp"
Defines mail.transport.protocol in CLoudbreak
    
    COMMON_DB commondb
Name of the database container
    
    COMMON_DB_VOL common
Name of the database volume
    
    COMPOSE_HTTP_TIMEOUT 120
Docker Compose execution timeout
    
    DB_DUMP_VOLUME cbreak_dump
Name of the database dump volume
    
    DB_MIGRATION_LOG "db_migration.log"
Database migration log file
    
    DEFAULT_INBOUND_ACCESS_IP ""
Opens default ports on AWS instances for Address
    
    DOCKER_CONSUL_OPTIONS ""
Extra options for Consul
    
    DOCKER_IMAGE_CBD_SMARTSENSE hortonworks/cbd-smartsense
SmartSense Docker image name
    
    DOCKER_IMAGE_CLOUDBREAK hortonworks/cloudbreak
Cloudbreak Docker image name
    
    DOCKER_IMAGE_CLOUDBREAK_AUTH hortonworks/cloudbreak-auth
Authentication service Docker image name
    
    DOCKER_IMAGE_CLOUDBREAK_PERISCOPE hortonworks/cloudbreak-autoscale
Autoscale Docker image name
    
    DOCKER_IMAGE_CLOUDBREAK_SHELL hortonworks/cloudbreak-shell
Cloudbreak Shell Docker image name
    
    DOCKER_IMAGE_CLOUDBREAK_WEB hortonworks/cloudbreak-web
Web UI Docker image name
    
    DOCKER_TAG_ALPINE 3.1
Alpine container version
    
    DOCKER_TAG_CBD_SMARTSENSE 0.10.0
SmartSense container version
    
    DOCKER_TAG_CERT_TOOL 0.2.0
Cert tool container version
    
    DOCKER_TAG_CLOUDBREAK 2.1.0-dev.70
Cloudbreak container version
    
    DOCKER_TAG_CLOUDBREAK_SHELL 2.1.0-dev.70
Cloudbreak Shell container version
    
    DOCKER_TAG_CONSUL 0.5
Consul container version
    
    DOCKER_TAG_HAVEGED 1.1.0
Haveged container version
    
    DOCKER_TAG_LOGROTATE 1.0.0
Logrotate container version
    
    DOCKER_TAG_MIGRATION 1.0.0
Migration container version
    
    DOCKER_TAG_PERISCOPE 2.1.0-dev.70
Autoscale container version
    
    DOCKER_TAG_POSTFIX latest
Postfix container version
    
    DOCKER_TAG_POSTGRES 9.6.1-alpine
Postgresql container version
    
    DOCKER_TAG_REGISTRATOR v5
Registrator container version
    
    DOCKER_TAG_SULTANS 2.1.0-dev.70
Authentication service container version
    
    DOCKER_TAG_TRAEFIK v1.2.0
Traefik container version
    
    DOCKER_TAG_UAA 3.6.5
Identity container version
    
    DOCKER_TAG_ULUWATU 2.1.0-dev.70
Web UI container version
    
    IDENTITY_DB_NAME "uaadb"
Name of the Identity database
    
    IDENTITY_DB_PASS ""
Password for the Identity database authentication
    
    IDENTITY_DB_URL "${COMMON_DB}.service.consul:5432"
Url for the Identity database connection included the port number
    
    IDENTITY_DB_USER "postgres"
User for the Identity database authentication
    
    LOCAL_SMTP_PASSWORD "$UAA_DEFAULT_USER_PW"
Default password for the internal mail server
    
    PERISCOPE_DB_HBM2DDL_STRATEGY "validate"
Configures hibernate.hbm2ddl.auto in Autoscale
    
    PERISCOPE_DB_NAME "periscopedb"
Name of the Autoscale database
    
    PERISCOPE_DB_PASS ""
Password for the Autoscale database authentication
    
    PERISCOPE_DB_SCHEMA_NAME "public"
Used schema in the Autoscale database
    
    PERISCOPE_DB_USER "postgres"
User for the Autoscale database authentication
    
    PERISCOPE_DB_TCP_ADDR
Address of the Autoscale database
    
    PERISCOPE_DB_TCP_PORT
Port number of the Autoscale database
    
    PERISCOPE_LOG_LEVEL "INFO"
Log level of the Autoscale service
    
    PERISCOPE_SCHEMA_MIGRATION_AUTO true
Flag for Autoscale automatic database schema update
    
    PUBLIC_IP
Ip address or hostname of the public interface
    
    REST_DEBUG "false"
Enables REST call debug level in Cloudbreak and Autoscale
    
    SL_ADDRESS_RESOLVING_TIMEOUT
DNS lookup timeout of Authentication service for internal service discovery
    
    SL_NODE_TLS_REJECT_UNAUTHORIZED "0"
Enables self signed certifications in Authentication service
    
    SULTANS_CONTAINER_PATH /sultans
Default project location in Authentication service container
    
    TRAEFIK_MAX_IDLE_CONNECTION 100
Configures --maxidleconnsperhost for Traefik
    
    UAA_CLOUDBREAK_ID cloudbreak
Identity of the Cloudbreak scope in Identity
    
    UAA_CLOUDBREAK_SECRET $UAA_DEFAULT_SECRET
Secret of the Cloudbreak scope in Identity
    
    UAA_CLOUDBREAK_SHELL_ID cloudbreak_shell
Identity of the Cloudbreak Shell scope in Identity
    
    UAA_DEFAULT_ACCOUNT "seq1234567.SequenceIQ"
Default account for users as an Identity group
    
    UAA_DEFAULT_SECRET
Default secret for all the scopes and encryptions
    
    UAA_DEFAULT_USER_EMAIL admin@example.com
Email address of default admin user
    
    UAA_DEFAULT_USER_FIRSTNAME Joe
First name of default admin user
    
    UAA_DEFAULT_USER_GROUPS "openid,cloudbreak.networks,cloudbreak.securitygroups,cloudbreak.templates,cloudbreak.blueprints,cloudbreak.credentials,cloudbreak.stacks,sequenceiq.cloudbreak.admin,sequenceiq.cloudbreak.user,sequenceiq.account.${UAA_DEFAULT_ACCOUNT},cloudbreak.events,cloudbreak.usages.global,cloudbreak.usages.account,cloudbreak.usages.user,periscope.cluster,cloudbreak.recipes,cloudbreak.blueprints.read,cloudbreak.templates.read,cloudbreak.credentials.read,cloudbreak.recipes.read,cloudbreak.networks.read,cloudbreak.securitygroups.read,cloudbreak.stacks.read,cloudbreak.sssdconfigs,cloudbreak.sssdconfigs.read,cloudbreak.platforms,cloudbreak.platforms.read"
Default user groups of the users
    
    UAA_DEFAULT_USER_LASTNAME Admin
Last name of default admin user
    
    UAA_DEFAULT_USER_PW
Password of default admin user
    
    UAA_FLEX_USAGE_CLIENT_ID flex_usage_client
Identity of the Flex usage generator scope in Identity
    
    UAA_FLEX_USAGE_CLIENT_SECRET $UAA_DEFAULT_SECRET
Secret of the Flex usage generator scope in Identity
    
    UAA_PERISCOPE_ID periscope
Identity of the Autoscale scope in Identity
    
    UAA_PERISCOPE_SECRET $UAA_DEFAULT_SECRET
Secret of the Autoscale scope in Identity
    
    UAA_PORT 8089
Identity service public port
    
    UAA_SULTANS_ID sultans
Identity of the Authentication service scope in Identity
    
    UAA_SULTANS_SECRET $UAA_DEFAULT_SECRET
Secret of the Authentication service scope in Identity
    
    UAA_ULUWATU_ID uluwatu
Identity of the Web UI scope in Identity
    
    UAA_ULUWATU_SECRET $UAA_DEFAULT_SECRET
Secret of the Web UI scope in Identity
    
    UAA_ZONE_DOMAIN example.com
External domain name for zone in Identity
    
    ULUWATU_CONTAINER_PATH /uluwatu
Default project location in Web UI container
    
    ULU_DEFAULT_SSH_KEY ""
Default SSH key for the credentials in Cloudbreak
    
    ULU_HOST_ADDRESS  "https://$PUBLIC_IP"
Web UI host
    
    ULU_NODE_TLS_REJECT_UNAUTHORIZED "0"
Enables self signed certifications in Web UI
    
    ULU_OAUTH_REDIRECT_URI  "$ULU_HOST_ADDRESS/authorize"
Authorization page on Web UI
    
    ULU_SUBSCRIBE_TO_NOTIFICATIONS "false"
Flag for automatic subscriptions for CLoudbreak events
    
    ULU_SULTANS_ADDRESS  "https://$PUBLIC_IP/sl"
Authentication service address
    
    VERBOSE_MIGRATION false
Flag of verbose database migration

## Local development related variables

    CB_LOCAL_DEV_BIND_ADDR "192.168.64.1"
Ambassador external address for local development of Cloudbreak and Autoscale
    
    CB_SCHEMA_SCRIPTS_LOCATION "container"
Location of Cloudbreak schema update files
    
    DOCKER_TAG_AMBASSADOR 0.5.0
Ambassador container version for local development
    
    PERISCOPE_SCHEMA_SCRIPTS_LOCATION "container"
Location of Cloudbreak schema update files
    
    PRIVATE_IP $BRIDGE_IP
Ip address or hostname of the private interface
    
    REMOVE_CONTAINER "--rm"
Keeps side effect containers for debug purpose
    
    SULTANS_VOLUME_HOST /dev/null
Location of the locally developed Authentication service project
    
    UAA_SCHEMA_SCRIPTS_LOCATION "container"
Location of Identity schema update files
    
    ULUWATU_VOLUME_HOST /dev/null
Location of the locally developed Web UI project

## MacOS related variables

    DOCKER_MACHINE ""
Name of the Docker Machine where Cloudbreak runs
    
    DOCKER_PROFILE Profile
Profile file for Docker Machine related environment variables
    
    MACHINE_CPU 2
Number of the CPU cores on the Docker Machine instance
    
    MACHINE_MEM 4096
Amount of RAM on the Docker Machine instance
    
    MACHINE_NAME cbd
Name of the Docker Machine instance
    
    MACHINE_OPTS "--xhyve-virtio-9p"
Extra options for Docker Machine instance
    
    MACHINE_STORAGE_PATH $HOME/.docker/machine
Docker Machine storage path