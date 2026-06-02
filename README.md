# Wildlife Sightings App
## App Description

This is a wildlife sightings app. Users can view ans search national parks, create wildlife sightings, and view sightings created by other users filtering by park and date ranges. 

## Containerization
Containerizing this app allows for easier deployment since the app will run in the same environment on every machine. This fixes the issue of needing to install specific versions of everything needed for the app because docker packages the code with all necessary files, libraries, and dependencies. Another benefit Docker gives with deployment is that once an image has been built it can be run locally, on a server, or by another person without any changes to the app’s code. This is good for development because developers can just pull a docker image to share identical development environments easily.

Docker also makes scaling the app easier because if in the future there’s more users of the wildlife sighting app multiple containers of the api can be started to better handle the increase in traffic. 

Containerization is also beneficial due to the increase in security from reducing the attack surface. Containers limit unnecessary capabilities which reduces the number of entry points for attackers.  Containers also use less resources than virtual machines making them faster to start and allowing more apps to run on the same device at the same time.

Docker compose also simplifies running this app as it starts both the API and client-side with one command instead of needing to run them both separately in two commands. For other apps with more containers docker compose can be even more beneficial. 

## Development Guide
To build and run a new image after the code has been updated run: docker compose up --build
- This builds the api and react container in one command


To stop the containers run: docker compose down

### API Development Guide
To build a new API image and give it a tag and version run: docker build -t wildlife-api:v1 .
- Change to v2, v3, etc to change the version

To run the API container run: docker run -p 3000:3000 --name wildlife-api-container wildlife-api:v1

To stop the API container run: docker stop wildlife-api-container

To remove the API container run: docker rm wildlife-api-container

### React Development Guide
To build a new React image and give it a tag and version run: docker build -t wildlife-client:v1 .
- Change to v2, v3, etc to create a new version

To run the React container run: docker run -p 5173:5173 --name wildlife-client-container wildlife-client:v1

To stop the React container run: docker stop wildlife-client-container

To remove the React container run: docker rm wildlife-client-container


## Caching

### /parks (in api)
Server-side cache: 7 days
- Because the list of national parks would rarely change (meaning the data from this route is mostly static) and this endpoint is frequently requested caching it for a long makes sense.

### /parks/:id (in api)
Server-side cache: 7 days
- Individual park lookups are cached to improve performance for frequently accessed parks and their details. This was also a longer cache sicne the details of the park are unlikely to change, however it's not so long to not waste memory on parks that are less commonly requested.

### /species (in api)
Server-side cache: 7 days
- The full species list is significantly larger than parks and is also very static since species data does not change frequently. Even though this endpoint is not currently heavily used on the client side, caching was added in case of future features such as filtering based on species. A longer cache of 7 days was chosen because updates to species data are expected to be rare.

### /species/:id (in api)
Server-side cache: 7 days
- Individual species lookups are cached. This cache has the same reasoning as the full species cache: species data is static and unlikely to change often. The longer cache duration ensures efficient retrieval of the specific species if this endpoint is used in future features on the client-side (such as linking sightings to specific species).

### Parks Page (in client side)
Client-side cache: 24 hours
- The React Parks page stores the list of parks in localStorage. When a user revisits the parks page within 24 hours, the cached data is used instead of making another request to the API. This decision was made also because of the static nature of the data on parks page (since the list of national parks rarely changes). I chose to include this cache because it will reduce the amount of requests to the API.