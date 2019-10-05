/*
 * Copyright (C) 2019 Adrian Carpenter
 *
 * This file is part of SFP Doctor (https://github.com/fizzyade/sfpdoctor) 
 * a hardware & software project for reading/writing SFP/SFP+ modules.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { IObject } from "interfaces/IObject";
import { IDevice} from "interfaces/IDevice";

export abstract class IDeviceFactory extends IObject {
    id_cf09ac795c434310b77dfe3ca5d3e843():string {
        return("IDeviceFactory");
    }  

    static hasInterface(arg: any) {
        let obj:IDeviceFactory = arg as IDeviceFactory;
    
        return (arg.id_cf09ac795c434310b77dfe3ca5d3e843 !== undefined);
    }

    abstract open():boolean;
}
