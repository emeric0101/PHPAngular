@echo off
title DMO
echo Installation de Dmo -Dev
echo.
echo Emeric BAVEUX - Utilisation sous autorisation uniquement
echo.
echo.
where /q php
if ERRORLEVEL 1 (
	echo PHP not found
	exit /b
)

where /q node
if ERRORLEVEL 1 (
	echo Node.JS not found
	exit /b
)
where /q bower
if ERRORLEVEL 1 (
	echo bower not found, installing
	npm install -g bower
)
where /q karma
if ERRORLEVEL 1 (
	echo bower not found, installing
	npm install -g karma jasmine-core phantomjs-prebuilt
)
echo Installation des dependances PHP
php composer.phar update
echo.
echo Liste des commandes possibles : 
echo 	jstest.bat	Tests unitaire front avec Karma
echo 	phpunit.bat	Tests unitaires back avec phpunit
echo 	doctrine.bat	Outils de gestion Doctrine DB
echo.
echo Installation des dependances js
pause
cd web
bower update
@echo on
