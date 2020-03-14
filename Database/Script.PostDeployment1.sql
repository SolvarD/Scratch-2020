/*
Modèle de script de post-déploiement							
--------------------------------------------------------------------------------------
 Ce fichier contient des instructions SQL qui seront ajoutées au script de compilation.		
 Utilisez la syntaxe SQLCMD pour inclure un fichier dans le script de post-déploiement.			
 Exemple :      :r .\monfichier.sql								
 Utilisez la syntaxe SQLCMD pour référencer une variable dans le script de post-déploiement.		
 Exemple :      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
Insert into T_REF_languages ([LanguageId], [Label], [Code]) values 
(1, 'Français', 'fr-FR'),
(2, 'English', 'en-US')

Insert into T_REF_MessageTypes ([MessageTypeId],[Label]) values
(1, 'PUBLIC'),
(2, 'PRIVATE')