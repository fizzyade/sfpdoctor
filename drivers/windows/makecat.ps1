<# 
 # Copyright (C) 2019 Adrian Carpenter
 #
 # This file is part of SFP Doctor (https://github.com/fizzyade/sfpdoctor) 
 # a hardware & software project for reading/writing SFP/SFP+ modules.
 # 
 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 # 
 # This program is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.
 # 
 # You should have received a copy of the GNU General Public License
 # along with this program.  If not, see <http://www.gnu.org/licenses/>.
 #>

<#
 #  .SYNOPSIS
 #      Script to generate a signed cat file
 #  .DESCRIPTION
 #      This script attempts to generate a cat file for the driver and then
 #      sign it with the key generated using the makecert sdript.
 #>

<#
 # The password for the code signing key, this should match the password
 # set in the makecert script.
 #>

$keyPassword = "password"
function getInf2Cat() {
    $kitArray = @("KitsRoot10", "KitsRoot81", "KitsRoot8")

    foreach ($kit in $kitArray) {
        try {
            $path = Get-ItemPropertyValue -Path "HKLM:\SOFTWARE\Microsoft\Windows Kits\Installed Roots" -Name $kit -ErrorAction SilentlyContinue

            if ($null -ne $path) {
                $filename = $path + "bin\x64\inf2cat.exe";

                if (Test-Path $filename -PathType leaf) {
                    return($filename);
                }

                $filename = $path + "bin\x86\inf2cat.exe";

                if (Test-Path $filename -PathType leaf) {
                    return($filename);
                }
            }

        }
        catch {
        }
    }

    return $null
}

$inf2cat = getInf2Cat

Add-Type -AssemblyName System.Windows.Forms

# check if we managed to find a inf2cat program, if not we inform the user and exit.

if ($null -eq $inf2cat) {
    [System.Windows.Forms.MessageBox]::Show('The inf2cat program could not be located.  Please ensure that a compatible Windows Kit is installed and then run this program again.', 'makecat error')
    
    Exit
}

# check to see if the certificate file exists

if (!(Test-Path ".\cert\devcert.pfx" -PathType leaf)) {
    [System.Windows.Forms.MessageBox]::Show('The code signing certificate could not be found, please run the makecert script first.', 'makecat error')

    Exit
}

$cert = new-object System.Security.Cryptography.X509Certificates.X509Certificate2 

Write-Output "Loading certificate..."

# try to load the certificate, if we have a failure here we assume that the key was invalid.

try {
    $cert.import(".\cert\devcert.pfx", $keyPassword, "Exportable,PersistKeySet")  
}

catch {
    [System.Windows.Forms.MessageBox]::Show('The certificate could not be loaded, you may have to change the password in this script.', 'makecat error')
    
    Exit
}

Write-Output "Generating cat..."

try {
    & $inf2cat /driver:./files /os:10_X64,10_X86
}

catch {
    [System.Windows.Forms.MessageBox]::Show('An error occured while running the inf2cat program.', 'makecat error')
    
    Exit
}

Write-Output "Signing cat..."

try {
    Set-AuthenticodeSignature -Certificate $cert -TimestampServer 'http://timestamp.digicert.com' -FilePath .\files\SFP_Doctor.cat -ErrorAction SilentlyContinue
}

catch {
    [System.Windows.Forms.MessageBox]::Show('An error occured while signing the cat file.', 'makecat error')

    Exit
}

[System.Windows.Forms.MessageBox]::Show('The driver has been signed!', 'makecat success')

