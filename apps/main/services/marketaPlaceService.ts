import {apiAxios} from "./apiHandler";

export const marketPlaceService = async (query: string = "") => {
    const res = await apiAxios.get(`/tokens/get-primary-listing${query}`);
    return res.data;
}