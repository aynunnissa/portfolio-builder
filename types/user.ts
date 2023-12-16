interface IPort {
    name: string;
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}
export interface IPortfolio extends IPort {
    id: string;
}

export interface INewPortfolio extends IPort {
    index?: number;
}