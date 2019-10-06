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

import { app, BrowserWindow } from "electron";
import * as Usb from "usb" ;
import { IDevice } from "./interfaces/IDevice";
import { IObject } from "./interfaces/IObject";
import { IDeviceFactory } from "./interfaces/IDeviceFactory";
import { SFPDoctorAlphaDeviceFactory } from "./SFPDoctorAlphaDeviceFactory";

// yarn reemove usb
// yarn add usb --force

// cert needs to be installed as a root ca and as a trusted publisher.

let mainWindow:Electron.BrowserWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

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

    console.log("dir "+__dirname);

    mainWindow.loadURL('file://' + __dirname + '/index.html');

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
