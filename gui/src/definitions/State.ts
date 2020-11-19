import { ApiEndpoint } from "@/definitions/ApiEndpoint";

export interface State {
  availableEndpoints: ApiEndpoint[];
  currentEndpoint: ApiEndpoint | null;
}
