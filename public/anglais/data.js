/* Contenu pédagogique — Anglais professionnel
   Chaque terme : en, fr, def (définition simple en anglais), ex (exemple contenant le terme), exFr (traduction). */

const DOMAINS = [
  {
    id: "finance", name: "Finance", icon: "📈", color: "#2E7D5B",
    desc: "Marchés, résultats, investissement",
    vocab: [
      { en: "revenue", fr: "chiffre d'affaires", def: "The total income a company earns from its sales.", ex: "Our revenue grew by twelve percent last year.", exFr: "Notre chiffre d'affaires a augmenté de 12 % l'an dernier." },
      { en: "net income", fr: "résultat net", def: "Profit after all expenses and taxes.", ex: "Net income fell despite higher sales.", exFr: "Le résultat net a baissé malgré des ventes plus élevées." },
      { en: "cash flow", fr: "flux de trésorerie", def: "Money moving in and out of a business.", ex: "Positive cash flow keeps the business running.", exFr: "Un flux de trésorerie positif fait tourner l'entreprise." },
      { en: "asset", fr: "actif", def: "Something valuable that a company owns.", ex: "The building is our most valuable asset.", exFr: "Le bâtiment est notre actif le plus précieux." },
      { en: "equity", fr: "capitaux propres", def: "The value that belongs to the owners after debts are paid.", ex: "The company raised new equity from investors.", exFr: "L'entreprise a levé de nouveaux capitaux propres auprès d'investisseurs." },
      { en: "dividend", fr: "dividende", def: "A share of profits paid to shareholders.", ex: "The board approved a higher dividend this year.", exFr: "Le conseil a approuvé un dividende plus élevé cette année." },
      { en: "shareholder", fr: "actionnaire", def: "A person or company that owns shares.", ex: "Every shareholder can vote at the annual meeting.", exFr: "Chaque actionnaire peut voter à l'assemblée annuelle." },
      { en: "bond", fr: "obligation", def: "A loan to a government or company that pays interest.", ex: "Government bonds are considered safe investments.", exFr: "Les obligations d'État sont considérées comme des placements sûrs." },
      { en: "yield", fr: "rendement", def: "The income an investment produces, as a percentage.", ex: "The bond has a yield of four percent.", exFr: "L'obligation a un rendement de 4 %." },
      { en: "interest rate", fr: "taux d'intérêt", def: "The cost of borrowing money, as a percentage.", ex: "The central bank raised the interest rate again.", exFr: "La banque centrale a encore relevé le taux d'intérêt." },
      { en: "portfolio", fr: "portefeuille", def: "A collection of investments held by one person or fund.", ex: "She manages a diversified portfolio of stocks and bonds.", exFr: "Elle gère un portefeuille diversifié d'actions et d'obligations." },
      { en: "hedge", fr: "se couvrir (contre un risque)", def: "To protect yourself against a financial loss.", ex: "We hedge our currency risk with forward contracts.", exFr: "Nous couvrons notre risque de change avec des contrats à terme." },
      { en: "leverage", fr: "effet de levier", def: "Using borrowed money to increase potential returns.", ex: "High leverage increases both gains and losses.", exFr: "Un fort effet de levier augmente les gains comme les pertes." },
      { en: "merger", fr: "fusion", def: "When two companies combine to form one.", ex: "The merger created the largest bank in the region.", exFr: "La fusion a créé la plus grande banque de la région." },
      { en: "takeover", fr: "prise de contrôle / rachat", def: "When one company buys control of another.", ex: "The board rejected the hostile takeover.", exFr: "Le conseil a rejeté la prise de contrôle hostile." },
      { en: "forecast", fr: "prévision", def: "A prediction of future results.", ex: "The forecast shows strong growth next quarter.", exFr: "La prévision montre une forte croissance le trimestre prochain." },
      { en: "volatility", fr: "volatilité", def: "How much and how fast prices go up and down.", ex: "Market volatility increased after the announcement.", exFr: "La volatilité du marché a augmenté après l'annonce." },
      { en: "return on investment", fr: "retour sur investissement", def: "The profit from an investment compared with its cost.", ex: "The project delivered a high return on investment.", exFr: "Le projet a généré un fort retour sur investissement." },
      { en: "bull market", fr: "marché haussier", def: "A period when prices are rising.", ex: "Investors made big profits during the bull market.", exFr: "Les investisseurs ont fait de gros profits pendant le marché haussier." },
      { en: "bear market", fr: "marché baissier", def: "A period when prices are falling.", ex: "Many funds lost money in the bear market.", exFr: "Beaucoup de fonds ont perdu de l'argent pendant le marché baissier." }
    ],
    dialogues: [
      { title: "Présentation des résultats trimestriels", roles: ["CFO", "Analyst"], lines: [
        { s: 0, en: "Good morning everyone. Let's go through our third quarter results.", fr: "Bonjour à tous. Passons en revue nos résultats du troisième trimestre." },
        { s: 1, en: "Thank you. How did revenue perform compared with last year?", fr: "Merci. Comment a évolué le chiffre d'affaires par rapport à l'an dernier ?" },
        { s: 0, en: "Revenue grew by eight percent, mainly thanks to our Asian markets.", fr: "Le chiffre d'affaires a progressé de 8 %, surtout grâce à nos marchés asiatiques." },
        { s: 1, en: "That's impressive. And what about your margins?", fr: "C'est impressionnant. Et vos marges ?" },
        { s: 0, en: "Margins were slightly lower because of higher energy costs.", fr: "Les marges étaient légèrement plus faibles à cause de coûts énergétiques plus élevés." },
        { s: 1, en: "Do you expect that pressure to continue next quarter?", fr: "Pensez-vous que cette pression va continuer au prochain trimestre ?" },
        { s: 0, en: "We expect it to ease. We have hedged most of our energy exposure.", fr: "Nous pensons qu'elle va s'atténuer. Nous avons couvert l'essentiel de notre exposition énergétique." },
        { s: 1, en: "Great. Will you maintain the dividend?", fr: "Très bien. Allez-vous maintenir le dividende ?" },
        { s: 0, en: "Yes, the board has confirmed the dividend for this year.", fr: "Oui, le conseil a confirmé le dividende pour cette année." }
      ]},
      { title: "Conseil en investissement", roles: ["Advisor", "Client"], lines: [
        { s: 1, en: "I'd like to invest some savings, but I don't want too much risk.", fr: "J'aimerais investir une partie de mes économies, mais sans trop de risque." },
        { s: 0, en: "Then a balanced portfolio could suit you, with bonds and some stocks.", fr: "Alors un portefeuille équilibré pourrait vous convenir, avec des obligations et quelques actions." },
        { s: 1, en: "What kind of return can I expect?", fr: "Quel rendement puis-je espérer ?" },
        { s: 0, en: "Historically around four to six percent a year, but it's never guaranteed.", fr: "Historiquement environ 4 à 6 % par an, mais ce n'est jamais garanti." },
        { s: 1, en: "And if the market falls?", fr: "Et si le marché baisse ?" },
        { s: 0, en: "Diversification reduces volatility, and you should invest for the long term.", fr: "La diversification réduit la volatilité, et vous devriez investir sur le long terme." }
      ]}
    ],
    listening: [
      { title: "Flash info marchés", text: "Stock markets ended the week higher after the central bank decided to keep interest rates unchanged. Technology shares led the gains, rising more than three percent. However, oil prices fell sharply as demand forecasts were revised down. Analysts say volatility could return next month, when several large companies publish their quarterly results. Meanwhile, government bond yields remained stable.",
        questions: [
          { q: "What did the central bank do?", o: ["It raised interest rates", "It kept interest rates unchanged", "It cut interest rates"], a: 1 },
          { q: "Which shares led the gains?", o: ["Energy shares", "Bank shares", "Technology shares"], a: 2 },
          { q: "What happened to oil prices?", o: ["They fell sharply", "They rose slightly", "They stayed stable"], a: 0 }
        ]}
    ],
    lesson: { title: "Lire un compte de résultat en anglais", slides: [
      { h: "Le vocabulaire des résultats", en: "When companies report results, they talk about revenue, costs and profit.", fr: "Quand les entreprises publient leurs résultats, elles parlent de chiffre d'affaires, de coûts et de bénéfice." },
      { h: "Revenue ≠ profit", en: "Revenue is the money from sales. Profit is what remains after costs.", fr: "Le chiffre d'affaires vient des ventes. Le bénéfice est ce qui reste après les coûts." },
      { h: "Décrire une hausse", en: "Revenue increased by ten percent. Profits rose sharply.", fr: "Le chiffre d'affaires a augmenté de 10 %. Les bénéfices ont fortement progressé." },
      { h: "Décrire une baisse", en: "Margins decreased slightly. Net income fell to two million dollars.", fr: "Les marges ont légèrement diminué. Le résultat net est tombé à deux millions de dollars." },
      { h: "Astuce", en: "Use by for the change and to for the final figure.", fr: "Utilisez « by » pour la variation et « to » pour le chiffre final." }
    ]},
    videos: ["business english finance vocabulary", "how to read an income statement english", "financial english listening practice"]
  },

  {
    id: "droit", name: "Droit", icon: "⚖️", color: "#6B4FA0",
    desc: "Contrats, tribunaux, conformité",
    vocab: [
      { en: "contract", fr: "contrat", def: "A legal agreement between two or more parties.", ex: "Both parties signed the contract yesterday.", exFr: "Les deux parties ont signé le contrat hier." },
      { en: "clause", fr: "clause", def: "A specific section or condition in a contract.", ex: "This clause limits our liability.", exFr: "Cette clause limite notre responsabilité." },
      { en: "breach of contract", fr: "violation de contrat", def: "Failure to respect the terms of a contract.", ex: "The supplier was sued for breach of contract.", exFr: "Le fournisseur a été poursuivi pour violation de contrat." },
      { en: "liability", fr: "responsabilité (juridique)", def: "Legal responsibility for something, especially damage.", ex: "The company accepted full liability for the accident.", exFr: "L'entreprise a accepté l'entière responsabilité de l'accident." },
      { en: "lawsuit", fr: "procès / action en justice", def: "A case brought to court by one party against another.", ex: "The customers filed a lawsuit against the bank.", exFr: "Les clients ont intenté une action en justice contre la banque." },
      { en: "plaintiff", fr: "demandeur (plaignant)", def: "The person who starts a case in court.", ex: "The plaintiff is asking for compensation.", exFr: "Le demandeur réclame une indemnisation." },
      { en: "defendant", fr: "défendeur / accusé", def: "The person accused or sued in court.", ex: "The defendant denied all the allegations.", exFr: "Le défendeur a nié toutes les allégations." },
      { en: "court", fr: "tribunal", def: "The place where legal cases are decided.", ex: "The case will go to court next month.", exFr: "L'affaire passera au tribunal le mois prochain." },
      { en: "lawyer", fr: "avocat", def: "A professional who gives legal advice and represents clients.", ex: "You should speak to a lawyer before signing.", exFr: "Vous devriez parler à un avocat avant de signer." },
      { en: "evidence", fr: "preuves", def: "Information used to prove something in court.", ex: "There is not enough evidence to convict him.", exFr: "Il n'y a pas assez de preuves pour le condamner." },
      { en: "witness", fr: "témoin", def: "A person who saw an event and tells the court.", ex: "The witness described the scene in detail.", exFr: "Le témoin a décrit la scène en détail." },
      { en: "ruling", fr: "décision (de justice)", def: "An official decision made by a judge or court.", ex: "The ruling was a victory for consumers.", exFr: "La décision a été une victoire pour les consommateurs." },
      { en: "appeal", fr: "faire appel / appel", def: "To ask a higher court to change a decision.", ex: "The company will appeal the decision.", exFr: "L'entreprise va faire appel de la décision." },
      { en: "settlement", fr: "règlement à l'amiable / transaction", def: "An agreement that ends a dispute without a trial.", ex: "The parties reached a settlement out of court.", exFr: "Les parties sont parvenues à un règlement à l'amiable." },
      { en: "damages", fr: "dommages-intérêts", def: "Money paid as compensation for harm or loss.", ex: "The court awarded damages to the victim.", exFr: "Le tribunal a accordé des dommages-intérêts à la victime." },
      { en: "compliance", fr: "conformité", def: "Following laws, rules and regulations.", ex: "Our compliance team checks every new product.", exFr: "Notre équipe conformité vérifie chaque nouveau produit." },
      { en: "intellectual property", fr: "propriété intellectuelle", def: "Legal rights over creations such as inventions and brands.", ex: "We protect our intellectual property with patents.", exFr: "Nous protégeons notre propriété intellectuelle avec des brevets." },
      { en: "non-disclosure agreement", fr: "accord de confidentialité", def: "A contract that forbids sharing secret information.", ex: "Please sign the non-disclosure agreement first.", exFr: "Veuillez d'abord signer l'accord de confidentialité." },
      { en: "jurisdiction", fr: "compétence (juridiction)", def: "The official power of a court to make legal decisions.", ex: "This court has no jurisdiction over the case.", exFr: "Ce tribunal n'est pas compétent pour cette affaire." },
      { en: "terms and conditions", fr: "conditions générales", def: "The rules that apply to an agreement or service.", ex: "Read the terms and conditions carefully.", exFr: "Lisez attentivement les conditions générales." }
    ],
    dialogues: [
      { title: "Revue d'un contrat", roles: ["Lawyer", "Client"], lines: [
        { s: 1, en: "I've received this supply contract. Could you review it for me?", fr: "J'ai reçu ce contrat d'approvisionnement. Pourriez-vous le relire pour moi ?" },
        { s: 0, en: "Of course. The main issue is clause seven on liability.", fr: "Bien sûr. Le principal problème est la clause sept sur la responsabilité." },
        { s: 1, en: "What's wrong with it?", fr: "Qu'est-ce qui ne va pas ?" },
        { s: 0, en: "It makes you liable for all delays, even those caused by the supplier.", fr: "Elle vous rend responsable de tous les retards, même ceux causés par le fournisseur." },
        { s: 1, en: "That's not acceptable. Can we change it?", fr: "Ce n'est pas acceptable. Peut-on la modifier ?" },
        { s: 0, en: "Yes. I'll propose a cap on damages and a force majeure clause.", fr: "Oui. Je vais proposer un plafond de dommages-intérêts et une clause de force majeure." },
        { s: 1, en: "And which jurisdiction applies if there is a dispute?", fr: "Et quelle juridiction s'applique en cas de litige ?" },
        { s: 0, en: "Currently English law. I suggest we add an arbitration clause.", fr: "Actuellement le droit anglais. Je suggère d'ajouter une clause d'arbitrage." }
      ]}
    ],
    listening: [
      { title: "Décision de justice", text: "Yesterday, the High Court issued its ruling in the case between a group of customers and a large telecom company. The plaintiffs claimed that the company had charged hidden fees for several years. The judge found that the terms and conditions were not clear enough and ordered the company to pay damages of five million pounds. The company said it would appeal the decision.",
        questions: [
          { q: "Who were the plaintiffs?", o: ["A group of customers", "The telecom company", "The government"], a: 0 },
          { q: "What was the problem?", o: ["Late deliveries", "Hidden fees", "Bad network coverage"], a: 1 },
          { q: "What will the company do?", o: ["Pay immediately", "Close the business", "Appeal the decision"], a: 2 }
        ]}
    ],
    lesson: { title: "Les modaux du langage juridique", slides: [
      { h: "Shall = obligation", en: "In contracts, shall expresses a legal obligation. The seller shall deliver the goods.", fr: "Dans les contrats, « shall » exprime une obligation. Le vendeur livrera les marchandises (obligation)." },
      { h: "May = permission", en: "May gives a right or a permission. The buyer may terminate the contract.", fr: "« May » donne un droit. L'acheteur peut résilier le contrat." },
      { h: "Shall not = interdiction", en: "Shall not means it is forbidden. The employee shall not disclose confidential information.", fr: "« Shall not » signifie interdit. L'employé ne divulguera pas d'informations confidentielles." },
      { h: "Hereby", en: "Hereby means by this document. The parties hereby agree as follows.", fr: "« Hereby » signifie par la présente. Les parties conviennent par la présente de ce qui suit." },
      { h: "Faux ami", en: "Be careful: a lawyer is an avocat, but an avocado is a fruit!", fr: "Attention : « lawyer » = avocat (juriste), « avocado » = avocat (fruit) !" }
    ]},
    videos: ["legal english vocabulary contracts", "legal english for lawyers lesson", "courtroom english vocabulary"]
  },

  {
    id: "compta", name: "Comptabilité", icon: "🧾", color: "#B5651D",
    desc: "Bilan, factures, audit",
    vocab: [
      { en: "balance sheet", fr: "bilan", def: "A statement showing assets, liabilities and equity at a date.", ex: "The balance sheet shows a strong cash position.", exFr: "Le bilan montre une trésorerie solide." },
      { en: "income statement", fr: "compte de résultat", def: "A report of revenue and expenses over a period.", ex: "The income statement shows a loss this year.", exFr: "Le compte de résultat affiche une perte cette année." },
      { en: "invoice", fr: "facture", def: "A document requesting payment for goods or services.", ex: "Please send the invoice to our finance department.", exFr: "Veuillez envoyer la facture à notre service financier." },
      { en: "accounts payable", fr: "dettes fournisseurs", def: "Money a company owes to its suppliers.", ex: "Accounts payable increased at the end of the year.", exFr: "Les dettes fournisseurs ont augmenté en fin d'année." },
      { en: "accounts receivable", fr: "créances clients", def: "Money customers owe to a company.", ex: "We need to reduce our accounts receivable.", exFr: "Nous devons réduire nos créances clients." },
      { en: "depreciation", fr: "amortissement", def: "The reduction in value of an asset over time.", ex: "Depreciation is recorded every month.", exFr: "L'amortissement est comptabilisé chaque mois." },
      { en: "ledger", fr: "grand livre", def: "The main record of all financial transactions.", ex: "Every transaction is posted to the ledger.", exFr: "Chaque transaction est enregistrée dans le grand livre." },
      { en: "audit", fr: "audit", def: "An official examination of financial records.", ex: "The annual audit starts next week.", exFr: "L'audit annuel commence la semaine prochaine." },
      { en: "auditor", fr: "auditeur / commissaire aux comptes", def: "A person who checks financial records.", ex: "The auditor found no major errors.", exFr: "L'auditeur n'a trouvé aucune erreur majeure." },
      { en: "expense", fr: "charge / dépense", def: "Money spent to run a business.", ex: "Travel is our biggest expense.", exFr: "Les déplacements sont notre plus grosse dépense." },
      { en: "fiscal year", fr: "exercice comptable", def: "The twelve-month period used for accounting.", ex: "Our fiscal year ends in March.", exFr: "Notre exercice comptable se termine en mars." },
      { en: "tax return", fr: "déclaration d'impôts", def: "A form used to report income and calculate tax.", ex: "The tax return must be filed by April.", exFr: "La déclaration d'impôts doit être déposée avant avril." },
      { en: "gross margin", fr: "marge brute", def: "Revenue minus the cost of goods sold, as a percentage.", ex: "Our gross margin improved to forty percent.", exFr: "Notre marge brute s'est améliorée à 40 %." },
      { en: "overhead", fr: "frais généraux", def: "Ongoing business costs such as rent and utilities.", ex: "Moving offices will reduce our overhead.", exFr: "Déménager réduira nos frais généraux." },
      { en: "write-off", fr: "passage en pertes", def: "Removing an asset or debt from the books as worthless.", ex: "The bad debt was treated as a write-off.", exFr: "La créance irrécouvrable a été passée en pertes." },
      { en: "bookkeeping", fr: "tenue de comptabilité", def: "Recording daily financial transactions.", ex: "Good bookkeeping saves time at year end.", exFr: "Une bonne tenue des comptes fait gagner du temps en fin d'année." },
      { en: "inventory", fr: "stocks", def: "Goods a company holds for sale.", ex: "We count the inventory twice a year.", exFr: "Nous comptons les stocks deux fois par an." },
      { en: "accrual", fr: "charge à payer / produit à recevoir", def: "An expense or income recorded before cash is paid or received.", ex: "We booked an accrual for unpaid salaries.", exFr: "Nous avons comptabilisé une charge à payer pour les salaires non versés." }
    ],
    dialogues: [
      { title: "Clôture de fin de mois", roles: ["Controller", "Accountant"], lines: [
        { s: 0, en: "Where are we with the month-end close?", fr: "Où en sommes-nous de la clôture mensuelle ?" },
        { s: 1, en: "Most invoices are booked, but two suppliers are still missing.", fr: "La plupart des factures sont comptabilisées, mais il en manque deux fournisseurs." },
        { s: 0, en: "Can you book an accrual for those expenses?", fr: "Pouvez-vous passer une charge à payer pour ces dépenses ?" },
        { s: 1, en: "Yes, I'll estimate them based on last month.", fr: "Oui, je vais les estimer d'après le mois dernier." },
        { s: 0, en: "Good. And have you reconciled the bank accounts?", fr: "Bien. Et avez-vous rapproché les comptes bancaires ?" },
        { s: 1, en: "Almost. There's a small difference I'm still investigating.", fr: "Presque. Il reste un petit écart que j'analyse encore." },
        { s: 0, en: "Please send me the report by Friday, before the auditors arrive.", fr: "Envoyez-moi le rapport d'ici vendredi, avant l'arrivée des auditeurs." }
      ]}
    ],
    listening: [
      { title: "Message d'un fournisseur", text: "Hello, this is Mark from Delta Supplies. I'm calling about invoice number four five two. According to our records, it was due on the fifteenth of last month, but we haven't received payment yet. Could you please check with your accounts payable team? If the invoice has already been paid, please send us the payment confirmation. Thank you, and have a nice day.",
        questions: [
          { q: "Why is Mark calling?", o: ["To sell new products", "About an unpaid invoice", "To cancel an order"], a: 1 },
          { q: "Which team should check?", o: ["Accounts payable", "Marketing", "Human resources"], a: 0 },
          { q: "What should be sent if it's already paid?", o: ["A new order", "A refund", "A payment confirmation"], a: 2 }
        ]}
    ],
    lesson: { title: "Le bilan en anglais", slides: [
      { h: "Balance sheet", en: "The balance sheet has three parts: assets, liabilities and equity.", fr: "Le bilan a trois parties : actifs, passifs et capitaux propres." },
      { h: "L'équation", en: "Assets equal liabilities plus equity.", fr: "Actif = passif + capitaux propres." },
      { h: "Current vs non-current", en: "Current assets can be turned into cash within one year.", fr: "Les actifs courants peuvent être convertis en trésorerie en moins d'un an." },
      { h: "Payable / receivable", en: "Payable means you owe money. Receivable means someone owes you money.", fr: "« Payable » : vous devez de l'argent. « Receivable » : on vous doit de l'argent." }
    ]},
    videos: ["accounting english vocabulary", "balance sheet explained english", "english for accountants"]
  },

  {
    id: "banque", name: "Banque", icon: "🏦", color: "#1F5FA8",
    desc: "Comptes, crédits, paiements",
    vocab: [
      { en: "current account", fr: "compte courant", def: "A bank account for everyday payments.", ex: "My salary is paid into my current account.", exFr: "Mon salaire est versé sur mon compte courant." },
      { en: "savings account", fr: "compte épargne", def: "An account that pays interest on money you save.", ex: "I put some money into my savings account every month.", exFr: "Je mets de l'argent sur mon compte épargne chaque mois." },
      { en: "loan", fr: "prêt", def: "Money borrowed that must be paid back with interest.", ex: "The bank approved our loan for new equipment.", exFr: "La banque a approuvé notre prêt pour du nouvel équipement." },
      { en: "mortgage", fr: "prêt immobilier", def: "A loan used to buy a property.", ex: "They took out a mortgage to buy their house.", exFr: "Ils ont contracté un prêt immobilier pour acheter leur maison." },
      { en: "overdraft", fr: "découvert", def: "When you spend more money than you have in your account.", ex: "You will pay a fee if you use your overdraft.", exFr: "Vous paierez des frais si vous utilisez votre découvert." },
      { en: "deposit", fr: "dépôt / versement", def: "Money put into a bank account.", ex: "I made a deposit at the branch this morning.", exFr: "J'ai fait un dépôt à l'agence ce matin." },
      { en: "withdrawal", fr: "retrait", def: "Money taken out of an account.", ex: "The daily withdrawal limit is five hundred euros.", exFr: "La limite de retrait quotidienne est de 500 euros." },
      { en: "wire transfer", fr: "virement", def: "An electronic transfer of money between banks.", ex: "We paid the supplier by wire transfer.", exFr: "Nous avons payé le fournisseur par virement." },
      { en: "collateral", fr: "garantie (nantissement)", def: "An asset offered to secure a loan.", ex: "The house serves as collateral for the loan.", exFr: "La maison sert de garantie pour le prêt." },
      { en: "credit score", fr: "score de crédit", def: "A number showing how reliable a borrower is.", ex: "A good credit score helps you get a lower rate.", exFr: "Un bon score de crédit aide à obtenir un taux plus bas." },
      { en: "borrower", fr: "emprunteur", def: "A person or company that borrows money.", ex: "The borrower must repay the loan within five years.", exFr: "L'emprunteur doit rembourser le prêt en cinq ans." },
      { en: "lender", fr: "prêteur", def: "A person or institution that lends money.", ex: "The lender asked for more documents.", exFr: "Le prêteur a demandé plus de documents." },
      { en: "branch", fr: "agence", def: "A local office of a bank.", ex: "The bank closed three branches in the city.", exFr: "La banque a fermé trois agences dans la ville." },
      { en: "fee", fr: "frais", def: "A charge for a service.", ex: "There is no fee for online transfers.", exFr: "Il n'y a pas de frais pour les virements en ligne." },
      { en: "exchange rate", fr: "taux de change", def: "The value of one currency compared with another.", ex: "The exchange rate changes every day.", exFr: "Le taux de change varie chaque jour." },
      { en: "default", fr: "défaut de paiement", def: "Failure to repay a debt.", ex: "The risk of default is low for this client.", exFr: "Le risque de défaut est faible pour ce client." },
      { en: "installment", fr: "mensualité / échéance", def: "One of several regular payments.", ex: "You can pay in twelve monthly installments.", exFr: "Vous pouvez payer en douze mensualités." },
      { en: "bank statement", fr: "relevé bancaire", def: "A document listing all transactions on an account.", ex: "Please attach your last three bank statements.", exFr: "Veuillez joindre vos trois derniers relevés bancaires." }
    ],
    dialogues: [
      { title: "Demande de prêt", roles: ["Banker", "Customer"], lines: [
        { s: 0, en: "Good afternoon. How can I help you today?", fr: "Bonjour. Comment puis-je vous aider aujourd'hui ?" },
        { s: 1, en: "I'd like to apply for a loan to expand my business.", fr: "J'aimerais demander un prêt pour développer mon entreprise." },
        { s: 0, en: "Certainly. How much would you like to borrow?", fr: "Certainement. Combien souhaitez-vous emprunter ?" },
        { s: 1, en: "Around fifty thousand euros, over five years.", fr: "Environ cinquante mille euros, sur cinq ans." },
        { s: 0, en: "Do you have any collateral to secure the loan?", fr: "Avez-vous une garantie pour sécuriser le prêt ?" },
        { s: 1, en: "Yes, I can offer the company's equipment.", fr: "Oui, je peux proposer l'équipement de l'entreprise." },
        { s: 0, en: "Perfect. I'll need your bank statements and your latest financial results.", fr: "Parfait. J'aurai besoin de vos relevés bancaires et de vos derniers résultats financiers." },
        { s: 1, en: "No problem. What interest rate can you offer?", fr: "Pas de problème. Quel taux d'intérêt pouvez-vous proposer ?" },
        { s: 0, en: "It depends on your credit score, but probably around five percent.", fr: "Cela dépend de votre score de crédit, mais probablement autour de 5 %." }
      ]}
    ],
    listening: [
      { title: "Message de la banque", text: "Dear customer, we have noticed an unusual transaction on your current account. A payment of eight hundred dollars was made online yesterday evening. If you did not make this payment, please call our fraud team immediately. For your security, your card has been temporarily blocked. You can still make withdrawals at any branch with your identity card.",
        questions: [
          { q: "Why is the bank contacting the customer?", o: ["A new loan offer", "An unusual transaction", "A change in fees"], a: 1 },
          { q: "What happened to the card?", o: ["It was temporarily blocked", "It was cancelled forever", "It was renewed"], a: 0 },
          { q: "How can the customer still get cash?", o: ["Online only", "From a friend", "At any branch with ID"], a: 2 }
        ]}
    ],
    lesson: { title: "Ouvrir un compte en anglais", slides: [
      { h: "Exprimer son besoin", en: "I would like to open a current account, please.", fr: "J'aimerais ouvrir un compte courant, s'il vous plaît." },
      { h: "Les documents", en: "You will need a proof of identity and a proof of address.", fr: "Vous aurez besoin d'une pièce d'identité et d'un justificatif de domicile." },
      { h: "Poser des questions", en: "Are there any monthly fees? Is there an overdraft facility?", fr: "Y a-t-il des frais mensuels ? Y a-t-il une autorisation de découvert ?" },
      { h: "Withdraw vs deposit", en: "You withdraw money from a cash machine. You deposit money into your account.", fr: "On retire (withdraw) de l'argent au distributeur. On dépose (deposit) de l'argent sur son compte." }
    ]},
    videos: ["banking english vocabulary", "english at the bank conversation", "english for bankers"]
  },

  {
    id: "assurance", name: "Assurance & Actuariat", icon: "🛡️", color: "#C0392B",
    desc: "Primes, sinistres, risques",
    vocab: [
      { en: "premium", fr: "prime", def: "The amount paid regularly for insurance.", ex: "The annual premium increased this year.", exFr: "La prime annuelle a augmenté cette année." },
      { en: "policyholder", fr: "assuré / souscripteur", def: "The person who owns an insurance policy.", ex: "Every policyholder receives a yearly statement.", exFr: "Chaque assuré reçoit un relevé annuel." },
      { en: "claim", fr: "déclaration de sinistre", def: "A formal request for payment after a loss.", ex: "She made a claim after the car accident.", exFr: "Elle a déclaré un sinistre après l'accident de voiture." },
      { en: "coverage", fr: "couverture", def: "What an insurance policy protects you against.", ex: "This policy offers full coverage for fire damage.", exFr: "Cette police offre une couverture complète des dommages d'incendie." },
      { en: "deductible", fr: "franchise", def: "The amount you pay yourself before insurance pays.", ex: "The deductible is two hundred euros per claim.", exFr: "La franchise est de 200 euros par sinistre." },
      { en: "underwriting", fr: "souscription (sélection des risques)", def: "Evaluating a risk and deciding the price of insurance.", ex: "Underwriting rules are stricter for young drivers.", exFr: "Les règles de souscription sont plus strictes pour les jeunes conducteurs." },
      { en: "reinsurance", fr: "réassurance", def: "Insurance bought by insurance companies.", ex: "Reinsurance protects the company against huge losses.", exFr: "La réassurance protège la compagnie contre des pertes énormes." },
      { en: "actuary", fr: "actuaire", def: "An expert who calculates risks and prices using statistics.", ex: "The actuary updated the pricing model.", exFr: "L'actuaire a mis à jour le modèle de tarification." },
      { en: "life expectancy", fr: "espérance de vie", def: "The average number of years a person is expected to live.", ex: "Life expectancy has increased in most countries.", exFr: "L'espérance de vie a augmenté dans la plupart des pays." },
      { en: "mortality table", fr: "table de mortalité", def: "A table showing the probability of death at each age.", ex: "We use a new mortality table for pricing.", exFr: "Nous utilisons une nouvelle table de mortalité pour la tarification." },
      { en: "loss ratio", fr: "ratio sinistres / primes", def: "Claims paid divided by premiums earned.", ex: "A loss ratio above one hundred percent means a loss.", exFr: "Un ratio sinistres/primes au-dessus de 100 % signifie une perte." },
      { en: "reserve", fr: "provision (technique)", def: "Money set aside to pay future claims.", ex: "The company increased its reserve for future claims.", exFr: "La compagnie a augmenté sa provision pour sinistres futurs." },
      { en: "risk assessment", fr: "évaluation des risques", def: "The process of measuring possible losses.", ex: "A risk assessment is required for every new client.", exFr: "Une évaluation des risques est requise pour chaque nouveau client." },
      { en: "beneficiary", fr: "bénéficiaire", def: "The person who receives the insurance payment.", ex: "He named his daughter as the beneficiary.", exFr: "Il a désigné sa fille comme bénéficiaire." },
      { en: "annuity", fr: "rente", def: "A series of regular payments, often for retirement.", ex: "She receives an annuity every month since retiring.", exFr: "Elle reçoit une rente chaque mois depuis sa retraite." },
      { en: "solvency", fr: "solvabilité", def: "The ability to pay all debts and obligations.", ex: "Regulators monitor the solvency of insurers.", exFr: "Les régulateurs surveillent la solvabilité des assureurs." },
      { en: "probability", fr: "probabilité", def: "How likely something is to happen.", ex: "The probability of a flood is very low here.", exFr: "La probabilité d'une inondation est très faible ici." },
      { en: "broker", fr: "courtier", def: "An intermediary who sells insurance from several companies.", ex: "Our broker found us a cheaper policy.", exFr: "Notre courtier nous a trouvé une police moins chère." }
    ],
    dialogues: [
      { title: "Déclarer un sinistre", roles: ["Agent", "Policyholder"], lines: [
        { s: 0, en: "Claims department, how can I help?", fr: "Service sinistres, comment puis-je vous aider ?" },
        { s: 1, en: "Hello, I'd like to make a claim. My kitchen was damaged by water.", fr: "Bonjour, j'aimerais déclarer un sinistre. Ma cuisine a été endommagée par l'eau." },
        { s: 0, en: "I'm sorry to hear that. Can I have your policy number?", fr: "Je suis désolé. Puis-je avoir votre numéro de police ?" },
        { s: 1, en: "Yes, it's H R seven five three two.", fr: "Oui, c'est HR 7532." },
        { s: 0, en: "Thank you. Water damage is included in your coverage.", fr: "Merci. Les dégâts des eaux sont inclus dans votre couverture." },
        { s: 1, en: "Great. Is there a deductible?", fr: "Très bien. Y a-t-il une franchise ?" },
        { s: 0, en: "Yes, one hundred and fifty euros. An expert will visit you this week.", fr: "Oui, cent cinquante euros. Un expert passera chez vous cette semaine." }
      ]},
      { title: "Réunion actuarielle", roles: ["Chief Actuary", "Junior Actuary"], lines: [
        { s: 0, en: "Have you finished the reserve calculation for the motor portfolio?", fr: "Avez-vous terminé le calcul des provisions pour le portefeuille automobile ?" },
        { s: 1, en: "Yes, I used the chain ladder method on the last ten years of data.", fr: "Oui, j'ai utilisé la méthode chain ladder sur les dix dernières années de données." },
        { s: 0, en: "And what is the loss ratio this year?", fr: "Et quel est le ratio sinistres/primes cette année ?" },
        { s: 1, en: "It's about seventy-two percent, slightly higher than last year.", fr: "Environ 72 %, légèrement plus élevé que l'an dernier." },
        { s: 0, en: "We may need to increase premiums for young drivers.", fr: "Nous devrons peut-être augmenter les primes des jeunes conducteurs." }
      ]}
    ],
    listening: [
      { title: "Le rôle de l'actuaire", text: "Actuaries use mathematics and statistics to measure risk. In life insurance, they study mortality tables and life expectancy to price policies and annuities. In general insurance, they estimate how many claims will happen and how much they will cost. They also calculate reserves, so that the company can always pay its policyholders. Today, many actuaries also work with data science and machine learning.",
        questions: [
          { q: "What do actuaries measure?", o: ["Risk", "Sales", "Customer satisfaction"], a: 0 },
          { q: "In life insurance, what do they study?", o: ["Car accidents", "Mortality tables", "Exchange rates"], a: 1 },
          { q: "Why do they calculate reserves?", o: ["To pay taxes", "To pay dividends", "To always pay policyholders"], a: 2 }
        ]}
    ],
    lesson: { title: "Parler de risque en anglais", slides: [
      { h: "Likely / unlikely", en: "A claim is likely when the probability is high, and unlikely when it is low.", fr: "Un sinistre est « likely » (probable) quand la probabilité est élevée, « unlikely » quand elle est faible." },
      { h: "Premium ≠ prime de salaire", en: "In insurance, a premium is the price of the policy. A salary bonus is called a bonus.", fr: "En assurance, « premium » est le prix de la police. Une prime de salaire se dit « bonus »." },
      { h: "Claim", en: "To make a claim means to ask the insurer for payment after a loss.", fr: "« To make a claim » = déclarer un sinistre pour être indemnisé." },
      { h: "Expected value", en: "The expected loss equals the probability times the cost of the claim.", fr: "La perte attendue = la probabilité × le coût du sinistre." }
    ]},
    videos: ["insurance english vocabulary", "what does an actuary do", "english for insurance professionals"]
  },

  {
    id: "business", name: "Business & Management", icon: "💼", color: "#00838F",
    desc: "Stratégie, équipes, projets",
    vocab: [
      { en: "stakeholder", fr: "partie prenante", def: "Anyone affected by or interested in a business.", ex: "We must inform every stakeholder about the change.", exFr: "Nous devons informer chaque partie prenante du changement." },
      { en: "deadline", fr: "date limite", def: "The time by which something must be finished.", ex: "The deadline for the report is Friday.", exFr: "La date limite du rapport est vendredi." },
      { en: "supply chain", fr: "chaîne d'approvisionnement", def: "The network that produces and delivers a product.", ex: "The supply chain was disrupted by the strike.", exFr: "La chaîne d'approvisionnement a été perturbée par la grève." },
      { en: "market share", fr: "part de marché", def: "The percentage of a market that a company controls.", ex: "We increased our market share to twenty percent.", exFr: "Nous avons porté notre part de marché à 20 %." },
      { en: "competitor", fr: "concurrent", def: "A company that sells similar products.", ex: "Our main competitor lowered its prices.", exFr: "Notre principal concurrent a baissé ses prix." },
      { en: "headquarters", fr: "siège social", def: "The main office of a company.", ex: "Our headquarters are in London.", exFr: "Notre siège social est à Londres." },
      { en: "workforce", fr: "effectifs / main-d'œuvre", def: "All the people working for a company.", ex: "Half of our workforce works remotely.", exFr: "La moitié de nos effectifs travaille à distance." },
      { en: "outsource", fr: "externaliser", def: "To pay another company to do some work.", ex: "We decided to outsource our IT support.", exFr: "Nous avons décidé d'externaliser notre support informatique." },
      { en: "key performance indicator", fr: "indicateur clé de performance (KPI)", def: "A measure used to track success.", ex: "Customer retention is our main key performance indicator.", exFr: "La fidélisation client est notre principal indicateur clé de performance." },
      { en: "launch", fr: "lancer / lancement", def: "To introduce a new product to the market.", ex: "We will launch the new app in June.", exFr: "Nous lancerons la nouvelle application en juin." },
      { en: "feedback", fr: "retour / avis", def: "Comments about how well something was done.", ex: "Thank you for your feedback on the project.", exFr: "Merci pour votre retour sur le projet." },
      { en: "growth", fr: "croissance", def: "An increase in size or value.", ex: "The company is focused on sustainable growth.", exFr: "L'entreprise se concentre sur une croissance durable." },
      { en: "benchmark", fr: "référence / point de comparaison", def: "A standard used to compare performance.", ex: "We use our best competitor as a benchmark.", exFr: "Nous utilisons notre meilleur concurrent comme référence." },
      { en: "startup", fr: "start-up / jeune entreprise", def: "A new company, often in technology.", ex: "She founded a fintech startup last year.", exFr: "Elle a fondé une start-up fintech l'an dernier." },
      { en: "strategy", fr: "stratégie", def: "A long-term plan to achieve goals.", ex: "Our strategy is to grow in Africa.", exFr: "Notre stratégie est de croître en Afrique." },
      { en: "team leader", fr: "chef d'équipe", def: "The person who manages a team.", ex: "The team leader assigns tasks every Monday.", exFr: "Le chef d'équipe attribue les tâches chaque lundi." },
      { en: "workload", fr: "charge de travail", def: "The amount of work a person has to do.", ex: "My workload is very heavy this month.", exFr: "Ma charge de travail est très lourde ce mois-ci." },
      { en: "customer", fr: "client", def: "A person or company that buys products or services.", ex: "Every customer receives a satisfaction survey.", exFr: "Chaque client reçoit un questionnaire de satisfaction." }
    ],
    dialogues: [
      { title: "Point projet", roles: ["Manager", "Project lead"], lines: [
        { s: 0, en: "How is the project going? Are we still on track?", fr: "Comment avance le projet ? Sommes-nous toujours dans les temps ?" },
        { s: 1, en: "Mostly yes, but we are a week behind on testing.", fr: "Globalement oui, mais nous avons une semaine de retard sur les tests." },
        { s: 0, en: "What's causing the delay?", fr: "Qu'est-ce qui cause le retard ?" },
        { s: 1, en: "Two developers were sick, and the workload was heavier than expected.", fr: "Deux développeurs étaient malades, et la charge de travail était plus lourde que prévu." },
        { s: 0, en: "Can we still meet the deadline?", fr: "Pouvons-nous encore respecter la date limite ?" },
        { s: 1, en: "If we outsource part of the testing, yes.", fr: "Si nous externalisons une partie des tests, oui." },
        { s: 0, en: "Okay. Send me a cost estimate and I'll discuss it with the stakeholders.", fr: "D'accord. Envoyez-moi une estimation des coûts et j'en discuterai avec les parties prenantes." }
      ]}
    ],
    listening: [
      { title: "Annonce interne", text: "Dear colleagues, I'm pleased to announce that we will launch our new mobile banking app next month. Thanks to your hard work, we finished the project two weeks before the deadline. Customer feedback from the pilot was very positive. Our goal is to increase our market share among young customers by five percent this year. A short training session will take place on Thursday at ten in the main meeting room.",
        questions: [
          { q: "What will be launched?", o: ["A new branch", "A mobile banking app", "A training center"], a: 1 },
          { q: "When was the project finished?", o: ["Two weeks early", "On the deadline", "One month late"], a: 0 },
          { q: "When is the training session?", o: ["Monday at nine", "Friday at two", "Thursday at ten"], a: 2 }
        ]}
    ],
    lesson: { title: "Écrire un email professionnel", slides: [
      { h: "Ouvrir", en: "Dear Mr Smith, I am writing to follow up on our meeting.", fr: "Cher M. Smith, je vous écris pour faire suite à notre réunion." },
      { h: "Joindre un document", en: "Please find attached the report you requested.", fr: "Veuillez trouver ci-joint le rapport demandé." },
      { h: "Demander poliment", en: "Could you please confirm the date by Friday?", fr: "Pourriez-vous confirmer la date d'ici vendredi ?" },
      { h: "Conclure", en: "I look forward to hearing from you. Best regards.", fr: "Dans l'attente de votre réponse. Cordialement." },
      { h: "Erreur fréquente", en: "Say I look forward to hearing, not I look forward to hear.", fr: "On dit « I look forward to hearing » (avec -ing), pas « to hear »." }
    ]},
    videos: ["business english vocabulary management", "how to write a professional email in english", "business english listening"]
  },

  {
    id: "reunions", name: "Réunions & Négociation", icon: "🤝", color: "#8E6C00",
    desc: "Animer, argumenter, conclure",
    vocab: [
      { en: "agenda", fr: "ordre du jour", def: "A list of topics to discuss in a meeting.", ex: "The first item on the agenda is the budget.", exFr: "Le premier point à l'ordre du jour est le budget." },
      { en: "minutes", fr: "compte rendu", def: "The written record of a meeting.", ex: "Could you take the minutes today?", exFr: "Pourriez-vous rédiger le compte rendu aujourd'hui ?" },
      { en: "chair", fr: "présider", def: "To lead a meeting.", ex: "Sarah will chair the meeting this afternoon.", exFr: "Sarah présidera la réunion cet après-midi." },
      { en: "postpone", fr: "reporter", def: "To move an event to a later time.", ex: "We have to postpone the meeting until Monday.", exFr: "Nous devons reporter la réunion à lundi." },
      { en: "proposal", fr: "proposition", def: "A plan or offer suggested for discussion.", ex: "We accept your proposal with one change.", exFr: "Nous acceptons votre proposition avec une modification." },
      { en: "counteroffer", fr: "contre-proposition", def: "A new offer made in response to another offer.", ex: "The buyer made a counteroffer of ten thousand.", exFr: "L'acheteur a fait une contre-proposition de dix mille." },
      { en: "compromise", fr: "compromis", def: "An agreement where each side gives up something.", ex: "After two hours, we reached a compromise.", exFr: "Après deux heures, nous sommes parvenus à un compromis." },
      { en: "deal", fr: "accord / affaire", def: "A business agreement.", ex: "We closed the deal last night.", exFr: "Nous avons conclu l'affaire hier soir." },
      { en: "bargain", fr: "négocier (marchander)", def: "To discuss the price to get a better deal.", ex: "They tried to bargain for a lower price.", exFr: "Ils ont essayé de négocier un prix plus bas." },
      { en: "win-win", fr: "gagnant-gagnant", def: "Good for both sides.", ex: "This agreement is a win-win for both companies.", exFr: "Cet accord est gagnant-gagnant pour les deux entreprises." },
      { en: "follow up", fr: "faire un suivi / relancer", def: "To contact someone again about something.", ex: "I will follow up with an email tomorrow.", exFr: "Je ferai un suivi par email demain." },
      { en: "action item", fr: "action à mener", def: "A task assigned during a meeting.", ex: "Each action item has an owner and a deadline.", exFr: "Chaque action à mener a un responsable et une échéance." },
      { en: "consensus", fr: "consensus", def: "General agreement among a group.", ex: "There is a consensus on the new budget.", exFr: "Il y a un consensus sur le nouveau budget." },
      { en: "wrap up", fr: "conclure / terminer", def: "To finish a meeting or discussion.", ex: "Let's wrap up and summarize the decisions.", exFr: "Concluons et résumons les décisions." },
      { en: "bottom line", fr: "l'essentiel / prix plancher", def: "The most important point, or the lowest acceptable price.", ex: "The bottom line is that we need more time.", exFr: "L'essentiel, c'est que nous avons besoin de plus de temps." },
      { en: "concession", fr: "concession", def: "Something you agree to give up in a negotiation.", ex: "We made a small concession on delivery dates.", exFr: "Nous avons fait une petite concession sur les dates de livraison." },
      { en: "brainstorm", fr: "remue-méninges", def: "To generate many ideas as a group.", ex: "Let's brainstorm some ideas for the campaign.", exFr: "Faisons un remue-méninges pour la campagne." },
      { en: "point of view", fr: "point de vue", def: "A personal opinion.", ex: "I understand your point of view, but I disagree.", exFr: "Je comprends votre point de vue, mais je ne suis pas d'accord." }
    ],
    dialogues: [
      { title: "Négociation d'un prix", roles: ["Supplier", "Buyer"], lines: [
        { s: 0, en: "Our price for one thousand units is twenty euros each.", fr: "Notre prix pour mille unités est de vingt euros pièce." },
        { s: 1, en: "That's higher than we expected. Our budget is closer to sixteen.", fr: "C'est plus que prévu. Notre budget est plutôt de seize." },
        { s: 0, en: "If you order two thousand units, we could offer eighteen.", fr: "Si vous commandez deux mille unités, nous pourrions proposer dix-huit." },
        { s: 1, en: "We could accept eighteen if you include free delivery.", fr: "Nous pourrions accepter dix-huit si vous incluez la livraison gratuite." },
        { s: 0, en: "That's a fair compromise. Let's say eighteen with free delivery.", fr: "C'est un compromis équitable. Disons dix-huit avec livraison gratuite." },
        { s: 1, en: "Great, we have a deal. I'll send you the purchase order today.", fr: "Parfait, marché conclu. Je vous envoie le bon de commande aujourd'hui." }
      ]},
      { title: "Animer une réunion", roles: ["Chair", "Team member"], lines: [
        { s: 0, en: "Let's get started. Has everyone received the agenda?", fr: "Commençons. Tout le monde a-t-il reçu l'ordre du jour ?" },
        { s: 1, en: "Yes, thanks. Can we add an item about the new client?", fr: "Oui, merci. Pouvons-nous ajouter un point sur le nouveau client ?" },
        { s: 0, en: "Sure, we'll discuss it at the end. First, the budget.", fr: "Bien sûr, nous en parlerons à la fin. D'abord, le budget." },
        { s: 1, en: "Sorry to interrupt, but could you clarify the figures on slide three?", fr: "Désolé de vous interrompre, mais pourriez-vous clarifier les chiffres de la diapo trois ?" },
        { s: 0, en: "Of course. These are estimates, not final numbers.", fr: "Bien sûr. Ce sont des estimations, pas des chiffres définitifs." },
        { s: 0, en: "Let's wrap up. The action items will be in the minutes.", fr: "Concluons. Les actions à mener figureront dans le compte rendu." }
      ]}
    ],
    listening: [
      { title: "Message vocal d'un collègue", text: "Hi, it's Tom. Unfortunately, I have to postpone our meeting with the Chinese partners. Their flight was cancelled, so they will arrive on Wednesday instead of Tuesday. Could you update the agenda and send it to everyone? Also, please prepare a counteroffer on the delivery terms. Our bottom line is a ninety-day payment period. Thanks, and call me back if you have any questions.",
        questions: [
          { q: "Why is the meeting postponed?", o: ["Tom is sick", "The partners' flight was cancelled", "The room is not available"], a: 1 },
          { q: "When will the partners arrive?", o: ["Wednesday", "Tuesday", "Friday"], a: 0 },
          { q: "What is the bottom line?", o: ["A lower price", "Free delivery", "A ninety-day payment period"], a: 2 }
        ]}
    ],
    lesson: { title: "Expressions clés en réunion", slides: [
      { h: "Donner son avis", en: "In my opinion, we should focus on quality.", fr: "À mon avis, nous devrions nous concentrer sur la qualité." },
      { h: "Être d'accord", en: "I completely agree with you. That's a good point.", fr: "Je suis tout à fait d'accord avec vous. C'est un bon argument." },
      { h: "Ne pas être d'accord poliment", en: "I see your point, but I'm not sure that will work.", fr: "Je comprends, mais je ne suis pas sûr que ça fonctionne." },
      { h: "Interrompre", en: "Sorry to interrupt, but may I add something?", fr: "Désolé de vous interrompre, mais puis-je ajouter quelque chose ?" },
      { h: "Proposer avec une condition", en: "If you lower the price, we will order more.", fr: "Si vous baissez le prix, nous commanderons davantage." }
    ]},
    videos: ["english for meetings phrases", "negotiation english phrases", "business english negotiation role play"]
  },

  {
    id: "carriere", name: "Carrière & Entretien", icon: "🎯", color: "#AD1457",
    desc: "CV, entretien, vie au bureau",
    vocab: [
      { en: "resume", fr: "CV", def: "A document listing your education and experience.", ex: "Please send your resume and a cover letter.", exFr: "Veuillez envoyer votre CV et une lettre de motivation." },
      { en: "cover letter", fr: "lettre de motivation", def: "A letter explaining why you want a job.", ex: "Your cover letter should be one page long.", exFr: "Votre lettre de motivation doit faire une page." },
      { en: "job interview", fr: "entretien d'embauche", def: "A meeting to decide if you get a job.", ex: "I have a job interview at a bank tomorrow.", exFr: "J'ai un entretien d'embauche dans une banque demain." },
      { en: "apply for", fr: "postuler à", def: "To formally ask for a job.", ex: "I would like to apply for the analyst position.", exFr: "J'aimerais postuler au poste d'analyste." },
      { en: "skills", fr: "compétences", def: "Abilities you have learned.", ex: "Strong communication skills are essential.", exFr: "De solides compétences en communication sont essentielles." },
      { en: "strength", fr: "point fort", def: "Something you are good at.", ex: "My main strength is problem solving.", exFr: "Mon principal point fort est la résolution de problèmes." },
      { en: "weakness", fr: "point faible", def: "Something you need to improve.", ex: "My weakness is that I can be too detail-oriented.", exFr: "Mon point faible est que je peux être trop perfectionniste." },
      { en: "salary", fr: "salaire", def: "Fixed regular payment for work.", ex: "The salary depends on your experience.", exFr: "Le salaire dépend de votre expérience." },
      { en: "benefits", fr: "avantages sociaux", def: "Extras like health insurance or a pension.", ex: "The benefits include health insurance and a car.", exFr: "Les avantages incluent une assurance santé et une voiture." },
      { en: "internship", fr: "stage", def: "A temporary job to gain experience.", ex: "I did a six-month internship in an audit firm.", exFr: "J'ai fait un stage de six mois dans un cabinet d'audit." },
      { en: "hiring manager", fr: "responsable du recrutement", def: "The person who decides who to hire.", ex: "The hiring manager will call you next week.", exFr: "Le responsable du recrutement vous appellera la semaine prochaine." },
      { en: "promotion", fr: "promotion", def: "A move to a higher position.", ex: "She got a promotion after two years.", exFr: "Elle a obtenu une promotion après deux ans." },
      { en: "colleague", fr: "collègue", def: "A person you work with.", ex: "My colleague helped me with the report.", exFr: "Mon collègue m'a aidé avec le rapport." },
      { en: "full-time", fr: "à temps plein", def: "Working the normal number of hours each week.", ex: "This is a full-time position based in Paris.", exFr: "C'est un poste à temps plein basé à Paris." },
      { en: "notice period", fr: "préavis", def: "The time between resigning and leaving a job.", ex: "My notice period is three months.", exFr: "Mon préavis est de trois mois." },
      { en: "resign", fr: "démissionner", def: "To officially leave your job.", ex: "He decided to resign and start his own company.", exFr: "Il a décidé de démissionner et de créer sa propre entreprise." },
      { en: "teamwork", fr: "travail d'équipe", def: "Working well together with others.", ex: "Teamwork is very important in our department.", exFr: "Le travail d'équipe est très important dans notre service." },
      { en: "background", fr: "parcours / formation", def: "Your education and past experience.", ex: "I have a background in mathematics and finance.", exFr: "J'ai un parcours en mathématiques et finance." }
    ],
    dialogues: [
      { title: "Entretien d'embauche — analyste", roles: ["Interviewer", "Candidate"], lines: [
        { s: 0, en: "Thank you for coming. Could you tell me about yourself?", fr: "Merci d'être venu. Pouvez-vous vous présenter ?" },
        { s: 1, en: "Of course. I have a background in actuarial science and two years of experience in insurance.", fr: "Bien sûr. J'ai une formation en actuariat et deux ans d'expérience dans l'assurance." },
        { s: 0, en: "Why do you want to work for our company?", fr: "Pourquoi voulez-vous travailler pour notre entreprise ?" },
        { s: 1, en: "I admire your innovation in data analytics, and I'd like to grow in an international team.", fr: "J'admire votre innovation en analyse de données, et j'aimerais évoluer dans une équipe internationale." },
        { s: 0, en: "What would you say is your greatest strength?", fr: "Quel est selon vous votre plus grand point fort ?" },
        { s: 1, en: "I'm very analytical, and I can explain complex results in simple words.", fr: "Je suis très analytique, et je sais expliquer des résultats complexes simplement." },
        { s: 0, en: "And a weakness?", fr: "Et un point faible ?" },
        { s: 1, en: "I sometimes take on too much work, so I'm learning to delegate.", fr: "J'accepte parfois trop de travail, alors j'apprends à déléguer." },
        { s: 0, en: "Do you have any questions for us?", fr: "Avez-vous des questions pour nous ?" },
        { s: 1, en: "Yes. What does a typical day look like in this role?", fr: "Oui. À quoi ressemble une journée type à ce poste ?" }
      ]}
    ],
    listening: [
      { title: "Offre d'emploi", text: "We are looking for a junior financial analyst to join our team in Abidjan. This is a full-time position. The ideal candidate has a degree in finance or economics, strong Excel skills, and good English. Previous internship experience is a plus. We offer a competitive salary, health insurance and training opportunities. To apply for this job, please send your resume and cover letter before the end of the month.",
        questions: [
          { q: "Where is the job?", o: ["In London", "In Abidjan", "In Paris"], a: 1 },
          { q: "Which skill is required?", o: ["Strong Excel skills", "Driving a truck", "Speaking Chinese"], a: 0 },
          { q: "What is a plus?", o: ["A car", "Ten years of experience", "Internship experience"], a: 2 }
        ]}
    ],
    lesson: { title: "Réussir son entretien en anglais", slides: [
      { h: "Se présenter", en: "I'm a finance graduate with experience in data analysis.", fr: "Je suis diplômé en finance avec une expérience en analyse de données." },
      { h: "Parler de son expérience", en: "I have worked as an analyst for two years.", fr: "Je travaille comme analyste depuis deux ans." },
      { h: "Donner un exemple", en: "For example, I reduced reporting time by thirty percent.", fr: "Par exemple, j'ai réduit le temps de reporting de 30 %." },
      { h: "Poser une question", en: "What are the next steps in the recruitment process?", fr: "Quelles sont les prochaines étapes du processus de recrutement ?" },
      { h: "Remercier", en: "Thank you for your time. I look forward to hearing from you.", fr: "Merci pour votre temps. Dans l'attente de votre retour." }
    ]},
    videos: ["job interview in english questions and answers", "tell me about yourself english interview", "english for the workplace"]
  }
];

/* Grammaire professionnelle */
const GRAMMAR = [
  { id: "g1", title: "Present perfect vs past simple", tag: "Rapports & résultats",
    rule: "Past simple : action terminée à un moment précis (yesterday, in 2023, last year). Present perfect (have + participe) : résultat présent ou période non terminée (this year, since, already, yet).",
    examples: [ ["We signed the contract last week.", "Nous avons signé le contrat la semaine dernière."], ["We have signed three contracts this year.", "Nous avons signé trois contrats cette année."], ["Have you sent the report yet?", "As-tu déjà envoyé le rapport ?"] ],
    items: [
      { s: "Revenue ___ by ten percent in 2023.", o: ["increased", "has increased"], a: 0 },
      { s: "Since January, we ___ five new clients.", o: ["won", "have won"], a: 1 },
      { s: "I ___ the CFO yesterday morning.", o: ["met", "have met"], a: 0 },
      { s: "The auditors ___ not finished yet.", o: ["did", "have"], a: 1 }
    ]},
  { id: "g2", title: "Décrire une évolution (by / to / from)", tag: "Graphiques & chiffres",
    rule: "« by » = l'ampleur de la variation ; « to » = la valeur finale ; « from … to » = de … à. Adverbes : sharply (fortement), slightly (légèrement), steadily (régulièrement).",
    examples: [ ["Sales rose by 5%.", "Les ventes ont augmenté de 5 %."], ["Sales rose to 2 million.", "Les ventes ont atteint 2 millions."], ["Costs fell sharply from 10 to 6 million.", "Les coûts ont fortement chuté de 10 à 6 millions."] ],
    items: [
      { s: "Profits increased ___ 15%, from 2 million to 2.3 million.", o: ["by", "to"], a: 0 },
      { s: "Unemployment fell ___ 6% last month.", o: ["to", "at"], a: 0 },
      { s: "The share price rose ___, by only 0.2%.", o: ["sharply", "slightly"], a: 1 },
      { s: "Prices went up ___ 100 ___ 120 dollars.", o: ["from … to", "by … at"], a: 0 }
    ]},
  { id: "g3", title: "Les modaux juridiques : shall, may, must", tag: "Contrats",
    rule: "« shall » = obligation contractuelle ; « shall not » = interdiction ; « may » = droit/faculté ; « must » = obligation forte (langage courant et réglementaire).",
    examples: [ ["The tenant shall pay the rent monthly.", "Le locataire paiera le loyer mensuellement."], ["Either party may terminate this agreement.", "Chaque partie peut résilier cet accord."], ["The employee shall not disclose confidential data.", "L'employé ne divulguera pas de données confidentielles."] ],
    items: [
      { s: "The supplier ___ deliver the goods within 30 days. (obligation)", o: ["shall", "may"], a: 0 },
      { s: "The buyer ___ cancel the order before shipment. (droit)", o: ["shall", "may"], a: 1 },
      { s: "The parties ___ disclose the terms of this agreement. (interdit)", o: ["shall not", "may not have"], a: 0 }
    ]},
  { id: "g4", title: "Les conditionnels en négociation", tag: "Négociation",
    rule: "1er conditionnel (If + présent, will) : offre réelle. 2e conditionnel (If + prétérit, would) : hypothèse, plus diplomatique.",
    examples: [ ["If you order today, we will deliver on Monday.", "Si vous commandez aujourd'hui, nous livrerons lundi."], ["If you increased the volume, we would lower the price.", "Si vous augmentiez le volume, nous baisserions le prix."] ],
    items: [
      { s: "If you sign today, we ___ give you a 5% discount.", o: ["will", "would"], a: 0 },
      { s: "If we ___ more budget, we would hire two analysts.", o: ["have", "had"], a: 1 },
      { s: "We ___ accept if you paid within 30 days.", o: ["will", "would"], a: 1 }
    ]},
  { id: "g5", title: "La voix passive dans les rapports", tag: "Rapports",
    rule: "Be + participe passé. Utile quand l'action compte plus que l'auteur : « The accounts were audited. » On ajoute « by » pour l'auteur si nécessaire.",
    examples: [ ["The report was approved by the board.", "Le rapport a été approuvé par le conseil."], ["New rules have been introduced.", "De nouvelles règles ont été introduites."] ],
    items: [
      { s: "The invoice ___ paid last Monday.", o: ["was", "is being"], a: 0 },
      { s: "All claims ___ reviewed by an expert.", o: ["are", "do"], a: 0 },
      { s: "The new policy has ___ approved.", o: ["been", "being"], a: 0 }
    ]},
  { id: "g6", title: "Demandes polies", tag: "Emails & téléphone",
    rule: "Pour être poli : Could you…? / Would you mind + -ing? / I was wondering if… / I would appreciate it if…",
    examples: [ ["Could you send me the file, please?", "Pourriez-vous m'envoyer le fichier ?"], ["Would you mind sending it again?", "Cela vous dérangerait-il de le renvoyer ?"] ],
    items: [
      { s: "Would you mind ___ the meeting to Friday?", o: ["moving", "to move"], a: 0 },
      { s: "___ you please confirm receipt?", o: ["Could", "Should"], a: 0 },
      { s: "I look forward to ___ from you.", o: ["hear", "hearing"], a: 1 }
    ]},
  { id: "g7", title: "Les faux amis du bureau", tag: "Pièges",
    rule: "Actually = en fait (pas « actuellement » = currently). Eventually = finalement. To attend = assister à. Sensible = raisonnable. Library = bibliothèque. Resume = CV / reprendre. Formation = training. Assist = aider.",
    examples: [ ["Actually, the meeting is tomorrow.", "En fait, la réunion est demain."], ["I attended a training session.", "J'ai assisté à une formation."], ["Currently, I work in a bank.", "Actuellement, je travaille dans une banque."] ],
    items: [
      { s: "« Actuellement, je suis analyste » → ___, I am an analyst.", o: ["Actually", "Currently"], a: 1 },
      { s: "« J'ai assisté à la conférence » → I ___ the conference.", o: ["attended", "assisted"], a: 0 },
      { s: "« Une formation en Excel » → An Excel ___.", o: ["formation", "training"], a: 1 },
      { s: "« Une décision raisonnable » → A ___ decision.", o: ["sensible", "sensitive"], a: 0 }
    ]}
];

/* Banque de phrases à répéter (shadowing) */
const PHRASES = [
  { cat: "📧 Emails", items: [
    ["I am writing to follow up on our call.", "Je vous écris pour faire suite à notre appel."],
    ["Please find attached the signed contract.", "Veuillez trouver ci-joint le contrat signé."],
    ["Could you please confirm receipt of this email?", "Pourriez-vous accuser réception de cet email ?"],
    ["I apologize for the delay in my reply.", "Je vous prie d'excuser le retard de ma réponse."],
    ["I look forward to hearing from you.", "Dans l'attente de votre réponse."]
  ]},
  { cat: "📞 Téléphone", items: [
    ["Could I speak to the finance director, please?", "Pourrais-je parler au directeur financier ?"],
    ["Sorry, could you repeat that more slowly?", "Désolé, pourriez-vous répéter plus lentement ?"],
    ["I'm calling about the invoice you sent last week.", "J'appelle au sujet de la facture envoyée la semaine dernière."],
    ["Can I take a message?", "Puis-je prendre un message ?"],
    ["I'll get back to you by the end of the day.", "Je vous recontacte d'ici la fin de la journée."]
  ]},
  { cat: "📊 Présentations", items: [
    ["Today, I'm going to talk about our annual results.", "Aujourd'hui, je vais parler de nos résultats annuels."],
    ["As you can see on this chart, sales rose sharply.", "Comme vous le voyez sur ce graphique, les ventes ont fortement augmenté."],
    ["Let me move on to the next point.", "Passons au point suivant."],
    ["To sum up, we exceeded our targets.", "Pour résumer, nous avons dépassé nos objectifs."],
    ["Thank you for your attention. Any questions?", "Merci de votre attention. Des questions ?"]
  ]},
  { cat: "🤝 Réunions", items: [
    ["Let's get down to business.", "Entrons dans le vif du sujet."],
    ["I see your point, but I have a different view.", "Je comprends, mais j'ai un avis différent."],
    ["Could you clarify what you mean?", "Pourriez-vous préciser ce que vous voulez dire ?"],
    ["We are running out of time.", "Nous manquons de temps."],
    ["Let's schedule a follow-up meeting.", "Planifions une réunion de suivi."]
  ]},
  { cat: "🗣️ Sons difficiles (th, r, h)", items: [
    ["Thirty-three thousand thirty-three.", "Trente-trois mille trente-trois (son th)."],
    ["The third quarter was better than the others.", "Le troisième trimestre était meilleur que les autres."],
    ["Revenue rose rapidly in the rural region.", "Le chiffre d'affaires a augmenté rapidement dans la région rurale (son r)."],
    ["Hedge funds hold high-risk assets.", "Les hedge funds détiennent des actifs à haut risque (son h aspiré)."],
    ["Whether the weather is warm or not, we work.", "Qu'il fasse chaud ou non, nous travaillons."]
  ]}
];
