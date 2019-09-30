export abstract class IObject {
    id_9484489f26864d0fb1b8bd51e63f3bbd():string {
        return("id_9484489f26864d0fb1b8bd51e63f3bbd");
    }
}

export function isIObject(arg: any) {
    let obj:IObject = arg as IObject;

    return (arg.id_9484489f26864d0fb1b8bd51e63f3bbd !== undefined);
}