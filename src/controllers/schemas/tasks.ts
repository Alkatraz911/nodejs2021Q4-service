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
   boardId: ItypeString;
   taskId: ItypeString; 
}

const task:Itask = {
    type: 'object',
    properties: {
        id: typeString,
        title: typeString,
        order: { type: "number"},
        description: typeString,
        userId: { type: ["string","null"]}, 
        boardId: { type: ["string","null"]},
        columnId: { type: ["string","null"]}
    },
};

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
        type: "string"
    },

    taskId: {
        type: "string"
    }
}

const getTasksSchema = {
    response: {
        200: {
            type: 'array',
            items: task
        },
    },
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