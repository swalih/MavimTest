import { OrderComponent } from "./order.component";

export interface Order{
    Crust: string,
    Flavor: string,
    Order_ID: number,
    Size: string,
    Table_No: string,
    Timestamp: number,
    id: number
}

export interface OrderForView extends Order{
    Timestamp_Date: Date,
    Timestamp_Time: string
}