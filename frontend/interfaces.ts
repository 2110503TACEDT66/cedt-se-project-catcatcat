interface Reservations {
    count: number,
    data: Reservation[]
}

interface Reservation {
    _id: string,
    reserveStartTime: string,
    reserveEndTime: string,
    user: string,
    coworkingspace: CoworkingspacesItem
    totalcost : string
}

interface ReservationItem {
    userName : string
    cwsID : string
    startTime : string
    endTime : string
    totalcost : string
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
}

interface User {
    name: string,
    email: string,
    tel: string,
    password: string,
    role: string
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