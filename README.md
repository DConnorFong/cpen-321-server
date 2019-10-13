# StudentLink

## Setup Server Code

### Development
1. Ensure that you have the Prettier and TSLint tools installed
2. Clone the repository to your computer
3. Copy dev.env into `/server/config` from the Google Drive.
4. Run `npm install` within the server directory
5. Run `npm run start` or `npm run start:dev` within the server directory
6. Open your browser and test `http://localhost:3000/` to observe a simple GET request

### Docker Container
1. Ensure you have the Docker Daemon setup
1. Follow 1-3 from Development setup
2. Navigate to `/server/`
3. Run `docker build -t <your-username>/studentlink-server .` (you can tag with whatever you like)
4. Verify your container was built with `docker images`
4. Run `docker run -p 49160:3000 -d <your-username>/studentlink-server` (you can replace 49160 with something else but leave 3000)
5. Verify your container is running with `docker ps` and take note of 'CONTAINER_ID'
6. When you are done, stop your container with `docker stop <CONTAINER_ID>`

## Setup Client Code

1. Download the Expo client: https://apps.apple.com/app/apple-store/id982107779
2. Clone the repository to your computer
3. Run `npm install` within the mobile directory
4. Run `npm run start` - you should be able to see a QR code at this point
5. Scan the QR code using your iOS camera
6. Observe the application opening and running on your device
