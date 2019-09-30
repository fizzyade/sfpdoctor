"C:\Program Files (x86)\Windows Kits\10\bin\x86\Inf2Cat.exe" /driver:./windows /os:10_X64,10_X86
Signtool sign /v /fd sha256 /f ./cert/devcert.pfx /p password /t http://timestamp.digicert.com "windows/SFP_Doctor.cat"
