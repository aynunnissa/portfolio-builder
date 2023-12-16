import { IPortfolio } from "@/types/user"
import * as actionTypes from "./actionTypes"



export const loadPortolio = (portfolios: IPortfolio[]) => {
    return {
        type: actionTypes.LOAD_PORTFOLIO,
        portfolios: portfolios
    }
}