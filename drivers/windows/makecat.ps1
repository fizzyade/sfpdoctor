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
$inf2cat = "C:\Program Files (x86)\Windows Kits\10\bin\x86\inf2cat.exe"

$cert = new-object System.Security.Cryptography.X509Certificates.X509Certificate2 

$cert.import(".\cert\devcert.pfx", $keyPassword, "Exportable,PersistKeySet") 

& $inf2cat /driver:./files /os:10_X64,10_X86

Set-AuthenticodeSignature -Certificate $cert -TimestampServer 'http://timestamp.digicert.com' -FilePath .\files\SFP_Doctor.cat
