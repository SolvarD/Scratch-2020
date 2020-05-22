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
(1,'PROFIL', 'Profil', @now),
(2,'PROFIL', 'Profile', @now),
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
(2,'FIRSTNAME', 'Firstname', @now),
(1,'LASTNAME', 'Nom', @now),
(2,'LASTNAME', 'Lastname', @now),
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

declare @tmpSkillCategories table([Order] int, [Label] varchar(MAX))
insert INTO @tmpSkillCategories values 
(1, 'LANGUAGE'),
(2, 'DATABASE'),
(3, 'ORM'),
(4, 'UNIT_TEST'),
(5, 'TOOLS'),
(6, 'REPOSITORY')

Merge into SkillCategories sc using @tmpSkillCategories tmpSc
on sc.[Label] = tmpSc.[Label]
when not matched then
insert ([Order],[Label]) values
(tmpSc.[Order],tmpSc.[Label]);

-------------------------------------------------------------------------

declare @tmpSkillCategoryDetails table([SkillCategoryId] int, [Label] varchar(MAX));

declare @Language int = (select top 1 SkillCategoryId from SkillCategories where Label = 'LANGUAGE');
declare @Database int = (select top 1 SkillCategoryId from SkillCategories where Label = 'DATABASE');
declare @Orm int = (select top 1 SkillCategoryId from SkillCategories where Label = 'ORM');
declare @UnitTest int = (select top 1 SkillCategoryId from SkillCategories where Label = 'UNIT_TEST');
declare @Tools int = (select top 1 SkillCategoryId from SkillCategories where Label = 'TOOLS');
declare @Repository int = (select top 1 SkillCategoryId from SkillCategories where Label = 'REPOSITORY');

insert INTO @tmpSkillCategoryDetails ([SkillCategoryId], [Label]) values 
(@Language, 'Angular 8'),
(@Language, 'Angular 7'),
(@Language, 'Angular 6'),
(@Language, '.NET 4'),
(@Language, '.NET 4.5'),
(@Language, 'SignalR'),
(@Language, '.NET core 3'),
(@Language, '.NET core 2.1'),
(@Language, 'HTML5'),
(@Language, 'HTML3'),
(@Language, 'Material Design'),
(@Language, 'Bootstrap 3'),
(@Language, 'Bootstrap 4'),
(@Language, 'css'),
(@Language, 'AngularJs'),
(@Language, 'TypeScript'),
(@Language, 'ASP MVC4'),
(@Language, 'JQuery'),

(@Database, 'SQL2016'),
(@Database, 'SQL2012'),
(@Database, 'SQL2008'),

(@Orm, 'Dapper'),
(@Orm, 'EntityFramework'),
(@Orm, 'nHibernate'),

(@UnitTest, 'nUnit'),
(@UnitTest, 'MSTest'),
(@UnitTest, 'Karma/Jasmine'),
(@UnitTest, 'Selenium'),

(@Tools, 'Visual Studio 2019'),
(@Tools, 'Visual Studio Code'),
(@Tools, 'SQL Server Mnagement Studio'),
(@Tools, 'Balsamiq'),
(@Tools, 'Jira'),

(@Repository, 'Azure DevOps'),
(@Repository, 'Github'),
(@Repository, 'TFS')

Merge into SkillCategoryDetails scd using @tmpSkillCategoryDetails tmpScd
on scd.[Label] = tmpScd.[Label]
when not matched then
insert (SkillCategoryId,[Label]) values
(tmpScd.SkillCategoryId,tmpScd.[Label]);

-------------------------------------------------------------------------

declare @tmpExperiences table(
    [Name] VARCHAR(50) NOT NULL, 
    [Description] VARCHAR(MAX) NOT NULL, 
    [Start] DATETIME NOT NULL, 
    [End] DATETIME NULL);

    insert into @tmpExperiences ([Name],[Description],[Start],[End]) values 
    ('GlobalDevApp',
    'Ayant Quitté Extia après tant d''années de cocooning, j''ai décidé de créer GlobalDevApp pour développer des applications à la demande et/ou faire du freelance (l''avenir me montrera la voie).',
    Cast('2020-04-01' as date),
    NULL),
    
    ('ESN EXTIA --> Bolloré',
    'Sharp est une application qui doit succéder à Opale vieille de 10 ans.<br/>
                Elle sert à gérer les stocks de pétrole (achat/ vente / livraison), Achat / vente de devise,<br/>
                diffuser des prix aux agences ainsi que leurs volumétries vendus.<br/>
                <br/>
                Dans le cadre du remplacement de l’application Opale pour la pemière mise en prod, j’ai mis en place des Flux entrée / sortie en Json vers les services externes,
                développer des fonctionnalités (angular + c#), corriger des bugs et refactoring, mis en place les Test Unitaire front.<br/>
                J’ai par ailleurs traité le sujet d’import de l’historique de l’ancienne application par script sql (développement de soft de génération de script / exécution)
                à partir de fichiers texte.<br/>',
    Cast('2019-05-15' as date),
    Cast('2020-03-31' as date)),
    
    ('ESN EXTIA --> Neopost (Quadient)',
    'Suite a un appel d’offre Neopost a dut se lancer dans le développement d’une nouvelle version de son application Neostats Busness View 
                qui a essentiellement une fonction de reporting pour les entreprises concernant leurs machines à affranchir, pour les coûts selon les années,
                l’optimisation des coûts entre différents produits postaux et fréquence d’utilisation des machines, elle permet aussi l’exportation de ces rapports sous différents formats (PDF, CSV, xlsx).<br/>
                Cette application est développée en Angular 6 pour le front-end et en .NET core pour le back-end.',
    Cast('2018-07-01' as date),
    Cast('2019-04-30' as date)),
    
    ('ESN EXTIA --> LynkByNet',
    'SelfDeploy est un orchestrateur multi-cloud qui permet via une interface très simplifiée de déployer une à plusieurs machines virtuelles tout en gérant les Loads Balancer,
                les domaines, les Security Group et tout ce qui compose une infrastructure réseau classique sur Amazone, azure, OVH et d’autres providers.<br/>
                Le projet est une solution en Angular 1.5 en front-end et en ruby rails pour le back-end.<br/>
                Je travaille à la résolution de bugs, développer de nouvelles fonctionnalités, écrire des tests optimisés et factoriser le code legacy pour aboutir à une version 1.0 durant 2018,
                mise en production.<br/>
                Préparation de mise en production, correction d’anomalies sur la solution et refactoring de code existant.',
    Cast('2017-05-15' as date),
    Cast('2018-06-30' as date)),
    
    ('ESN EXTIA --> Areas Assurances',
    'Efficience est une application CRM interne d’Areas permettant aux agents de gérer leurs activités (RDV, Calendrier, Formations, Historique des échanges clients, Devis, Souscriptions, …)<br/>
                Le projet et une solution web encapsulé dans un hôte WPF qui est essentiellement développé en AngularJS/ TypeScript pour la partie Front-End avec une API REST C# pour le Back-End.<br/>
                Développement de nouveaux modules sur la solution (Efficience), préparation de mise en production, correction des anomalies et refactoring du code existant.',
    Cast('2016-03-01' as date),
    Cast('2017-05-01' as date)),
    
    ('ESN EXTIA --> Société générale',
    'CTY et SGMarket sont des plateformes de trading permettant l''achat, la vente de commodities et métaux sur les marchés européens. <br/>
                La version Angular est développée pour remplacer la version développée en Silverlight.  <br/>
                Préparation de mise en production, correction d’anomalies sur la solution et refactoring de code existant.',
    Cast('2015-08-01' as date),
    Cast('2016-02-01' as date)),

    ('Logaviv',
    'S''agissant d''une entreprise où j''ai travaillé 4 ans sur plusieurs projets <br/><br/>

              I/ WSD est un progiciel permettant l''accès aux informations de marché en temps réel 
              sur le cours des matières premières et des produits dérivés (Blé, Colza, Maïs, Orge, Cacao, Café, Sucre, Pétrole et Gaz, etc...)<br/>
              Projet de portage de la version Client lourd sur le Web.<br/><br/>

              II/ WSD Mobile (application AngularJS encapsulée via phoneGap) R&D, AngularJS était tout beau tout neuf, et developpement du projet AngularJS.<br/><br/>

              III/ Finterra est une solution web de gestion de positions proposée par les organismes stockeurs à destination de leurs agriculteurs. <br/><br/>
              IV/ Agrimarket est une plateforme web de e-commerce qui permet la contractualisation entre un opérateur et ses clients/fournisseurs (ex. : entre un OS et ses agriculteurs)',
    Cast('2011-09-01' as date),
    Cast('2015-07-31' as date));

Merge into Experiences ex using @tmpExperiences tmpEx
on ex.[Name] = tmpEx.[Name]
when not matched then
insert ([Name],[Description],[Start],[End]) values
(tmpEx.[Name],tmpEx.[Description],tmpEx.[Start],tmpEx.[End]);

-------------------------------------------------------------------------



    declare @tmpSkillCategoryDetailSaved table(
    [SkillCategoryDetailId] int,
    [SkillCategoryId] int,
    [Label] varchar(MAX));

    insert into @tmpSkillCategoryDetailSaved 
    select * from [SkillCategoryDetails];

    declare @tmpExperiencesSaved table(
    [ExperienceId] int NOT NULL,
    [Name] VARCHAR(50) NOT NULL, 
    [Description] VARCHAR(MAX) NOT NULL, 
    [Start] DATETIME NOT NULL, 
    [End] DATETIME NULL);

    insert into @tmpExperiencesSaved
    select * from Experiences;

    declare @GlobalDevApp int = (select top 1 ExperienceId from Experiences where [Name] = 'GlobalDevApp');
    declare @Bollore int = (select top 1 ExperienceId from Experiences where [Name] = 'ESN EXTIA --> Bolloré');
    declare @Neopost int = (select top 1 ExperienceId from Experiences where [Name] = 'ESN EXTIA --> Neopost (Quadient)');
    declare @LynkByNet int = (select top 1 ExperienceId from Experiences where [Name] = 'ESN EXTIA --> LynkByNet');
    declare @Areas int = (select top 1 ExperienceId from Experiences where [Name] = 'ESN EXTIA --> Areas Assurances');
    declare @SG int = (select top 1 ExperienceId from Experiences where [Name] = 'ESN EXTIA --> Société générale');    
    declare @Logaviv int = (select top 1 ExperienceId from Experiences where [Name] = 'Logaviv');

    declare @tmpExperiences_SkillCategoryDetail table(
    [ExperienceId] INT NOT NULL,
    [SkillCategoryDetailId] INT NOT NULL);

    insert into @tmpExperiences_SkillCategoryDetail 
    select @GlobalDevApp, [SkillCategoryDetailId]from [SkillCategoryDetails] where Label in ('.NET core 3.0', 'Angular 8', 'Karma/Jasmine', 'MSTest', 'HTML5','Bootstrap 4' ,'Azure SQL', 'Dapper')
    insert into @tmpExperiences_SkillCategoryDetail 
    select @Bollore, [SkillCategoryDetailId]from [SkillCategoryDetails] where Label in ('.NET core 2.1', 'Angular 7', 'Karma/Jasmine', 'MSTest', 'HTML5', 'SQL2016', 'Dapper')
    insert into @tmpExperiences_SkillCategoryDetail 
    select @Neopost, [SkillCategoryDetailId]from [SkillCategoryDetails] where Label in ('.NET core 2.1', 'Angular 6', 'Karma/Jasmine', 'nUnit', 'HTML5')
    insert into @tmpExperiences_SkillCategoryDetail 
    select @LynkByNet, [SkillCategoryDetailId]from [SkillCategoryDetails] where Label in ('AngularJS', 'Karma/Jasmine', 'HTML5','Material Design')
    insert into @tmpExperiences_SkillCategoryDetail 
    select @Areas, [SkillCategoryDetailId]from [SkillCategoryDetails] where Label in ('.NET 4.5', 'ASP MVC4', 'EntityFramework', 'AngularJS', 'TypeScript', 'HTML5','Bootstrap 3', 'SQL2012', 'Selenium c#')
    insert into @tmpExperiences_SkillCategoryDetail 
    select @SG, [SkillCategoryDetailId]from [SkillCategoryDetails] where Label in ('.NET 4', 'AngularJS', 'Karma/Jasmine', 'MSTest', 'HTML3', 'SQL2012', 'Selenium Java')
    insert into @tmpExperiences_SkillCategoryDetail 
    select @Logaviv, [SkillCategoryDetailId]from [SkillCategoryDetails] where Label in ('.NET 4', 'EntityFramework', 'nHibernate','SignalR','AngularJS', 'JQuery', 'T.U Karma/Jasmine', 'HTML3', 'HighStock','SQL2012')

Merge into [Experiences_SkillCategoryDetails] exDe using @tmpExperiences_SkillCategoryDetail tmpExDe
on exDe.[ExperienceId] = tmpExDe.[ExperienceId] and exDe.[SkillCategoryDetailId] = tmpExDe.[SkillCategoryDetailId]
when not matched then
insert ([ExperienceId],[SkillCategoryDetailId]) values
(tmpExDe.[ExperienceId],tmpExDe.[SkillCategoryDetailId]);