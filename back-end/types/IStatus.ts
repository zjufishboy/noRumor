import { IObject } from "./IObject";

export interface IStatus{
    status:boolean;
    data?:IObject;
    detail:string;
}
export const StatusDefault:IStatus={status:false,detail:"默认结果"}
export interface statusFucntion{
    (status:IStatus):void
}