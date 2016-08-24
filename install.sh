#!/bin/bash

function checkApp {
	which $1 > /dev/null
	if [ $? == 1 ]; then
		echo "Try sudo apt install $1"
		exit
	fi
}

echo "Installation de Dmo -Dev"
echo ""
echo "Emeric BAVEUX - Utilisation sous autorisation uniquement"
echo ""
echo ""
checkApp php
checkApp node
checkApp bower
checkApp karma
echo "Installation des dependances PHP"
php composer.phar update
echo ""
echo "Liste des commandes possibles : "
echo "	jstest.bat	Tests unitaire front avec Karma"
echo "	phpunit.bat	Tests unitaires back avec phpunit"
echo "	doctrine.bat	Outils de gestion Doctrine DB"
echo ""
echo "Installation des dependances js"
cd web
bower update
