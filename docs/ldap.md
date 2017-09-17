# LDAP/AD configuration

There are cases where it might be useful to authenticate Cloudbreak users against an existing enterprise LDAP/AD server as it might already have all the users preconfigured. Cloudbreak supports this without the need to modify the existing LDAP schema.

To setup LDAP/AD authentication for Cloudbreak, the `/var/lib/cloudbreak-deployment/uaa.yml` must be changed as it is described in [Cloudfoundry's documentation](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-LDAP.md).

Sample for LDAP authentication (the CN of the users in LDAP is the e-mail address in this case, as Cloudbreak uses an e-mail address as identifier):
```
spring_profiles: postgresql,ldap

ldap:
  profile:
    file: ldap/ldap-search-and-bind.xml
  base:
    url: 'ldap://10.0.3.138:389/'
    userDn: 'CN=Administrator,CN=Users,DC=ad,DC=hortonworks,DC=com'
    password: 'Admin123!'
    searchBase: 'DC=ad,DC=hortonworks,DC=com'
    searchFilter: 'cn={0}'
  groups:
    file: ldap/ldap-groups-map-to-scopes.xml
    searchBase: ou=scopes,dc=ad,dc=hortonworks,dc=com
    searchSubtree: true
    groupSearchFilter: member={0}
    maxSearchDepth: 10
    autoAdd: true

... rest of the content of uaa.yml
```
An ldapsearch query can be run to verify the Administrator's credentials and to be able to bind (sample):
```
ldapsearch -x -h 10.0.3.138 -D "CN=Administrator,CN=Users,DC=ad,DC=hortonworks,DC=com" -W -b "uid=user,cn=Users,dc=ad,dc=hortonworks,dc=com"
```
If the user cannot bind, then it is possible to use password comparison method as well as described [here](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-LDAP.md#selecting-an-authentication-method).

Once the changes are made the following property must be set in the Profile file:
```
CBD_FORCE_START=true
```
This will ensure that the application will start with the modified uaa.yml. After that changes are made restart the application:
```
cbd kill
cbd start
```
`Note:` DO NOT use the `cbd restart` command as it regenerates all the yml files so the changes will be lost in uaa.yml.

## Mapping Oauth2 scopes to LDAP groups
In order for the users to have access to Cloudbreak resources and to be able to create clusters the Oauth2 scopes must be mapped to LDAP groups. At the moment Cloudbreak only supports `one LDAP group per user` scenario.
To see the Oauth2 scopes, execute the following command:
```
docker exec -it cbreak_commondb_1 psql -U postgres -d uaadb -c "select displayname from groups where displayname like 'cloudbreak%' or displayname like 'sequenceiq.account%' or displayname='sequenceiq.cloudbreak.user';"
```
To save them to a `groups.txt` file:
```
docker exec cbreak_commondb_1 psql -U postgres -d uaadb -c "select displayname from groups where displayname like 'cloudbreak%' or displayname like 'sequenceiq.account%' or displayname='sequenceiq.cloudbreak.user';" | tail -n +3 | grep -v rows | xargs -I@ echo @ >> groups.txt
```
To generate the SQL commands for the mapping we'll use [sigil](https://github.com/gliderlabs/sigil), which is a string interpolator and template processor. It is a single binary written in Golang and you can download it from the [releases](https://github.com/gliderlabs/sigil/releases) page.
Save the following in a file called: `template.sig` (cn=admin,ou=scopes,dc=ad,dc=hortonworks,dc=com depends on your LDAP group, it must be inside searchBase parameter configured in the first step in UAA.yml):
```
{{ range $k, $v := stdin|split "\n"}}INSERT INTO external_group_mapping (group_id, external_group, added, origin) VALUES ((select id from groups where displayname='{{$v}}'), 'cn=admin,ou=scopes,dc=ad,dc=hortonworks,dc=com', '2016-09-30 19:28:24.255', 'ldap');
{{end}}
```
then generate the SQL commands into `mapping.sql`:
```
cat groups.txt | sigil -f template.sig > mapping.sql
```
and remove lines with empty displayname:
```
sed -i.bak "/displayname=''/d" mapping.sql
```
then execute the commands:
```
docker cp mapping.sql cbreak_commondb_1:/tmp/mapping.sql
docker exec cbreak_commondb_1 psql -U postgres -d uaadb -f /tmp/mapping.sql
```
After the mapping is successfully done, you can log in with users authenticated against LDAP. 
