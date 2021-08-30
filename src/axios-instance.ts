import axios from 'axios';

export default (settings: { baseURL: string; apiKey: string; clientId: string }) => {
    const { apiKey, clientId, ...axiosConfig } = settings;

    const instance = axios.create(axiosConfig);

    instance.interceptors.request.use(options => {
        options.headers['Api-Key'] = apiKey;
        options.headers['Client-Id'] = clientId;
        return options;
    });

    instance.interceptors.response.use(
        response => response,
        error => {
            // console.log(error);
            throw error && error.response && error.response.data;
        },
    );

    return instance;
};
