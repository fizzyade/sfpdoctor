import { IObject } from "./IObject";
import { IDevice} from "./IDevice";

export abstract class IDeviceFactory extends IObject {
    id_cf09ac795c434310b77dfe3ca5d3e843():string {
        return("id_cf09ac795c434310b77dfe3ca5d3e843");
    }
}

export function isIDeviceFactory(arg: any) {
    let obj:IDeviceFactory = arg as IDeviceFactory;

    return (obj.id_cf09ac795c434310b77dfe3ca5d3e843 !== undefined);
}