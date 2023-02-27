const valid_tokens_for_applications = [
    "f68g-EBTy-jGYP-UmTo"
]
export const authHandler = async (event: any) => {
    // let {headers:{authorization}} = event;
    const response = {
      isAuthorized: true
    }
    return response;
};