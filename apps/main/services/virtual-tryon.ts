import { apiAxios2WithToken } from "@nyx-frontend/main/services/apiHandler";
import axios from "axios";

export const createFashionkit = async (data: Object) => {
    const response = await apiAxios2WithToken.post(
        `/virtualTryOn/createFashionKit`,
        data,
    );
    return response?.data;
};


export const UploadApparel = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("/virtualTryOn/addApparelToFashionKit", data, {

        withCredentials: true,
    });

    return response?.data;
}

export const getApparel = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("/virtualTryOn/getApparels", data, {

        withCredentials: true,
    })

    return response?.data;
}

export const addModel = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("/virtualTryOn/addModels", data, {

        withCredentials: true,
    })

    return response?.data;
}

export const getModels = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("/virtualTryOn/getModels", data, {

        withCredentials: true,
    })

    return response?.data;
}

export const deleteApparel = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("/virtualTryOn/deleteApparel",
        data, {
        // withCredentials: true,
    }
    );
    return response?.data;
}

export const deleteFashionkit = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("/virtualTryOn/deleteApparelFashionKit",
        data, {
        withCredentials: true,
    }
    );
    return response?.data;
}

export const deleteModel = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("/virtualTryOn/deleteModels",
        data, {
        withCredentials: true,
    }
    );
    return response?.data;
}

export const generateVTONModel = async (data: FormData) => {
    const response = await apiAxios2WithToken.post("virtualTryOn/generateModelTask",
        data, {
        withCredentials: true,
    }
    );
    return response?.data;
}

export const savefashionkit = async (data: Object) => {
    const response = await apiAxios2WithToken.post(
        `/virtualTryOn/saveFashionKIt`,
        data,
        {
            withCredentials: true,
        }
    );
    return response.data;
};

export const onboardingFashionKit = async (data: Object) => {
    const response = await apiAxios2WithToken.post(
        `/virtualTryOn/save-fashionkit-onboard`,
        data,
        {
            withCredentials: true,
        }
    );
    return response.data;
};

export const getSavedFashionKits = async (fashionkitId: any) => {
    const response = await apiAxios2WithToken.get(
        `/virtualTryOn/get-all-fashionkit/${fashionkitId}`,
        {
            withCredentials: true,
        },
    );
    return response?.data;
};

export const vtonmodelstatus = async (taskId: any) => {
    const response = await apiAxios2WithToken.get(
        `/virtualTryOn/generateModelStatusById/${taskId}`,
        {
            withCredentials: true,
        },
    );
    return response?.data;
};

export const imageLikeDisLikeService = async (data: Object) => {
    const response = await apiAxios2WithToken.post(
        `/image-generate-reaction`,
        data,
        {
            withCredentials: true,
        },
    );
    return response.data;
};