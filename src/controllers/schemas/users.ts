
interface ItypeString {
    type: string;
}

const typeString:ItypeString = { type: 'string' };

interface Iusercreds {
    id?: object;
    name: object;
    login: object;
    password?: object;
}

interface Iuser {
    type: string;
    required?: string[];
    properties: Iusercreds;
}

interface Iid {
    UserId: ItypeString; 
}

const user :Iuser = {
    type: 'object',
    properties: {
        id: typeString,
        name: typeString,
        login: typeString,
    },
};

const body :Iuser = {
    type: "object",
    required: ["login", "password"],
    properties: {
        name: typeString,
        login: typeString,
        password: typeString
    }
}

const id :Iid = {
    UserId: typeString
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
    params: id,
}

export { getUsersSchema, getUserSchema, postUserSchema, editUserSchema, deleteUserSchema }