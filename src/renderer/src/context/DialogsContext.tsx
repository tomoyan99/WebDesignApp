import { createContext, useContext, useState, ReactNode } from 'react';
import {StopWatch} from "../components/Dialogs/StopWatch";
import {Tweet} from "../components/Dialogs/Tweet";
import {AddTask} from "../components/Dialogs/AddTask";
import {AddLog} from "../components/Dialogs/AddLog";
import {useStopwatchContext} from "./StopwatchContext"; // カスタムダイアログコンポーネント

// ダイアログの種類を定義
export type DialogType = 'StopWatch' | 'AddLog' | 'AddTask' | 'Tweet';

// コンテキストの型定義
interface DialogContextType {
    dialogType: DialogType | null;
    dialogProps: any;
    openDialog: (type: DialogType, props?: any) => void;
    closeDialog: () => void;
}

// コンテキストの作成
const DialogContext = createContext<DialogContextType | null>(null);

// プロバイダーコンポーネント
export function DialogsProvider({ children }: { children: ReactNode }) {
    const [dialogType, setDialogType] = useState<DialogType | null>(null);
    const [dialogProps, setDialogProps] = useState<any>(null);
    const {  setIsMinimum  } = useStopwatchContext();

    const openDialog = (type: DialogType, props: any = {}) => {
        setDialogType(type);
        setDialogProps(props);
        if (type === 'StopWatch') {
            setIsMinimum(false);
        }
    };

    const closeDialog = () => {
        setDialogType(null);
        setDialogProps(null);
    };

    return (
        <DialogContext.Provider value={{ dialogType, dialogProps, openDialog, closeDialog }}>
            {children}
            <UnifiedDialog />
        </DialogContext.Provider>
    );
}

// ダイアログを操作するカスタムフック
export function useMyDialog() {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
}

// 汎用的なダイアログコンポーネント
function UnifiedDialog() {
    const { dialogType, dialogProps, closeDialog } = useMyDialog();

    if (!dialogType) return null;

    const renderDialogContent = () => {
        switch (dialogType) {
            case 'StopWatch':
                return <StopWatch {...dialogProps} closeDialog={closeDialog} isOpen={!!dialogType} />;
            case 'AddLog':
                return <AddLog {...dialogProps} closeDialog={closeDialog} isOpen={!!dialogType}/>;
            case 'AddTask':
                return <AddTask {...dialogProps} closeDialog={closeDialog} isOpen={!!dialogType}/>;
            case 'Tweet':
                return <Tweet {...dialogProps} closeDialog={closeDialog} isOpen={!!dialogType}/>;
            default:
                return null;
        }
    };

    return renderDialogContent();
}
