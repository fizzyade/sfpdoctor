<# 
 # Copyright (C) 2019 Adrian Carpenter
 #
 # This file is part of SFP Doctor a hardware & software project for 
 # reading/writing SFP modules.
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
 
$keyPassword = "password"
$issuerName = "fizzyade.com"

function Get-ScriptDirectory {
    if ($psise) {
        Split-Path $psise.CurrentFile.FullPath
    }
    else {
        $global:PSScriptRoot
    }
}

Write-Verbose "Creating code signing certificate..."

$cert = New-SelfSignedCertificate `
                -Subject "CN=$($issuerName)" `
                -FriendlyName "$($issuerName) code signing certificate" `
                -KeyAlgorithm RSA `
                -KeyExportPolicy Exportable `
                -HashAlgorithm SHA256 `
                -KeyLength 2048 `
                -Type CodeSigningCert `

$securePassword = $keyPassword | ConvertTo-SecureString -AsPlainText -Force

Write-Verbose "Exporting certificates..."

$rootPath = Get-ScriptDirectory

$pfxPath = $rootPath + "\cert\devcert.pfx"
$cerPath = $rootPath + "\cert\cert.cer"

Get-ChildItem -Path "Cert:\LocalMachine\My\$($cert.Thumbprint)" | Export-PfxCertificate -FilePath "$($pfxPath)" -Password $securePassword 

Get-ChildItem -Path "Cert:\LocalMachine\My\$($cert.Thumbprint)" | Export-Certificate -FilePath $cerPath -Type CERT

Write-Verbose "Removing certificates from store..."

Remove-Item "Cert:\LocalMachine\My\$($cert.Thumbprint)"