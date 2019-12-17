serve: clean build
	docker run --detach --publish 3000:3000 --mount "type=bind,src=$$(pwd)/docs,dst=/docs" --name docs.ionoid.io docsify-ionoid

build:
	docker build -t docsify-ionoid .

unserve:
	-docker stop docs.ionoid.io

clean: unserve
	-docker rm docs.ionoid.io
	-docker rmi docsify-ionoid
