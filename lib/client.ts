import { IClient, IProps, IResponse } from "@/types/client";
import axios from "axios";

export const bashUrl = "https://6579c5071acd268f9af9fe02.mockapi.io/api/v1";



export function client({ url, method, data, params }: IClient) {
    // console.log({ ...config, ...authHeader() });
  return axios({
    method: method,
    url: `${bashUrl}${url}`,
    data: data,
    params: { ...params },
  })
    .then(function (response): IResponse {
        console.log(response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch(function (error): IResponse {
      if (error.response) {
        return {
            status: error.response.status,
            error: error.response.data,
        };
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      return {
        error: error.message
      }
    });

}

client.get = (props: IProps) => client({ url: props.url, method: "GET" });

client.delete = (props: IProps) =>
  client({ url: props.url, method: "DELETE", data: props.data });

client.post = (props: IProps) =>
  client({ url: props.url, method: "POST", data: props.data });

client.put = (props: IProps) => client({ url: props.url, method: "PUT", data: props.data });

client.getParams = (props: IProps) =>client({ url: props.url, method: "GET", params: props.params });