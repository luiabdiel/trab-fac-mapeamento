"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useState } from "react";
import styled from "styled-components";
import positions from "../positions.json";
import customMarkerIcon from "../assets/images/recycle.png";

const Container = styled.div`
  height: 100vh;
`;

const TagInput = styled.input`
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 12px;

  width: 240px;
  height: 32px;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  outline: none;

  font-size: 14px;
  text-overflow: ellipsis;

  position: absolute;
  left: 50%;
  margin-left: -120px;
  margin-top: 12px;
`;

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

const centerPosition = {
  lat: -9.411795767433379,
  lng: -40.503899748402446,
};

export function MapView() {
  const [map, setMap] = useState<google.maps.Map>();
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );
  const [marker, setMarker] = useState<google.maps.LatLng | null>(null);
  const [markersLoaded, setMarkersLoaded] = useState(false);

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
    setInfoWindow(new google.maps.InfoWindow());
    setMarkersLoaded(true);
  };

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox!.getPlaces();

    const place = places![0];

    const location = {
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
    };
    setMarker(new google.maps.LatLng(location.lat, location.lng));

    map?.panTo(location);
  };

  const handleMarkerClick = (markerPosition: google.maps.LatLng | null) => {
    if (map && infoWindow && markerPosition) {
      const matchingPosition = positions.find((position) => {
        return (
          position.Latitude === markerPosition.lat() &&
          position.Longitude === markerPosition.lng()
        );
      });

      if (matchingPosition) {
        const contentString = `
          <div>
            <h3>${matchingPosition.name}</h3>
            <p>${matchingPosition.description}</p>
          </div>
        `;

        infoWindow.setContent(contentString);
        infoWindow.setPosition(markerPosition);
        infoWindow.open(map);
      }
    }
  };

  return (
    <Container>
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={centerPosition}
          zoom={15}
          options={{
            zoomControl: false,
            styles: [
              {
                elementType: "labels",
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <TagInput placeholder="Digite um endereço" />
          </StandaloneSearchBox>
          {marker && <Marker position={marker} />}
          {markersLoaded &&
            positions.map((position, index) => (
              <Marker
                key={index}
                position={{ lat: position.Latitude, lng: position.Longitude }}
                onClick={(e) => handleMarkerClick(e.latLng)}
                icon={{
                  url: customMarkerIcon.src,
                  scaledSize: new window.google.maps.Size(35, 35),
                }}
              />
            ))}
        </GoogleMap>
      </LoadScript>
    </Container>
  );
}
