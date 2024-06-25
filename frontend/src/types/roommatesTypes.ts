
export interface RoomMates {
    name:string
}

export interface onlyRoomMates {
    name: string;
    _id: string;
  }
  
  export interface roomMatesResponseWithPagination {
    results: onlyRoomMates[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  
  export interface roomMatesResponseWithoutPagination {
    results: onlyRoomMates[];
  }

  export interface roomMateseEditProps {
    roomMates: onlyRoomMates;
    setModal: React.Dispatch<
      React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>
    >;
    // list: ExpenseResponse;
    // setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
    triggerapi: boolean;
    setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export interface roomMatesAddProps {
    setModal: React.Dispatch<
      React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean}>
    >;
    // list: ExpenseResponse;
    // setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
    triggerapi: boolean;
    setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
  }