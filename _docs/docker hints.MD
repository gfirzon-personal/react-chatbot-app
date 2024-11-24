# Build the Docker image
```sh
docker-compose build
```

# Run the Docker container
```sh
docker-compose up
```

Application should now be running inside a Docker container and accessible on port 3000.

To shut down the application running inside the Docker container, you can use the following command in your terminal:
```sh
docker-compose down
```

No, you don't need to delete the image before running docker-compose build. The docker-compose build command will rebuild the image and apply any changes made to your code. However, if you want to ensure a clean build, you can use the --no-cache option:
```sh
docker-compose build --no-cache
```