

interface Iuser {
    id?: string;
    name: string;
    login: string;
    password: string;
}

interface Itask  {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string|null;
    boardId: string;
    columnId: string|null;
}

interface Iboard {
    id: string;
    title: string;
    columns: object[]|undefined
}



interface Idata {
    users: Iuser[];
    boards: Iboard[];
    tasks : Itask[];
}

const data :Idata = {
    users: [],
    boards: [],
    tasks: []
}

export { data, Iboard, Iuser, Itask }