import { IObject } from "./IObject";

export abstract class IDevice extends IObject {
    id_b3b3139993494cdb8148f00d8880df3f():string {
        return("id_b3b3139993494cdb8148f00d8880df3f");
    }

    abstract test(): boolean;
}

export function isIDevice(arg: any) {
    let obj:IDevice = arg as IDevice;

    return (obj.id_b3b3139993494cdb8148f00d8880df3f !== undefined);
}