[uri_license]: https://www.gnu.org/licenses/gpl-3.0.en.html
[uri_license_image]: https://img.shields.io/badge/License-GPLv3-blue.svg

[![License: GPLv3][uri_license_image]][uri_license]

# SFP Doctor
SFP Doctor is an open source hardware &amp; software project for reading and writing the EEPROM inside SFP &amp; SFP+ modules.

## About

SFP modules contain an EEPROM which contains information about the module.  This information includes the OUI (Organizationally Unique Identifier) which identifies the vendor of the module.

Some NIC's and switches are locked to using a particular vendors own SFP modules, this hardware and software project provides a tool for reading and modifying this information (providing the vendor has not disabled write access to the EEPROM).

The hardware design is intended to be as simple and cheap as possible, therefore it makes use of the [Cypress CYC8CKIT-059](https://www.cypress.com/documentation/development-kitsboards/cy8ckit-059-psoc-5lp-prototyping-kit-onboard-programmer-and) prototyping board as the USB interface to the EEPROM on the module, this board is readily and cheaply available.

## Repository Contents

* **/hardware** - [KiCad](http://kicad-pcb.org/) schematic and PCB layout source files.
* **/firmware** - The firmware for the [CY8C5888LTI-LP097](https://www.cypress.com/part/cy8c5888lti-lp097) microcontroller on the [Cypress CYC8CKIT-059](https://www.cypress.com/documentation/development-kitsboards/cy8ckit-059-psoc-5lp-prototyping-kit-onboard-programmer-and) prototyping board.
* **/software** - The desktop software to control the hardware.
* **/drivers** - Platform dependent drivers for the hardware interface.

## Required Tools

* **[Cypress PSoC Creator](https://www.cypress.com/products/psoc-creator-integrated-design-environment-ide)** for firmware development.
* **[KiCad](http://kicad-pcb.org/)** for hardware design.
* **[Node.js](https://nodejs.org/)** for desktop software.
* **[Yarn](https://yarnpkg.com/)** for desktop software.
* **[ELECTRON](https://electronjs.org/)** for desktop software development.

## Building Software

### Desktop

After installing the prequestite packages, use the following commands.

    yarn run build
    yarn run start

The platform binary can be created with the following commands.

    yarn run build
    yarn run dist

(*Please note that currently the software is not functional*)

### Firmware

Open the firmware project in PSOC Creator and select build to create the firmware image.

## Project Status

### Hardware

* **Design:** Complete.
* **Manufacture:** In progress.
  * 06-Nov-2019 - PCB's arrived, build & test commenced.

### Firmware

* **Development:** Started.

### Software

* **Development:** Started.

## With Thanks

This project is using a USB VID & PID kindly allocated by [pid.codes](http://pid.codes).  Their repository can be found [here](https://github.com/pidcodes/pidcodes.github.com).  They support open source development by providing VID/PID pairs for free.

## License

This project is open source and the entire project is released under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).

Distributed as-is; no warranty is given.
