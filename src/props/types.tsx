export type RowData = {
    id: number;
    quantity: number;
    price: number;
  };
  
  export type Part = {
    id: number;
    defaultPrice: number;
  };
  
  export type SelectContractsProps = {
    rows: RowData[];
    setRows: (rows: RowData[]) => void;
    handleIdChange: (index: number, newPart: Part | null) => void;
    handleQuantityChange: (index: number, value: number) => void;
    handlePriceChange: (index: number, value: number) => void;
    parts: Part[];
    setParts: React.Dispatch<React.SetStateAction<Part[]>>;
    
};

  