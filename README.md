# SFP Doctor
SFP Doctor is an open source hardware &amp; software project for reading and writing the EEPROM inside SFP &amp; SFP+ modules.

## About

SFP modules contain an EEPROM which contains information about the module.  This information includes the OUI (Organizationally Unique Identifier) which identifies the vendor of the module.

Some NIC's and switches are locked to using a particular vendors own SFP modules, this hardware and software project provides a tool for reading and modifying this information (providing the vendor has not disabled write access to the EEPROM).

The hardware design is intended to be as simple and cheap as possible, therefore it makes use of the [Cypress CYC8CKIT-059](https://www.cypress.com/documentation/development-kitsboards/cy8ckit-059-psoc-5lp-prototyping-kit-onboard-programmer-and) prototyping board as the USB interface to the EEPROM on the module, this board is readily and cheaply available.

## Repository Contents

* **/hardware** - KiCad schematic and PCB layout source files.
* **/firmware** - The firmware for the [CY8C5888LTI-LP097](https://www.cypress.com/part/cy8c5888lti-lp097) microcontroller on the [Cypress CYC8CKIT-059](https://www.cypress.com/documentation/development-kitsboards/cy8ckit-059-psoc-5lp-prototyping-kit-onboard-programmer-and) prototyping board.
* **/software** - The desktop software to control the hardware.

## Required Tools

* [Cypress PSoC Creator](https://www.cypress.com/products/psoc-creator-integrated-design-environment-ide) for firmware development.
* [KiCad](http://kicad-pcb.org/) for hardware design.
* [ELECTRON](https://electronjs.org/) for desktop software development.

## Project Status

### Hardware

The hardware design has been sent for manufacture, this will take somewhere in the region of 20 days to be produced and shipped.

### Firmware

Firmware development is already underway as I already have the CYC8CKIT-059 prototyping board in hand.

### Software

This is being worked on in parallel with the firmware.

## License

This project is open source and the entire project is released under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).

Distributed as-is; no warranty is given.