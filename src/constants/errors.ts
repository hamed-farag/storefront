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
};

export default Object.freeze(errors);
