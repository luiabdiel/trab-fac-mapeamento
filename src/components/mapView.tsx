"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useState } from "react";
import styled from "styled-components";

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

const API_KEY = process.env.NEXT_PUBLIC_API_URL as string;

const position = {
  lat: -9.411795767433379,
  lng: -40.503899748402446,
};

export function MapView() {
  const [map, setMap] = useState<google.maps.Map>();
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [markers, setMarkers] = useState<any[]>([]);

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
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

    setMarkers([...markers, location]);

    map?.panTo(location);
  };

  return (
    <Container>
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
        >
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <TagInput placeholder="Digite um endereço" />
          </StandaloneSearchBox>
          {markers?.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript>
    </Container>
  );
}
