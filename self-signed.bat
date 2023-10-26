@echo off

rem Generate the private key (key.pem)
openssl genpkey -algorithm RSA -out key.pem

rem Generate the self-signed certificate (cert.pem)
openssl req -x509 -key key.pem -out cert.pem -days 365 -subj "/C=IN/ST=Rajasthan/L=Jaipur/O=Organization/OU=IT/CN=localhost"

echo Private key (key.pem) and certificate (cert.pem) generated successfully.
