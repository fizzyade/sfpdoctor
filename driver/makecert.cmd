<# Creates a self signed code signing certificate #>

Write-Verbose "Creating code signing certificate."

$cert = New-SelfSignedCertificate `
                -Subject "CN=fizzyade.com Code Signing" `
                -FriendlyName "fizzyade.com code signing certificate" `
                -KeyAlgorithm RSA `
                -HashAlgorithm SHA256 `
                -KeyLength 2048 `
                -Type CodeSigningCert `
                -CertStoreLocation Cert:\LocalMachine\My\

Write-Verbose "Moving code signing certificate into trusted root CA's"

Move-Item "Cert:\LocalMachine\My\$($cert.Thumbprint)" Cert:\LocalMachine\Root
