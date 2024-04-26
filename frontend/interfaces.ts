interface Reservations {
    count: number,
    data: Reservation[]
}

interface Reservation {
    _id: string,
    reserveStartTime: string,
    reserveEndTime: string,
    user: string,
    coworkingspace: CoworkingspacesItem,
    totalcost : string,
    status: string
}

interface ReservationItem {
    userName : string
    cwsID : string
    startTime : string
    endTime : string,
    totalcost : string
}

interface Transaction {
    _id: string,
    reservation: string,
    user: string,
    totalcost: string,
    bank: string,
    slip: string
}

interface TransactionItem {
    reservation: string,
    user: string,
    totalcost: string,
    bank : string,
    slip: string
}

interface Coworkingspaces {
    count: number,
    data: CoworkingspacesItem[]
}

interface CoworkingspacesItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    tel: string,
    opentime: string,
    closetime: string,
    image: string
    rate : string
}

interface User {
    name: string,
    email: string,
    tel: string,
    password: string,
    role: string,
    expire: string
}

interface UserSession {
    _id: string,
    name: string,
    email: string,
    tel: string,
    role: string,
    createAt: string,
    token: string
}

interface PremiumTransactions {
    count: number,
    data: PremiumTransaction[]
}

interface PremiumTransaction {
    _id: string,
    user: string,
    membership: string,
    cost: string,
    bank: string,
    studentcard:string,
    status: string,
    slip: string
}