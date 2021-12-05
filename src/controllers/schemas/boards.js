const typeString = { type: 'string' };

const Board = {
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

const body = {
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

const id = {
    boardId: {
        type: "string"
    }
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

module.exports = { getBoardsSchema, getBoardSchema, postBoardSchema, editBoardSchema, deleteBoardSchema }