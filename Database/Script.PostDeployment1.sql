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

Insert Into T_REF_Roles ([RoleId],[Label]) values
(1, 'ADMIN'),
(2, 'WEBMASTER'),
(3, 'USER'),
(4, 'VISITOR'),
(5, 'ANONYME')
declare @now datetime = GETDATE();
Insert Into Users ([RoleId],[FirstName],[LastName],[Email],[UserName],[Password],[Created],[isActive],[LanguageId]) values
--totototo
(1, 'Solvar', 'Dimitri', 'solvar@msn.com', 'Belphegore', 'c33ca5e7eae116138d1d1b61158d58f9', @now, 1, 1),
--Visitor2020
(4, 'Fourth', 'Type', 'solvar@msn.com', 'Visitor', 'a44846113b882c1f57cd03b696c40e76', @now, 1, 1)

Insert into T_REF_Dictionnary ([LanguageId],[Key],[Label] ,[Created]) values 
(1,'DATABASE','Base de donnée', @now),
(2,'DATABASE','Database', @now),
(1,'HOME', 'Accueil', @now),
(2,'HOME', 'Home', @now),
(1,'MULTI_LANGUAGE', 'Interniationalisation', @now),
(2,'MULTI_LANGUAGE', 'Multi language', @now),
(1,'CANCEL', 'Annuler', @now),
(2,'CANCEL', 'Cancel', @now),
(1,'LOGIN', 'Identification', @now),
(2,'LOGIN', 'Login', @now),
(1,'EMAIL', 'Adresse mail', @now),
(2,'EMAIL', 'E-mail', @now),
(1,'PASSWORD', 'Mot de passe', @now),
(2,'PASSWORD', 'Password', @now),
(1,'STACK', 'Architecture', @now),
(2,'STACK', 'Stack', @now),
(1,'AUTHENTICATION', 'Identhification', @now),
(2,'AUTHENTICATION', 'Authentication', @now)