build-dev: 
	docker build -t react-app .

build-local:
	docker build \
	 -t react-app-prod:local \
	 --build-arg CADDYFILE=Caddyfile.local \
	 -f Dockerfile.prod .

build-prod:
	docker build \
	-t react-app-prod:prod -f Dockerfile.prod .
	--build-arg CADDYFILE=Caddyfile.prod \
	-f Dockerfile.prod .