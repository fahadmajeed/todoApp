export interface IProps {
    value: ITask;
    onClick: (taskName: string) => void;
    onEdit: (task: ITask) => void;
}
export interface ITask {
    id: string;
    value: string;
}