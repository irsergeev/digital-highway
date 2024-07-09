import { Configuration, HighwayApi, HighwayMetadataApi } from "./generated";

export const GetHighwayMetadataApi = () : HighwayMetadataApi => {
    if(process.env.REACT_APP_BACKEND_URL){
        var config = new Configuration({ basePath: process.env.REACT_APP_BACKEND_URL });
        return new HighwayMetadataApi(config);
    }

    return new HighwayMetadataApi();
}

export const GetHighwayApi = () : HighwayApi => {
    if(process.env.REACT_APP_BACKEND_URL){
        var config = new Configuration({ basePath: process.env.REACT_APP_BACKEND_URL });
        return new HighwayApi(config);
    }

    return new HighwayApi();
}