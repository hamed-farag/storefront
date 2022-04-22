const errors = {
    MISSING_PARAMS: {
        code: "SF-ER-1",
        message: "One or more input is missing!",
    },
    USER_ALREADY_EXIST: {
        code: "SF-ER-2",
        message: "User Already Exist!",
    },
    USER_CREATE_ERROR: {
        code: "SF-ER-3",
        message: "Something went Wrong while creating new User!",
    },
    USER_NOT_FOUND: {
        code: "SF-ER-4",
        message: "User not Found!",
    },
    USER_GET_ERROR: {
        code: "SF-ER-5",
        message: "User not Found!",
    },
    CATEGORY_ALREADY_EXIST: {
        code: "SF-ER-6",
        message: "Category Already Exist!",
    },
    CATEGORY_CREATE_ERROR: {
        code: "SF-ER-7",
        message: "Something went Wrong while creating new Category!",
    },
    CATEGORY_NOT_FOUND: {
        code: "SF-ER-8",
        message: "Category not Found!",
    },
    CATEGORY_UPDATE_ERROR: {
        code: "SF-ER-9",
        message: "Something went Wrong while updating new Category!",
    },
    CATEGORY_DELETE_ERROR: {
        code: "SF-ER-10",
        message: "Something went Wrong while deleting new Category!",
    },
    CATEGORY_GET_ERROR: {
        code: "SF-ER-11",
        message: "Something went Wrong while getting Category!",
    },
    CATEGORIES_GET_ERROR: {
        code: "SF-ER-12",
        message: "Something went Wrong while getting Category!",
    },
    //
    PRODUCT_ALREADY_EXIST: {
        code: "SF-ER-13",
        message: "Product Already Exist!",
    },
    PRODUCT_CREATE_ERROR: {
        code: "SF-ER-14",
        message: "Something went Wrong while creating new Product!",
    },
    PRODUCT_NOT_FOUND: {
        code: "SF-ER-15",
        message: "Product not Found!",
    },
    PRODUCT_UPDATE_ERROR: {
        code: "SF-ER-16",
        message: "Something went Wrong while updating new Product!",
    },
    PRODUCT_DELETE_ERROR: {
        code: "SF-ER-17",
        message: "Something went Wrong while deleting new Product!",
    },
    PRODUCT_GET_ERROR: {
        code: "SF-ER-18",
        message: "Something went Wrong while getting Product!",
    },
    PRODUCTS_GET_ERROR: {
        code: "SF-ER-19",
        message: "Something went Wrong while getting Product!",
    },
    ///
    ORDER_CREATE_ERROR: {
        code: "SF-ER-20",
        message: "Something went Wrong while Creating Order!",
    },
    ORDER_GET_ERROR: {
        code: "SF-ER-21",
        message: "Something went Wrong while Getting Order!",
    },
    ORDER_DELETE_ERROR: {
        code: "SF-ER-22",
        message: "Something went Wrong while Deleting Order!",
    },
    ORDER_UPDATE_STATUS_ERROR: {
        code: "SF-ER-23",
        message: "Something went Wrong while Updating Order's Status!",
    },
};

export default Object.freeze(errors);
