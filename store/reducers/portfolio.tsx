import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INewPortfolio, IPortfolio } from '@/types/user';

interface IExistPortfolioObject extends IPortfolio {
  changed: boolean;
}

interface IExistPortfolio {
  [key: string]: IExistPortfolioObject;
}

interface IPortfolioState {
  existingPortfolios: IExistPortfolio;
  portfolios: IPortfolio[];
  newPortfolios: INewPortfolio[];
  idDeletedPortfolios: string[];
  totalChanged: number;
  isLoadingData: boolean;
}

const initialState: IPortfolioState = {
  existingPortfolios: {},
  portfolios: [],
  newPortfolios: [],
  idDeletedPortfolios: [],
  totalChanged: 0,
  isLoadingData: true,
};

const isPortfolioEqual = (prevPort: IPortfolio, newPort: IPortfolio) => {
  return (
    prevPort.name !== newPort.name ||
    prevPort.company !== newPort.company ||
    prevPort.position !== newPort.position ||
    prevPort.startDate !== newPort.startDate ||
    prevPort.endDate !== newPort.endDate ||
    prevPort.description !== newPort.description
  );
};

const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    loadPortfolio: (state, action: PayloadAction<IPortfolio[]>) => {
      /**
       * Create map object from existing portfolio for changes checking purpose
       */
      const objectPortfolios: IExistPortfolio = {};
      action.payload.forEach((portfolio: IPortfolio) => {
        const portID = portfolio.id;
        const portObj = {
          ...portfolio,
          changed: false,
        };

        objectPortfolios[portID] = portObj;
      });
      return {
        ...state,
        portfolios: action.payload,
        existingPortfolios: { ...objectPortfolios },
        isLoadingData: false,
      };
    },
    updatePortfolio: (state, action: PayloadAction<IPortfolio>) => {
      // Update portfolio value
      const updatedPortfolios = [...state.portfolios];
      const portfolioInd = updatedPortfolios.findIndex(
        portfolio => portfolio.id === action.payload.id
      );
      updatedPortfolios[portfolioInd] = action.payload;

      // Handle changes
      const existPortObj = { ...state.existingPortfolios[action.payload.id] };

      const newPort = action.payload;
      const isChanged = isPortfolioEqual(existPortObj, newPort);

      let currentTotalChanges = state.totalChanged;
      if (isChanged && !existPortObj.changed) {
        currentTotalChanges++;
      } else if (!isChanged && existPortObj.changed) {
        currentTotalChanges--;
      }
      existPortObj.changed = isChanged;

      return {
        ...state,
        totalChanged: currentTotalChanges,
        portfolios: [...updatedPortfolios],
        existingPortfolios: {
          ...state.existingPortfolios,
          [action.payload.id]: existPortObj,
        },
      };
    },
    deletePortfolio: (state, action: PayloadAction<string>) => {
      const portofolios = [
        ...state.portfolios.filter(porto => porto.id !== action.payload),
      ];
      const deletedPortfolios = [...state.idDeletedPortfolios, action.payload];
      const existingPortfo = { ...state.existingPortfolios };
      delete existingPortfo[action.payload];

      return {
        ...state,
        portfolios: portofolios,
        idDeletedPortfolios: deletedPortfolios,
        existingPortfolios: existingPortfo,
      };
    },
    addNewPortfolio: (state, action: PayloadAction<INewPortfolio>) => {
      const newPortos = [...state.newPortfolios];
      // const newInd: number = newPortos.length;
      const newPortData = action.payload;
      let currentTotalChanges = state.totalChanged;
      currentTotalChanges++;
      // newPortData.index = newInd;
      newPortos.push(newPortData);

      return {
        ...state,
        newPortfolios: newPortos,
        totalChanged: currentTotalChanges,
      };
    },
    updateNewPortfolio: (
      state,
      action: PayloadAction<{ portfolio: INewPortfolio; index: number }>
    ) => {
      const newPortos = [...state.newPortfolios];
      const data = action.payload;
      const updatedInd: number = action.payload.index;
      const newPortData = action.payload.portfolio;
      newPortos[updatedInd] = newPortData;

      return {
        ...state,
        newPortfolios: newPortos,
      };
    },
    deleteNewPortfolio: (state, action: PayloadAction<number>) => {
      let newPortos = [...state.newPortfolios];
      newPortos.splice(action.payload, 1);
      let currentTotalChanges = state.totalChanged - 1;
      return {
        ...state,
        newPortfolios: newPortos.slice(),
        totalChanged: currentTotalChanges,
      };
    },
  },
});

export const {
  loadPortfolio,
  updatePortfolio,
  addNewPortfolio,
  updateNewPortfolio,
  deletePortfolio,
  deleteNewPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const portfolioSelector = (state: { portfolioStore: IPortfolioState }) =>
  state.portfolioStore;
