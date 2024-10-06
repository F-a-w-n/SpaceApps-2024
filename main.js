let embeddedMap;
let currentOverlay;

function showSoil() {
  var soilImage = ee.Image('OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02');

  const soilParams = {
    bands: ['b0'],
    min: 1,
    max: 12,
    opacity: 0.75,
    palette: [
      'd5c36b','b96947','9d3706','ae868f','f86714','46d143',
      '368f20','3e5a14','ffd557','fff72e','ff5a9d','ff005b',
    ]
  };
  
  // Get the map ID for the image and handle the response
  const mapId = soilImage.getMap(soilParams);
  const tileSource = new ee.layers.EarthEngineTileSource(mapId);
  const overlay = new ee.layers.ImageOverlay(tileSource);
  if (currentOverlay) {
    embeddedMap.overlayMapTypes.pop();  // Remove the previous overlay
  }

  // Set the new overlay as the current one
  currentOverlay = overlay;
  embeddedMap.overlayMapTypes.push(overlay);
}

function showMoisture() {

  const soilMoistureCollection = ee.ImageCollection('NASA/SMAP/SPL4SMGP/007')
  
  const moistRecentImage = soilMoistureCollection
  .filterDate('2024-01-01', '2024-12-31')  // Adjust the date range as needed
    .sort('system:time_start', false)         // Sort by time, descending
    .first();                                 // Get the first image
  

  // Set visualization parameters
  const moistureParams = {
    bands: ['specific_humidity_lowatmmodlay', 'sm_surface', 'sm_rootzone'],
    min: 0,
    max: 1,
    gamma: [15, 10, 5],
    opacity: 0.75,
  };
  
  // Get the map ID for the image and handle the response
  const mapId = moistRecentImage.getMap(moistureParams);
  const tileSource = new ee.layers.EarthEngineTileSource(mapId);
  const overlay = new ee.layers.ImageOverlay(tileSource);
  if (currentOverlay) {
    embeddedMap.overlayMapTypes.pop();  // Remove the previous overlay
  }

  // Set the new overlay as the current one
  currentOverlay = overlay;
  embeddedMap.overlayMapTypes.push(overlay);

}

function showEvaporation() {

  // Get the MODIS ImageCollection
  const evaporationCollection = ee.ImageCollection("MODIS/061/MOD16A2GF");
  // Select an image from the collection (e.g., the most recent image)
  const evapRecentImage = evaporationCollection
    .filterDate('2020-01-01', '2024-12-31')  // Adjust the date range as needed
    .sort('system:time_start', false)         // Sort by time, descending
    .first();                                 // Get the first image
  
  // Set visualization parameters
  const evaporationParams = {
    bands: ['PET', 'PLE', 'ET_QC'],
    min: 0,
    max: 500,
    gamma: [0.95, 1, 0.5],
    opacity: 0.75,
  };
  
  // Get the map ID for the image and handle the response
  const mapId = evapRecentImage.getMap(evaporationParams);
  const tileSource = new ee.layers.EarthEngineTileSource(mapId);
  const overlay = new ee.layers.ImageOverlay(tileSource);
  if (currentOverlay) {
    embeddedMap.overlayMapTypes.pop();  // Remove the previous overlay
  }

  // Set the new overlay as the current one
  currentOverlay = overlay;
  embeddedMap.overlayMapTypes.push(overlay);
}

function setUpMap() {
  // Hide the sign-in button.
  document.getElementById("g-sign-in").setAttribute("hidden", "true");

  // Initialize the Earth Engine API. Must be called once before using the API.
  ee.initialize();

  // Get a reference to the placeholder DOM element to contain the map.
  const mapContainer = document.getElementById("map");

  // Create an interactive map inside the placeholder DOM element.
  embeddedMap = new google.maps.Map(mapContainer, {
    // Pan and zoom initial map viewport to Grand Canyon.
    center: {lng: -112.8598, lat: 36.2841},
    zoom: 9,
  }
);
  showEvaporation();
}

function changeMap(mode) {
  if (mode == 0) {
    showSoil()
  } else if (mode ==1) {
    showMoisture();
  } else {
    showEvaporation();
  }
}

// Handles clicks on the sign-in button.
function onSignInButtonClick() {
  // Display popup allowing the user to sign in with their Google account and to
  // grant appropriate permissions to the app.
  ee.data.authenticateViaPopup(setUpMap);
}

// If the user is signed in, display a popup requesting permissions needed to
// run the app, otherwise show the sign-in button.
ee.data.authenticateViaOauth(
  '425766528478-pg98n80vsbhka2lbadhtchoho2u7ji8v.apps.googleusercontent.com',
  setUpMap,
  alert,
  ['https://www.googleapis.com/auth/earthengine.readonly'],
  () => document.getElementById("g-sign-in").removeAttribute("hidden"),
  true
);