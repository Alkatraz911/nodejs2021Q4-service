const typeString = { type: 'string' };

const task = {
    type: 'object',
    properties: {
        id: typeString,
        title: typeString,
        order: { type: "number"},
        description: typeString,
        userId: { typeString, type: "null"}, 
        boardId: typeString,
        columnId: typeString
    },
};

const body = {
    type: "object",
    required: ["title","order"],
    properties: {
        title: typeString,
        order: { type: "number"},
        description: typeString,
        userId: { typeString, type: "null"}, 
        boardId: typeString,
        columnId: typeString
    }
}

const id = {
    boardId: {
        type: "string"
    },

    taskId: {
        type: "string"
    }
}

const getUsersSchema = {
    response: {
        200: {
            type: 'array',
            items: task
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
    params: id,
    body
}

const deleteUserSchema = {
    params: id
}

module.exports = { getUsersSchema, getUserSchema, postUserSchema, editUserSchema, deleteUserSchema }