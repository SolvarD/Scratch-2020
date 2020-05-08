import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-porte-folio',
  templateUrl: './porte-folio.component.html',
  styleUrls: ['./porte-folio.component.less']
})
export class PorteFolioComponent implements OnInit {


  currentSlide: number = 0;

  slides: Array<any> = [];

  ngOnInit(): void {
    this.slides = [{
      title: 'GlobalDevApp',
      from:'01/04/2020',
      to: '--',
      context: `Ayant Quitté Extia après tant d'années de cocooning, j'ai décidé de créer GlobalDevApp pour développer des applications à la demande et/ou faire du freelance
              (l'avenir me montrera la voie).`,
      stack: ['.NET core 3.0', 'Angular 8', 'T.U Karma/Jasmine', 'MSTest', 'Html/css/flex', 'Azure SQL']
    }, {
        title: 'ESN EXTIA --> Bolloré',
        from: '15/05/2019',
        to: '31/03/2020',
        context: `Sharp est une application qui doit succéder à Opale vieille de 10 ans.<br/>
                Elle sert à gérer les stocks de pétrole (achat/ vente / livraison), Achat / vente de devise,<br/>
                diffuser des prix aux agences ainsi que leurs volumétries vendus.<br/>
                <br/>
                Dans le cadre du remplacement de l’application Opale pour la pemière mise en prod, j’ai mis en place des Flux entrée / sortie en Json vers les services externes,
                développer des fonctionnalités (angular + c#), corriger des bugs et refactoring, mis en place les Test Unitaire front.<br/>
                J’ai par ailleurs traité le sujet d’import de l’historique de l’ancienne application par script sql (développement de soft de génération de script / exécution)
                à partir de fichiers texte.<br/>
`,
      stack: ['.NET core 2.1', 'Angular 7', 'T.U Karma/Jasmine', 'MSTest', 'Html/css/flex', 'SQL2016']
    }, {
        title: 'ESN EXTIA --> Neopost (Quadient)',
        from: '01/07/2018',
        to: '30/04/2019',
        context: `Suite a un appel d’offre Neopost a dut se lancer dans le développement d’une nouvelle version de son application Neostats Busness View 
                qui a essentiellement une fonction de reporting pour les entreprises concernant leurs machines à affranchir, pour les coûts selon les années,
                l’optimisation des coûts entre différents produits postaux et fréquence d’utilisation des machines, elle permet aussi l’exportation de ces rapports sous différents formats (PDF, CSV, xlsx).<br/>
                Cette application est développée en Angular 6 pour le front-end et en .NET core pour le back-end.`,
        stack: ['.NET core 2.1', 'Angular 6', 'T.U Karma/Jasmine', 'nUnit', 'Html/css/flex']
    }, {
        title: 'ESN EXTIA --> LynkByNet',
        from: '15/05/2017',
        to: '30/06/2018',
        context: `SelfDeploy est un orchestrateur multi-cloud qui permet via une interface très simplifiée de déployer une à plusieurs machines virtuelles tout en gérant les Loads Balancer,
                les domaines, les Security Group et tout ce qui compose une infrastructure réseau classique sur Amazone, azure, OVH et d’autres providers.<br/>
                Le projet est une solution en Angular 1.5 en front-end et en ruby rails pour le back-end.<br/>
                Je travaille à la résolution de bugs, développer de nouvelles fonctionnalités, écrire des tests optimisés et factoriser le code legacy pour aboutir à une version 1.0 durant 2018,
                mise en production.<br/>
                Préparation de mise en production, correction d’anomalies sur la solution et refactoring de code existant.`,
        stack: ['AngularJS 1.5', 'T.U Karma/Jasmine', 'Html/css/Material Design']
    }, {
        title: 'ESN EXTIA --> Areas Assurances',
        from: '01/03/2016',
        to: '01/05/2017',
        context: `Efficience est une application CRM interne d’Areas permettant aux agents de gérer leurs activités (RDV, Calendrier, Formations, Historique des échanges clients, Devis, Souscriptions, …)<br/>
                Le projet et une solution web encapsulé dans un hôte WPF qui est essentiellement développé en AngularJS/ TypeScript pour la partie Front-End avec une API REST C# pour le Back-End.<br/>
                Développement de nouveaux modules sur la solution (Efficience), préparation de mise en production, correction des anomalies et refactoring du code existant.`,
        stack: ['.NET 4.5', 'ASP MVC4', 'EntityFramework', 'AngularJS/TypeScript', 'Html/css/bootstrap 3', 'SQL2012', 'Selenium c#']
    }, {
        title: 'ESN EXTIA --> Société générale',
        from: '01/08/2015',
        to: '01/02/2016',
        context: `CTY et SGMarket sont des plateformes de trading permettant l'achat, la vente de commodities et métaux sur les marchés européens. <br/>
                La version Angular est développée pour remplacer la version développée en Silverlight.  <br/>
                Préparation de mise en production, correction d’anomalies sur la solution et refactoring de code existant.`,
        stack: ['.NET 4', 'AngularJS', 'T.U Karma/Jasmine', 'MSTest', 'Html/css/flex', 'SQL2012', 'Selenium Java']
      }, {
        title: 'Logaviv',
        from: '01/09/2011',
        to: '31/07/2015',
        context: `S'agissant d'une entreprise où j'ai travaillé 4 ans sur plusieurs projets <br/><br/>

              I/ WSD est un progiciel permettant l'accès aux informations de marché en temps réel 
              sur le cours des matières premières et des produits dérivés (Blé, Colza, Maïs, Orge, Cacao, Café, Sucre, Pétrole et Gaz, etc...)<br/>
              Projet de portage de la version Client lourd sur le Web.<br/><br/>

              II/ WSD Mobile (application AngularJS encapsulée via phoneGap) R&D, AngularJS était tout beau tout neuf, et developpement du projet AngularJS.<br/><br/>

              III/ Finterra est une solution web de gestion de positions proposée par les organismes stockeurs à destination de leurs agriculteurs. <br/><br/>
              IV/ Agrimarket est une plateforme web de e-commerce qui permet la contractualisation entre un opérateur et ses clients/fournisseurs (ex. : entre un OS et ses agriculteurs)`,
        stack: ['.NET 4', 'EntityFramework', 'nHibernate','SignalR','AngularJS', 'JQuery', 'T.U Karma/Jasmine', 'Html/Bootstrap', 'HighStock','SQL2012']
      }]
  }

  nextSlide() {
    if (this.currentSlide == (this.slides.length - 1)) {
      this.currentSlide = 0;
    } else {
      this.currentSlide += 1;
    }
  }

  previewSlide() {
    if (this.currentSlide == 0) {
      this.currentSlide = this.slides.length - 1;
    }
    else {
      this.currentSlide -= 1;
    }
  }
  goTo(index: number) {
    this.currentSlide = index;
  }
}
