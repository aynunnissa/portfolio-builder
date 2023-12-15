import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPortfolio } from "@/types/user";

interface IProductState {
    portfolios: IPortfolio[]
}

const initialState: IProductState = {
    portfolios: []
}

const portfolioSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadPortfolio: (state, action: PayloadAction<IPortfolio>) => {
            return {
                ...state,
                portfolios: state.portfolios
            };
        }
    }
})

export const { loadPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer

export const portfolioSelector = (state: { portfolioStore: IProductState }) => state.portfolioStore