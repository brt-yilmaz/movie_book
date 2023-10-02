build-dev:
	cd client && ${MAKE} build-dev
	cd server && ${MAKE} build

run-dev:
	docker-compose -f docker-compose.dev.yml up

###

build-local:
	cd client && ${MAKE} build-local
	cd server && ${MAKE} build

run-local:
	ENV=local docker-compose -f docker-compose-prod.yml up

###

build-prod:
	cd client && ${MAKE} build-prod
	cd server && ${MAKE} build

run-prod:
	ENV=prod docker-compose -f docker-compose-prod.yml up
