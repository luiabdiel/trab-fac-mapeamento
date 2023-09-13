"use client";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
`;

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const position = {
  lat: -9.411795767433379,
  lng: -40.503899748402446,
};
const positionTrashBin = {
  lat: -9.410568680158166,
  lng: -40.50491028600273,
};

export function MapView() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_URL,
  });

  return (
    <Container>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
        >
          <Marker
            position={positionTrashBin}
            options={{
              label: {
                text: "test",
                className: "marker-pointer",
              },
            }}
          ></Marker>
        </GoogleMap>
      ) : (
        <></>
      )}
    </Container>
  );
}
