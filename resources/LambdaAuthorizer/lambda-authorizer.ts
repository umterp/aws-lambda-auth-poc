const valid_tokens_for_applications = [
    "f68g-EBTy-jGYP-UmTo"
]
const authhandler = async (event: any) => {
    let {headers:{authorization}} = event;
    const response = {
      "isAuthorized": valid_tokens_for_applications.includes(authorization)
    }
    return response;
};

module.exports = { authhandler } ;