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

declare  @tmpLanguage table([LanguageId] int,
[Label] varchar(max),
[Code] varchar(10));

Insert into @tmpLanguage ([LanguageId], [Label], [Code]) values 
(1, 'Français', 'fr-FR'),
(2, 'English', 'en-US');

Merge into T_REF_languages trl using @tmpLanguage tmpl
on trl.[LanguageId] = tmpl.[LanguageId]
when not matched then
insert ([LanguageId], [Label], [Code]) values
( tmpl.[LanguageId],  tmpl.[Label],  tmpl.[Code]);

------------------------------------------------------------------------
declare @tmpMessageType table ([MessageTypeId] int,[Label] varchar(max));

Insert into @tmpMessageType ([MessageTypeId],[Label]) values
(1, 'PUBLIC'),
(2, 'PRIVATE');

Merge into T_REF_MessageTypes trm using @tmpMessageType tmpMt
on trm.[MessageTypeId] = tmpMt.[MessageTypeId]
when not matched then
insert ([MessageTypeId],[Label]) values
(tmpMt.[MessageTypeId],tmpMt.[Label]);

------------------------------------------------------------------------

declare @tmpRoles table ([RoleId] int,[Label] varchar(max));

Insert Into @tmpRoles ([RoleId],[Label]) values
(1, 'ADMIN'),
(2, 'WEBMASTER'),
(3, 'USER'),
(4, 'VISITOR'),
(5, 'ANONYME')

Merge into T_REF_Roles trr using @tmpRoles tmpR
on trr.[RoleId] = tmpR.[RoleId]
when not matched then
insert ([RoleId],[Label]) values
(tmpR.[RoleId],tmpR.[Label]);

------------------------------------------------------------------------

declare @now datetime = GETDATE();
declare @tmpUsers table ([RoleId] int,[FirstName] varchar(max),[LastName]varchar(max),[Email]varchar(max),[UserName]varchar(max),[Password]varchar(max),[Created] datetime,[isActive] bit,[LanguageId] int);

Insert Into @tmpUsers ([RoleId],[FirstName],[LastName],[Email],[UserName],[Password],[Created],[isActive],[LanguageId]) values
--totototo
(1, 'Solvar', 'Dimitri', 'solvar@msn.com', 'Belphegore', 'c33ca5e7eae116138d1d1b61158d58f9', @now, 1, 1),
--Visitor2020
(4, 'Fourth', 'Type', 'solvar@msn.com', 'Visitor', 'a44846113b882c1f57cd03b696c40e76', @now, 1, 1)


Merge into Users U using @tmpUsers tmpU
on U.[FirstName] = tmpU.[FirstName] and U.[LastName] = tmpU.[LastName] and U.[UserName] = tmpU.[UserName]
when not matched then
insert ([RoleId],[FirstName],[LastName],[Email],[UserName],[Password],[Created],[isActive],[LanguageId]) values
(tmpU.[RoleId],tmpU.[FirstName],tmpU.[LastName],tmpU.[Email],tmpU.[UserName],tmpU.[Password],tmpU.[Created],tmpU.[isActive],tmpU.[LanguageId]);

------------------------------------------------------------------------
declare @tmpDictionary table ([LanguageId] int,[Key] varchar(max),[Label] varchar(max) ,[Created] datetime);

Insert into @tmpDictionary ([LanguageId],[Key],[Label] ,[Created]) values 
(1,'DATABASE','Base de donnée', @now),
(2,'DATABASE','Database', @now),
(1,'HOME', 'Accueil', @now),
(2,'HOME', 'Home', @now),
(1,'MULTI_LANGUAGE', 'internationalisation', @now),
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
(1,'AUTHENTICATION', 'Identification', @now),
(2,'AUTHENTICATION', 'Authentication', @now),
(1,'ADMIN', 'Administrateur', @now),
(2,'ADMIN', 'Administrator', @now),
(1,'VISITOR', 'Visiteur', @now),
(2,'VISITOR', 'Visitor', @now),
(1,'MANAGE_USER', 'Gestion utilisateurs', @now),
(2,'MANAGE_USER', 'Manage users', @now),
(1,'ADD_USER', 'Ajouter utilisateur', @now),
(2,'ADD_USER', 'Add user', @now),
(1,'ANONYME', 'Anonyme', @now),
(2,'ANONYME', 'Anonymous', @now),
(1,'WEBMASTER', 'Webmaster', @now),
(2,'WEBMASTER', 'Webmaster', @now),
(1,'ADMINISTRATION', 'Administration', @now),
(2,'ADMINISTRATION', 'Administration', @now),
(1,'USERS', 'Utilisateurs', @now),
(2,'USERS', 'Users', @now),
(1,'DICTIONARY', 'Dictionnaire', @now),
(2,'DICTIONARY', 'Dictionary', @now),
(1,'USER', 'Utilisateur', @now),
(2,'USER', 'User', @now),
(1,'DELETE_TEXT', 'Voulez-vous vraiment supprimé', @now),
(2,'DELETE_TEXT', 'Do you really want delete', @now),
(1,'CONTEXT', 'Contexte', @now),
(2,'CONTEXT', 'Context', @now),
(1,'TO', 'à', @now),
(2,'TO', 'to', @now),
(1,'PROFIL', 'Profile', @now),
(2,'PROFIL', 'Profil', @now),
(1,'SKILLS', 'Compétences', @now),
(2,'SKILLS', 'Skills', @now),
(1,'PORTE_FOLIO', 'Porte-Folio', @now),
(2,'PORTE_FOLIO', 'Wallet', @now),
(1,'PRICES', 'Tarifs', @now),
(2,'PRICES', 'Prices', @now),
(1,'CONTACT_US', 'Contactez-nous', @now),
(2,'CONTACT_US', 'Contact us', @now),
(1,'CONTACT_ME', 'Contactez-moi', @now),
(2,'CONTACT_ME', 'Contact me', @now),
(1,'LANGUAGE', 'Langages', @now),
(2,'LANGUAGE', 'Languages', @now),
(1,'ORM', 'Object-Relational Mapping', @now),
(2,'ORM', 'mapping objet-relationnel', @now),
(1,'UNIT_TEST', 'Test unitaire', @now),
(2,'UNIT_TEST', 'Unit test', @now),
(1,'TOOLS', 'Outils', @now),
(2,'TOOLS', 'Tools', @now),
(1,'REPOSITORY', 'Dépôt code source', @now),
(2,'REPOSITORY', 'Repository source code', @now),

(1,'FIRSTNAME', 'Prénom', @now),
(2,'FIRSTNAME', 'Firstname source code', @now),
(1,'LASTNAME', 'Nom code source', @now),
(2,'LASTNAME', 'Lastname source code', @now),
(1,'MESSAGE', 'Message', @now),
(2,'MESSAGE', 'Message', @now),
(1,'SEND', 'Envoyer', @now),
(2,'SEND', 'Send', @now),

(1,'HELLO', 'Bonjour je suis Dimitri. Developper Fullstack français basé en région parisienne', @now),
(2,'HELLO', 'I’m Dimitri. French fullstack developer based in Paris', @now),
(1,'GOT_A_PROJECT', 'Vous avez un projet', @now),
(2,'GOT_A_PROJECT', 'You got a project', @now),
(1,'A_QUESTION', 'Une question', @now),
(2,'A_QUESTION', 'A question', @now)


Merge into T_REF_Dictionary trd using @tmpDictionary tmpD
on trd.[LanguageId] = tmpD.[LanguageId] and trd.[Key] = tmpD.[Key]
when not matched then
insert ([LanguageId],[Key],[Label] ,[Created]) values
(tmpD.[LanguageId],tmpD.[Key],tmpD.[Label] ,tmpD.[Created]);

------------------------------------------------------------------------