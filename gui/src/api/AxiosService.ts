import Axios, { AxiosInstance } from "axios";
import { ApiEndpoint } from "@/definitions/ApiEndpoint";

export function getAxiosInstance(apiEndpoint: ApiEndpoint): AxiosInstance {
  return Axios.create({
    baseURL: apiEndpoint.baseUrl,
    timeout: 3000
  });
}
