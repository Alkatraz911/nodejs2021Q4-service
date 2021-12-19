interface ItypeString {
    type: string;
}

const typeString:ItypeString = { type: 'string' };

interface Itaskprops {
    id?: object;
    title: object;
    order: object;
    description: object;
    userId: object; 
    boardId: object;
    columnId: object;
}

interface Itask {
    type: string;
    required?: string[];
    properties: Itaskprops;
}

interface Iid {
   boardId: object;
   id: object; 
}



const body: Itask = {
    type: "object",
    required: ["title","order"],
    properties: {
        title: typeString,
        order: { type: "number"},
        description: typeString,
        userId: { type: ["string","null"]}, 
        boardId: { type: ["string","null"]},
        columnId: { type: ["string","null"]},
    }
}

const id:Iid = {
    boardId: {
        type: ["string","null"]
    },

    id: {
        type: ["string","null"]
    }
}

const getTasksSchema = {
    params: id
}

const getTaskSchema = {
    params: id
}

const postTaskSchema = {
    body
}

const editTaskSchema = {
    params: id,
    body
}

const deleteTaskSchema = {
    params: id
}

export { getTasksSchema, getTaskSchema, postTaskSchema, editTaskSchema, deleteTaskSchema }