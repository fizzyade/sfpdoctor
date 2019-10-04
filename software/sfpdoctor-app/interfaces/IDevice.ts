/*
 * Copyright (C) 2019 Adrian Carpenter
 *
 * This file is part of SFP Doctor a hardware & software project for reading/writing SFP modules.
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