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
    required: ["title"],
    properties: {
        title: typeString,
        columns: {
            type: 'array'
        }
    }
}

const id = {
    id: {
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