import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch,
} from 'react';

interface ScanState {
    isScanning: boolean;
}

type ScanAction =
    | { type: 'TOGGLE_SCANNING'; payload: boolean };

interface ScanContextType {
    state: ScanState;
    dispatch: Dispatch<ScanAction>;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

const initialState: ScanState = {
    isScanning: false,
};

const scanReducer = (state: ScanState, action: ScanAction): ScanState => {
    switch (action.type) {
        case 'TOGGLE_SCANNING':
            return { ...state, isScanning: action.payload };
        default:
            return state;
    }
};

interface ScanProviderProps {
    children: ReactNode;
}

export const ScanProvider: React.FC<ScanProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(scanReducer, initialState);

    return (
        <ScanContext.Provider value={{ state, dispatch }}>
            {children}
        </ScanContext.Provider>
    );
};

export const useScanContext = (): ScanContextType => {
    const context = useContext(ScanContext);
    if (!context) {
        throw new Error('useScanContext must be used within a ScanProvider');
    }
    return context;
};
