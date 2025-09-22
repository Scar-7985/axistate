import { useEffect, useRef } from "react";

const GoogleMap = () => {
  const mapRef = useRef(null);
  let activeInfoWindow = null;

  useEffect(() => {
    const existingScript = document.getElementById("googleMaps");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "googleMaps";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBjUZ3u5abXNjMj5Kh9vW2B38cm2Ntwyxk&libraries=drawing`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 34.0522, lng: -118.2437 },
      zoom: 11,
    });


    const properties = [
      { id: 1, name: "Property A", lat: 34.0522, lng: -118.2437, price: "$2M", description: "Luxury apartment with 3 beds." },
      { id: 2, name: "Property B", lat: 34.0407, lng: -118.2468, price: "$1.5M", description: "Office space in downtown." },
      { id: 3, name: "Property C", lat: 34.0622, lng: -118.2537, price: "$3M", description: "Retail store with parking." },
    ];

    // Add markers + info windows
    properties.forEach((property) => {
      const marker = new window.google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map,
        title: property.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-size:14px; max-width:200px;">
            <h4 style="margin:0;">${property.name}</h4>
            <p style="margin:4px 0;"><strong>Price:</strong> ${property.price}</p>
            <p style="margin:4px 0;">${property.description}</p>
            <button id="view-${property.id}" style="background:#007bff; color:#fff; border:none; padding:5px 8px; cursor:pointer;">View Details</button>
          </div>
        `,
      });

      marker.addListener("click", () => {
        if (activeInfoWindow) activeInfoWindow.close();
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;

        // Attach button click AFTER InfoWindow is rendered
        window.google.maps.event.addListenerOnce(infoWindow, "domready", () => {
          const btn = document.getElementById(`view-${property.id}`);
          if (btn) {
            btn.onclick = () => {
              alert(`Opening full details for ${property.name}`);
            };
          }
        });
      });
    });

    // Drawing tools (still enabled)
    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          window.google.maps.drawing.OverlayType.MARKER,
          window.google.maps.drawing.OverlayType.CIRCLE,
          window.google.maps.drawing.OverlayType.POLYGON,
          window.google.maps.drawing.OverlayType.POLYLINE,
          window.google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
      circleOptions: {
        fillColor: "#32373d79",
        fillOpacity: 0.8,
        strokeWeight: 1,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
    });

    drawingManager.setMap(map);
  };

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default GoogleMap;
