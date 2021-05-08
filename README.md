# aqi-ui

> Dashboard for showing Air Quality Index (AQI)

## Project timeline
Time taken: 2 days
List of features built:
1. Reading AQI data from the WebSocket and displaying/updating data on the page
2. Showing city with poorest and best air quality index for current day
3. Show all AQI data for a selected city for the current day
4. Show historic AQI data for a selected city based on selected dates
5. Making application mobile friendly
. 

## Project setup
```
npm install
```

### Environment Variables
1. Create .env file in your projects root folder
2. Add the following environment variables
```
VUE_APP_API_KEY=api-key-you-used-on-server-side
VUE_APP_API_URL=https://your-api-server-url
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

# Deployed Application

Application is deployed [here](https://nostalgic-brattain-146f18.netlify.app/)

# Swagger Spec
Open API Spec can be found [here](https://github.com/neeraj87/aqi-server/blob/master/specs/aqi-server.yaml)