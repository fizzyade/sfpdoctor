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

import { app, BrowserWindow } from "electron";
import * as Usb from "usb" ;
import { IDevice, isIDevice } from "./interfaces/IDevice";
import { IObject, isIObject } from "./interfaces/IObject";
import { IDeviceFactory, isIDeviceFactory } from "./interfaces/IDeviceFactory";

// npm install electron --save-dev
// npm install --save-dev electron-rebuild
// npm install usb
// npm install typescript
// npm i @types/usb
// .\node_modules\.bin\electron-rebuild.cmd
// npm start

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//var mainWindow = null;

let mainWindow:Electron.BrowserWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

class fred extends IDevice {
    test():boolean {
        return true;
    }
}

class bob extends IDeviceFactory {

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 600,
        height: 300,
        minWidth: 500,
        minHeight: 200,
        acceptFirstMouse:true,
        titleBarStyle:"hidden"
    });

    mainWindow.loadURL('file://' + __dirname + '/../index.html');
    
    let usbDevice:Usb.Device;

    usbDevice = Usb.findByIds(0x4B4, 0x8052);

    if (usbDevice != null) {
        usbDevice.open();

        let deviceInterface: Usb.Interface;

        deviceInterface = usbDevice.interface(0);

        if (deviceInterface != undefined) {
            deviceInterface.claim();
    
            if (deviceInterface.endpoints.length==2) {
                let epIn: Usb.InEndpoint;
                let epOut: Usb.OutEndpoint;

                epIn = null;
                epOut = null;

                // locate in end out endpoints

                if (deviceInterface.endpoints[0].direction=='in')
                    epIn = deviceInterface.endpoints[0] as Usb.InEndpoint;
                else
                    epOut = deviceInterface.endpoints[0] as Usb.OutEndpoint;
        
                if (deviceInterface.endpoints[1].direction=='out')
                    epOut = deviceInterface.endpoints[1] as Usb.OutEndpoint
                else
                    epIn = deviceInterface.endpoints[1] as Usb.InEndpoint

                if ((epIn) && (epOut)) {
                    epIn.on("data", function (dataBuf) {
                        let dataArr = Array.prototype.slice.call(new Uint8Array(dataBuf, 0, dataBuf.length));
                        console.log("read:" + dataArr);
                    });
            
                    epIn.transferType = Usb.LIBUSB_TRANSFER_TYPE_BULK;
            
                    epIn.startPoll(1, 64);
            
                    console.log("writing...");
            
                    const buf = Buffer.from([1, 2, 3, 4, 5]);// 5, 6, 7, 8]);
            
                    epOut.transferType = Usb.LIBUSB_TRANSFER_TYPE_BULK;
            
                    epOut.transfer(buf, (error: Usb.LibUSBException) => {
                        if (error != undefined)
                            console.log("error sending!");
                    });

                    epOut.transfer(buf, (error: Usb.LibUSBException) => {
                        if (error != undefined)
                            console.log("error sending!");
                    });
            
                    console.log("ep 1 is " + epOut.direction);
                }
            }
        }
    }

    //let MyFred:fred;

    let MyFred = new fred();
    let MyBob = new bob();

    if (isIDevice(MyFred)) {
        console.log("fred is IDevice");
    }

    if (isIObject(MyFred)) {
        console.log("fred is IObject");
    }

    if (isIDeviceFactory(MyBob)) {
        console.log("bob is IDeviceFactory");
    }
    
    if (isIDevice(MyBob)) {
        console.log("bob is IDevice");
    }

    // Open the DevTools.
    //mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
