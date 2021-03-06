const BASE_URL_V1 = "/api/v1";

const urlsV1 = Object.freeze({
    user: {
        getUser: "/user/",
        signIn: "/user/signin",
        signup: "/user/signup",
    },
    category: "/category",
    product: "/product",
    order: "/order",
    orderProducts: "/order/products",
});

export { BASE_URL_V1, urlsV1 };
