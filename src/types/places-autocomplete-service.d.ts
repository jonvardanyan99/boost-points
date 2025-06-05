interface PlacePredictionsOptions {
  input: string;
}

interface PlacePrediction {
  place_id: string;
  description: string;
}

interface PlaceDetailsConfig {
  placeId: string;
  fields?: string[];
  language?: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceDetails {
  address_components: AddressComponent[];
  formatted_address: string;
  [key: string]: unknown;
}

interface PlacesService {
  getDetails: (
    placeDetailsConfig: PlaceDetailsConfig,
    getPlaceDetails: (placeDetails: PlaceDetails) => void,
  ) => void;
}

declare module 'react-google-autocomplete/lib/usePlacesAutocompleteService' {
  interface usePlacesAutocompleteServiceConfig {
    apiKey: string;
    options?: {
      types: string[];
    };
  }

  interface usePlacesAutocompleteServiceResponse {
    getPlacePredictions: (options: PlacePredictionsOptions) => void;
    placePredictions: PlacePrediction[];
    placesService: PlacesService;
  }

  // eslint-disable-next-line import/no-default-export
  export default function usePlacesAutocompleteService(
    config: usePlacesAutocompleteServiceConfig,
  ): usePlacesAutocompleteServiceResponse;
}
