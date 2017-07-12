CB_BRANCH = $(shell echo \${BRANCH})
ifeq ($(CB_BRANCH),)
	CB_BRANCH=$(shell git name-rev --name-only HEAD) 
endif

CACHE = $(shell echo \${GRADLE_CACHE})
ifeq ($(CACHE),)
	CACHE_OPTION= 
else
	CACHE_OPTION=-v $(CACHE):/root/.gradle
endif

CB_LOCATION = $(shell echo \${CBLOC})
ifeq ($(CB_LOCATION),)
	CB_LOCATION = ../cloudbreak
endif

PW_PORT = $(shell echo \${PORT})
ifeq ($(PW_PORT),)
	PW_PORT = 8000
endif

PB_VER = "v3"

preview:
	 docker run --rm --name cloudbreak-docs-preview -p $(PW_PORT):8000 -v $(PWD):/work hortonworks/pagebuilder:$(PB_VER) mkdocs serve

circleci:
	rm ~/.gitconfig

clean:
	rm -rf site

update-images:
	curl -sL https://atlas.hashicorp.com/api/v1/artifacts/hortonworks/cbd/amazon.image/search | jq .versions[0] > ./mkdocs_theme/providers/aws.json
	curl -sL https://atlas.hashicorp.com/api/v1/artifacts/hortonworks/cbd/googlecompute.image/search | jq .versions[0] > ./mkdocs_theme/providers/gcp.json
	curl -sL https://atlas.hashicorp.com/api/v1/artifacts/hortonworks/cbd/openstack.image/search | jq .versions[0] > ./mkdocs_theme/providers/openstack.json
	curl -sL https://atlas.hashicorp.com/api/v1/artifacts/hortonworks/cloudbreak/openstack.image/search | jq .versions[0] > ./mkdocs_theme/providers/openstack_cloudbreak.json

test:
	docker run --rm -p 8000:8000 -v $(PWD):/work hortonworks/pagebuilder:$(PB_VER) mkdocs build

copy-generated-dots:
	cp $(CB_LOCATION)/core/build/diagrams/flow/*.dot docs/diagrams

generate-dots-by-branch:
	docker run --rm -v $(PWD):/work $(CACHE_OPTION) -e BRANCH=$(CB_BRANCH) -it hortonworks/pagebuilder:$(PB_VER) generate-dots
