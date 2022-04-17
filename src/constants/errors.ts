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
        code: "SF-ER-2",
        message: "Something went Wrong while creating new User!",
    },
};

export default Object.freeze(errors);
