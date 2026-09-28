const HandelerError = (error) => {
    const axiosError = error;

    if(axiosError.response){
        const { status, data } = axiosError.response;
        if(data?.message && typeof data.message === "string") throw new Error(data.message);
        throw new Error(` error server : ${status} `);
    }

    throw new Error(" error server : 500! ");
}

export default HandelerError