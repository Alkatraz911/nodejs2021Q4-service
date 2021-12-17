interface ItypeString {
    type: string;
}
const typeString:ItypeString = { type: 'string' };

interface IcolumnsProps {
    id: object;
    title: object;
    order: object;
 }

interface IcolumnsItems {
    type: string;
    required?:string[];
    properties: IcolumnsProps;
}


interface Iid {
    id: ItypeString; 
}

interface Icolumns {
    type: string;
    items: IcolumnsItems;
}

interface Iboard {
    type?: string;
    required?: string[];
    properties: {
       id?: object;
       title: ItypeString;
       columns: Icolumns;
    }
}
const Board:Iboard = {
    properties: {
       id: {
          type: "string"
       },
       title: {
          type: "string"
       },
       columns: {
          type: "array",
          items: {
             type: "object",
             properties: {
                id: {
                   type: "string"
                },
                title: {
                   type: "string"
                },
                order: {
                   type: "integer"
                }
             }
            }
        }
    }
}

const body:Iboard = {
    type: "object",
    required: ["title","columns"],
    properties: {
        title: typeString,
        columns: {
            type: 'array',
            items: {
                type: 'object',
                required: ['title', 'order'],
                properties: {
                    id: typeString,
                    title: typeString,
                    order: { type: 'number'}
                }
            }
        }
    }
}

const id:Iid = {
    id: typeString
}

const getBoardsSchema = {
    response: {
        200: {
            type: 'array',
            items: Board
        },
    },
}

const getBoardSchema = {
    params: id
}

const postBoardSchema = {
    body
}

const editBoardSchema = {
    body
}

const deleteBoardSchema = {
    params: id
}

export { getBoardsSchema, getBoardSchema, postBoardSchema, editBoardSchema, deleteBoardSchema }