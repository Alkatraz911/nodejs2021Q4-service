interface Iuser {
    id?: string;
    name: string;
    login: string;
    password: string;
}

interface Itask {
    userId: string | null;
}

interface Iboard {
    id?: string;
    title: string;
    columns: object[]
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

export { data, Iboard,Iuser }