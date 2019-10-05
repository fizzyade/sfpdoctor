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

import { IDeviceFactory } from "interfaces/IDeviceFactory"
import * as Usb from "usb" ;

export class SFPDoctorAlphaDeviceFactory {
    open():boolean {
        let deviceList:Usb.Device[];
  
        Usb.on("attach", function(arg) {
            let obj:Usb.Device = arg as Usb.Device;

            console.log("SFP Doctor Alpha interface attached.");
        });

        Usb.on("detach", function(arg) {
            let obj:Usb.Device = arg as Usb.Device;

            console.log("SFP Doctor Alpha interface detached.");
        });

        deviceList = Usb.getDeviceList();

        console.log("there were "+deviceList.length+" devices");

        for (let usbDevice of deviceList) {
            if ( (usbDevice.deviceDescriptor.idVendor==0x1209) && 
                 (usbDevice.deviceDescriptor.idProduct==0x50DA) ){
                console.log("Found SFP Doctor Alpha interface.");
            }
        }

        return(true);
    }
}