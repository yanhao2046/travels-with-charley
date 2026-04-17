// Map initialization and route drawing with Leaflet

let map;
let markers = [];
let routeLines = [];
let currentMarker = null;

function initMap() {
  map = L.map('map', {
    center: [41.0, -96.0],
    zoom: 5,
    zoomControl: true,
    attributionControl: true
  });

  // Use a warm-toned map tile
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  drawRoute();
  addMarkers();
  fitBounds();
}

function getPartColor(partId) {
  const part = ROUTE_DATA.parts.find(p => p.id === partId);
  return part ? part.color : '#666';
}

function drawRoute() {
  // Group stops by part for colored segments
  const partGroups = {};
  ROUTE_DATA.stops.forEach(stop => {
    const partId = typeof stop.part === 'string' ? parseInt(stop.part) : stop.part;
    // Handle "2/3" case for Chicago
    const parts = String(stop.part).split('/').map(Number);
    parts.forEach(p => {
      if (!partGroups[p]) partGroups[p] = [];
      partGroups[p].push([stop.lat, stop.lng]);
    });
  });

  // Draw connecting lines between consecutive stops
  const stops = ROUTE_DATA.stops;
  for (let i = 0; i < stops.length - 1; i++) {
    const from = stops[i];
    const to = stops[i + 1];
    const partId = typeof to.part === 'string' ? parseInt(to.part) :
                   String(to.part).includes('/') ? parseInt(String(to.part).split('/')[1]) : to.part;
    const color = getPartColor(partId);

    const line = L.polyline(
      [[from.lat, from.lng], [to.lat, to.lng]],
      {
        color: color,
        weight: 3,
        opacity: 0.7,
        dashArray: null,
        smoothFactor: 1
      }
    ).addTo(map);

    routeLines.push(line);

    // Add direction arrow at midpoint
    const midLat = (from.lat + to.lat) / 2;
    const midLng = (from.lng + to.lng) / 2;
    const angle = Math.atan2(to.lat - from.lat, to.lng - from.lng) * 180 / Math.PI;

    L.marker([midLat, midLng], {
      icon: L.divIcon({
        className: 'route-arrow',
        html: `<div style="transform: rotate(${-angle - 90}deg); color: ${color}; font-size: 12px; opacity: 0.6;">▼</div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      }),
      interactive: false
    }).addTo(map);
  }
}

function addMarkers() {
  ROUTE_DATA.stops.forEach((stop, index) => {
    const partId = typeof stop.part === 'string' ? parseInt(stop.part) :
                   String(stop.part).includes('/') ? parseInt(String(stop.part).split('/')[0]) : stop.part;
    const color = getPartColor(partId);
    const isStartOrEnd = index === 0 || index === ROUTE_DATA.stops.length - 1;
    const extraClass = index === 0 ? 'start-marker' :
                       index === ROUTE_DATA.stops.length - 1 ? 'end-marker' : '';

    const icon = L.divIcon({
      className: '',
      html: `<div class="stop-marker ${extraClass}" style="background:${color}">${stop.id}</div>`,
      iconSize: isStartOrEnd ? [30, 30] : [24, 24],
      iconAnchor: isStartOrEnd ? [15, 15] : [12, 12],
      popupAnchor: [0, isStartOrEnd ? -18 : -14]
    });

    const marker = L.marker([stop.lat, stop.lng], { icon: icon }).addTo(map);

    // Popup content
    const popupHtml = `
      <div class="popup-name">${stop.nameCn}</div>
      <div class="popup-name-en">${stop.nameEn}</div>
      <div class="popup-time">${stop.time} / ${stop.timeEn}</div>
      <div class="popup-link" onclick="window.selectStop(${stop.id})">查看详情 →</div>
    `;
    marker.bindPopup(popupHtml, { maxWidth: 250 });

    marker.on('click', () => {
      window.selectStop(stop.id);
    });

    marker.stopId = stop.id;
    markers.push(marker);
  });
}

function fitBounds() {
  const bounds = L.latLngBounds(ROUTE_DATA.stops.map(s => [s.lat, s.lng]));
  map.fitBounds(bounds, { padding: [60, 60] });
}

function flyToStop(stopId) {
  const stop = ROUTE_DATA.stops.find(s => s.id === stopId);
  if (!stop) return;

  map.flyTo([stop.lat, stop.lng], 7, {
    duration: 1.2,
    easeLinearity: 0.5
  });

  // Highlight the marker
  if (currentMarker) {
    // Reset previous marker style
  }
  const marker = markers.find(m => m.stopId === stopId);
  if (marker) {
    currentMarker = marker;
    marker.openPopup();
  }
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', initMap);
