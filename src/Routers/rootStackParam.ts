import { IListTickets } from "../Types";

export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Home: undefined;
    NewTicket: undefined;
    PlaceConfirm: undefined;
    TicketDetail: { ticket: IListTickets}
    Confirm: { cellNumber: string;};
};