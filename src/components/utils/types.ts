export interface IWinner {
    number: number;
    color: string;
    name: string;
    wins: number;
    bestTime: number;
  }

  export type CarItem = {
    name: string;
    color: string;
  };

  export interface iWinnerApi {
    id?: number;
    wins: number;
    time: number;
  }