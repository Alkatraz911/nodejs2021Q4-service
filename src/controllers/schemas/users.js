const typeString = { type: 'string' };

const user = {
    type: 'object',
    properties: {
        id: typeString,
        name: typeString,
        login: typeString,
    },
};

const body = {
    type: "object",
    required: ["name","login", "password"],
    properties: {
        name: typeString,
        login: typeString,
        password: typeString
    }
}

const id = {
    id: {
        type: "string"
    }
}

const getUsersSchema = {
    response: {
        200: {
            type: 'array',
            items: user
        },
    },
}

const getUserSchema = {
    params: id
}

const postUserSchema = {
    body
}

const editUserSchema = {
    body
}

const deleteUserSchema = {
    params: id
}

module.exports = { getUsersSchema, getUserSchema, postUserSchema, editUserSchema, deleteUserSchema }