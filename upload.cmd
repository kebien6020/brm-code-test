@echo Building the client in production mode
call yarn prod

rsync -avzr -e "ssh -i \"%USERPROFILE%\.ssh\id_rsa\"" ^
--perms --chmod=775 ^
--include="/app/" ^
--include="/app/**" ^
--include="/bootstrap/" ^
--include="/bootstrap/**" ^
--include="/config/" ^
--include="/config/**" ^
--include="/database/" ^
--include="/database/**" ^
--include="/public/" ^
--include="/public/**" ^
--include="/resources/" ^
--include="/resources/**" ^
--include="/routes/" ^
--include="/routes/**" ^
--include="/storage/" ^
--include="/storage/**" ^
--include=".env.example" ^
--include="artisan" ^
--include="composer.json" ^
--include="package.json" ^
--include="server.php" ^
--include="yarn.lock" ^
--exclude="*" ^
--progress ^
"./" "kevin@kevinpena.com:/var/www/brm-code-test/"

@echo Installing packages and running migrations
ssh -i "%USERPROFILE%\.ssh\id_rsa" -t kevin@kevinpena.com "cd /var/www/brm-code-test && composer install --no-dev"
