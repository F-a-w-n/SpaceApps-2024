function setUpMap() {
  // Hide the sign-in button.
  document.getElementById("g-sign-in").setAttribute("hidden", "true");

  // Initialize the Earth Engine API. Must be called once before using the API.
  ee.initialize();

  // Get a reference to the placeholder DOM element to contain the map.
  const mapContainer = document.getElementById("map");

  // Create an interactive map inside the placeholder DOM element.
  const embeddedMap = new google.maps.Map(mapContainer, {
    // Pan and zoom initial map viewport to Grand Canyon.
    center: {lng: -112.8598, lat: 36.2841},
    zoom: 9,
  });

  // Obtain reference to digital elevation model and apply algorithm to
  // calculate slope.
  const srtm = ee.Image("MODIS/061/MOD16A2GF");
  const slope = ee.Terrain.slope(srtm);

  // Create a new tile source to fetch visible tiles on demand and display them
  // on the map.
  const mapId = slope.getMap({min: 0, max: 60});
  const tileSource = new ee.layers.EarthEngineTileSource(mapId);
  const overlay = new ee.layers.ImageOverlay(tileSource);
  embeddedMap.overlayMapTypes.push(overlay);
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
  // The OAuth Client ID defined above.
  '425766528478-pg98n80vsbhka2lbadhtchoho2u7ji8v.apps.googleusercontent.com',
  // Callback invoked immediately when user is already signed in.
  setUpMap,
  // Show authentication errors in a popup.
  alert,
  // Request permission to only read and compute Earth Engine data on behalf of
  // user.
  /* extraScopes = */ ['https://www.googleapis.com/auth/earthengine.readonly'],
  // Show sign-in button if reusing existing credentials fails.
  () => document.getElementById("g-sign-in").removeAttribute("hidden"),
  // Don't require ability to write and access Cloud Platform on behalf of the
  // user.
  /* opt_suppressDefaultScopes = */ true
);