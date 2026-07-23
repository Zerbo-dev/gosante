#!/usr/bin/env python3
"""Génère la documentation PDF GoSanté pour porteurs de projet (non tech)."""

from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import Color, HexColor, white, black
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
    ListFlowable,
    ListItem,
    HRFlowable,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Serif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Serif-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))

TEAL = HexColor("#0f766e")
TEAL_DARK = HexColor("#115e59")
TEAL_LIGHT = HexColor("#ccfbf1")
SLATE = HexColor("#0f172a")
SLATE_MUTED = HexColor("#475569")
SLATE_SOFT = HexColor("#f1f5f9")
AMBER = HexColor("#c2410c")
WHITE = white

OUT = Path(__file__).resolve().parents[1] / "docs" / "GoSante_Documentation_Porteurs.pdf"


def styles():
    s = getSampleStyleSheet()
    s.add(
        ParagraphStyle(
            name="CoverTitle",
            fontName="DejaVu-Serif-Bold",
            fontSize=28,
            leading=34,
            textColor=WHITE,
            alignment=TA_CENTER,
            spaceAfter=12,
        )
    )
    s.add(
        ParagraphStyle(
            name="CoverSub",
            fontName="DejaVu",
            fontSize=13,
            leading=18,
            textColor=HexColor("#99f6e4"),
            alignment=TA_CENTER,
            spaceAfter=8,
        )
    )
    s.add(
        ParagraphStyle(
            name="H1",
            fontName="DejaVu-Serif-Bold",
            fontSize=18,
            leading=22,
            textColor=TEAL_DARK,
            spaceBefore=18,
            spaceAfter=10,
        )
    )
    s.add(
        ParagraphStyle(
            name="H2",
            fontName="DejaVu-Bold",
            fontSize=13,
            leading=17,
            textColor=TEAL,
            spaceBefore=14,
            spaceAfter=6,
        )
    )
    s.add(
        ParagraphStyle(
            name="Body",
            fontName="DejaVu",
            fontSize=10,
            leading=14,
            textColor=SLATE,
            alignment=TA_JUSTIFY,
            spaceAfter=8,
        )
    )
    s.add(
        ParagraphStyle(
            name="BulletText",
            fontName="DejaVu",
            fontSize=10,
            leading=14,
            textColor=SLATE,
            leftIndent=8,
            spaceAfter=3,
        )
    )
    s.add(
        ParagraphStyle(
            name="Caption",
            fontName="DejaVu",
            fontSize=8.5,
            leading=11,
            textColor=SLATE_MUTED,
            alignment=TA_CENTER,
        )
    )
    s.add(
        ParagraphStyle(
            name="Footer",
            fontName="DejaVu",
            fontSize=8,
            textColor=SLATE_MUTED,
        )
    )
    s.add(
        ParagraphStyle(
            name="TableCell",
            fontName="DejaVu",
            fontSize=8.5,
            leading=11,
            textColor=SLATE,
        )
    )
    s.add(
        ParagraphStyle(
            name="TableHead",
            fontName="DejaVu-Bold",
            fontSize=8.5,
            leading=11,
            textColor=WHITE,
        )
    )
    s.add(
        ParagraphStyle(
            name="Callout",
            fontName="DejaVu",
            fontSize=10,
            leading=14,
            textColor=TEAL_DARK,
            alignment=TA_LEFT,
        )
    )
    return s


def bullets(items, sty):
    return [
        Paragraph(f"• {item}", sty["BulletText"]) for item in items
    ]


def section_title(text, sty):
    return KeepTogether(
        [
            Paragraph(text, sty["H1"]),
            HRFlowable(width="100%", thickness=1.2, color=TEAL, spaceAfter=8),
        ]
    )


def make_table(headers, rows, sty, col_widths=None):
    head = [Paragraph(h, sty["TableHead"]) for h in headers]
    body = [[Paragraph(str(c), sty["TableCell"]) for c in row] for row in rows]
    data = [head] + body
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), TEAL),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("BACKGROUND", (0, 1), (-1, -1), WHITE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, SLATE_SOFT]),
                ("GRID", (0, 0), (-1, -1), 0.4, HexColor("#cbd5e1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def add_page_number(canvas, doc):
    canvas.saveState()
    page = canvas.getPageNumber()
    if page > 1:
        canvas.setFillColor(SLATE_MUTED)
        canvas.setFont("DejaVu", 8)
        canvas.drawString(2 * cm, 1.2 * cm, "GoSanté — Documentation porteurs de projet")
        canvas.drawRightString(A4[0] - 2 * cm, 1.2 * cm, f"{page}")
        canvas.setStrokeColor(TEAL_LIGHT)
        canvas.setLineWidth(0.6)
        canvas.line(2 * cm, 1.6 * cm, A4[0] - 2 * cm, 1.6 * cm)
    canvas.restoreState()


def cover_page(story, sty):
    # Cover is drawn via onFirstPage
    story.append(Spacer(1, 11 * cm))
    story.append(Paragraph("GoSanté", sty["CoverTitle"]))
    story.append(
        Paragraph(
            "Documentation complète pour les porteurs de projet",
            sty["CoverSub"],
        )
    )
    story.append(
        Paragraph(
            "Fonctionnalités · Expérience utilisateur · Organisation · Technique vulgarisée",
            sty["CoverSub"],
        )
    )
    story.append(Spacer(1, 1.2 * cm))
    story.append(
        Paragraph(
            "Document destiné aux décideurs et partenaires non techniques<br/>Burkina Faso · Juillet 2026",
            ParagraphStyle(
                "CoverMeta",
                fontName="DejaVu",
                fontSize=10,
                leading=14,
                textColor=HexColor("#ccfbf1"),
                alignment=TA_CENTER,
            ),
        )
    )
    story.append(PageBreak())


def draw_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(TEAL_DARK)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    # decorative band
    canvas.setFillColor(TEAL)
    canvas.rect(0, A4[1] * 0.38, A4[0], A4[1] * 0.22, fill=1, stroke=0)
    canvas.setFillColor(HexColor("#14b8a6"))
    canvas.rect(0, A4[1] * 0.38, 0.6 * cm, A4[1] * 0.22, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("DejaVu", 9)
    canvas.drawCentredString(A4[0] / 2, 2.2 * cm, "https://gosantetest.vercel.app")
    canvas.restoreState()
    add_page_number(canvas, doc)


def build():
    sty = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2.2 * cm,
        title="GoSanté — Documentation porteurs de projet",
        author="GoSanté",
    )
    story = []
    cover_page(story, sty)

    # Sommaire
    story.append(section_title("Sommaire", sty))
    for i, t in enumerate(
        [
            "1. En résumé — qu’est-ce que GoSanté ?",
            "2. Le contexte et la vision",
            "3. À qui s’adresse la plateforme ?",
            "4. Les fonctionnalités, module par module",
            "5. L’expérience utilisateur (UX)",
            "6. Comment ça fonctionne, en langage simple",
            "7. Sécurité, données et confiance",
            "8. Où en est le projet aujourd’hui ?",
            "9. Prochaines étapes recommandées",
            "10. Accès démo et contacts utiles",
        ],
        1,
    ):
        story.append(Paragraph(t, sty["Body"]))
    story.append(PageBreak())

    # 1
    story.append(section_title("1. En résumé — qu’est-ce que GoSanté ?", sty))
    story.append(
        Paragraph(
            "<b>GoSanté</b> est une plateforme numérique de santé conçue pour le "
            "<b>Burkina Faso</b>. Elle aide les citoyens à trouver des médicaments, "
            "commander en pharmacie avec livraison, gérer un carnet médical, "
            "bénéficier d’un soutien en santé mentale, et consulter un psychologue "
            "en visioconférence.",
            sty["Body"],
        )
    )
    story.append(
        Paragraph(
            "Ce n’est pas un simple site vitrine : c’est une <b>application web</b> "
            "utilisable sur téléphone (comme une application) et sur ordinateur, "
            "avec des espaces dédiés pour les patients, les pharmacies, les livreurs, "
            "les psychologues et les administrateurs.",
            sty["Body"],
        )
    )
    story.append(
        Paragraph(
            "<b>Chiffres clés à retenir</b>",
            sty["H2"],
        )
    )
    story.extend(
        bullets(
            [
                "218 pharmacies référencées",
                "794 médicaments issus de la Liste Nationale des Médicaments Essentiels (LNME 2023)",
                "Prix de référence liés à l’arrêté conjoint 2025",
                "5 rôles utilisateurs (patient, pharmacien, livreur, psychologue, admin)",
                "Démo en ligne : https://gosantetest.vercel.app",
            ],
            sty,
        )
    )

    # 2
    story.append(section_title("2. Le contexte et la vision", sty))
    story.append(
        Paragraph(
            "Au Burkina Faso, l’accès aux soins se heurte encore à des freins concrets : "
            "distance jusqu’à une pharmacie, difficulté à savoir laquelle est de garde, "
            "ruptures de stock, dossiers médicaux papier fragiles, et accès limité au "
            "soutien psychologique. Dans le même temps, le pays avance sur la "
            "<b>santé numérique</b> (Plan stratégique 2025–2029).",
            sty["Body"],
        )
    )
    story.append(
        Paragraph(
            "<b>La promesse de GoSanté</b> : rapprocher les services utiles du quotidien "
            "(médicaments, bien-être, dossier personnel, écoute) avant d’ajouter des "
            "briques plus complexes (écosystème hôpitaux, multilingue, etc.).",
            sty["Body"],
        )
    )
    story.append(
        Paragraph(
            "L’approche est volontairement <b>progressive</b> : d’abord un produit "
            "utilisable sur le terrain, ensuite les enrichissements.",
            sty["Body"],
        )
    )

    # 3
    story.append(section_title("3. À qui s’adresse la plateforme ?", sty))
    story.append(
        Paragraph(
            "Chaque personne se connecte avec un compte. Selon son rôle, elle voit "
            "un tableau de bord et des menus adaptés.",
            sty["Body"],
        )
    )
    story.append(
        make_table(
            ["Rôle", "Ce qu’il peut faire"],
            [
                [
                    "Patient",
                    "Chercher une pharmacie, commander, suivre une livraison, tenir son carnet, utiliser la santé mentale, prendre RDV avec un psychologue, noter les services.",
                ],
                [
                    "Pharmacien",
                    "Gérer le stock de sa pharmacie, recevoir et préparer les commandes, signaler qu’une commande est prête.",
                ],
                [
                    "Livreur",
                    "Se mettre en ligne, accepter des missions, naviguer jusqu’à la pharmacie puis au client, confirmer la remise avec un code.",
                ],
                [
                    "Psychologue",
                    "Publier son profil, ouvrir des créneaux, confirmer les rendez-vous, conduire la visio, prendre des notes de séance.",
                ],
                [
                    "Administrateur",
                    "Superviser l’activité, changer les rôles, lier un pharmacien à une pharmacie, assigner un livreur, suivre les indicateurs.",
                ],
            ],
            sty,
            col_widths=[3.2 * cm, 12.3 * cm],
        )
    )

    # 4
    story.append(PageBreak())
    story.append(section_title("4. Les fonctionnalités, module par module", sty))

    story.append(Paragraph("4.1 Pharmacie intelligente", sty["H2"]))
    story.append(
        Paragraph(
            "Le cœur opérationnel de GoSanté pour l’accès aux médicaments.",
            sty["Body"],
        )
    )
    story.extend(
        bullets(
            [
                "Carte interactive des pharmacies (ville, de garde, ouvertes maintenant).",
                "Fiche détaillée : adresse, téléphone, horaires, distance et durée de trajet.",
                "Catalogue de médicaments officiels (LNME) avec recherche.",
                "Panier d’achat conservé sur le téléphone de l’utilisateur.",
                "Commande avec adresse, point GPS de livraison et niveau d’urgence.",
                "Paiement en mode test : Mobile Money, carte ou espèces à la livraison.",
                "Suivi du statut : en attente → confirmée → préparation → prête → en livraison → terminée.",
            ],
            sty,
        )
    )

    story.append(Paragraph("4.2 Santé mentale", sty["H2"]))
    story.extend(
        bullets(
            [
                "Journal d’humeur (note de 1 à 5) avec texte libre.",
                "Option « coffre » : le contenu peut être chiffré avec un mot de passe personnel.",
                "Assistant conversationnel d’écoute (soutien, pas un diagnostic médical).",
                "Exercices guidés : respiration, ancrage, relâchement, gratitude.",
                "Numéros d’urgence locaux (SAMU 15, pompiers 18, police 17, etc.).",
            ],
            sty,
        )
    )

    story.append(Paragraph("4.3 Carnet médical numérique", sty["H2"]))
    story.extend(
        bullets(
            [
                "Profil santé : groupe sanguin, allergies, maladies chroniques, traitements.",
                "Vaccins avec dates, contact d’urgence.",
                "Historique (consultations, examens, hospitalisations…).",
                "Export du carnet en PDF pour impression ou partage manuel.",
                "À venir : partage sécurisé avec un médecin (lien / QR).",
            ],
            sty,
        )
    )

    story.append(Paragraph("4.4 Scan d’ordonnance", sty["H2"]))
    story.append(
        Paragraph(
            "La fonctionnalité technique existe : photographier une ordonnance, "
            "reconnaître le texte, proposer les médicaments correspondants, "
            "corriger puis ajouter au panier. Dans la version actuelle de démonstration, "
            "ce module n’est pas encore remis en avant dans le menu principal "
            "(à réactiver pour un pilote grand public).",
            sty["Body"],
        )
    )

    story.append(Paragraph("4.5 Consultation psychologique & visioconférence", sty["H2"]))
    story.extend(
        bullets(
            [
                "Annuaire de psychologues (spécialité, ville, langues, tarif, notes).",
                "Prise de rendez-vous sur créneaux, avec motif et option anonyme.",
                "Visio intégrée dans l’application (micro / caméra).",
                "Mode anonyme : identité discrète et caméra désactivable.",
                "Notifications de confirmation et suivi du rendez-vous.",
            ],
            sty,
        )
    )

    story.append(Paragraph("4.6 Compte, notifications et avis", sty["H2"]))
    story.extend(
        bullets(
            [
                "Inscription / connexion par e-mail et mot de passe.",
                "Acceptation obligatoire de la politique de confidentialité.",
                "Cloche de notifications dans l’application.",
                "Avis patients sur les livreurs et les psychologues.",
            ],
            sty,
        )
    )

    # 5
    story.append(PageBreak())
    story.append(section_title("5. L’expérience utilisateur (UX)", sty))
    story.append(
        Paragraph(
            "GoSanté a été pensé <b>d’abord pour le téléphone</b>, car c’est l’outil "
            "le plus répandu sur le terrain.",
            sty["Body"],
        )
    )
    story.extend(
        bullets(
            [
                "Navigation basse sur mobile, menu latéral sur ordinateur.",
                "Accueil patient sous forme de tuiles claires (Pharmacie, Consultation, Commandes, Santé mentale, Carnet).",
                "Accueil professionnel avec indicateurs (file d’attente, stock, RDV du jour…).",
                "Cartes modernisées : marqueurs compréhensibles, légende, contrôles de zoom / recentrage, itinéraire visible.",
                "Checkout pharmacie guidé : panier → adresse → pin sur carte → urgence → paiement.",
                "Sécurité de remise : code patient à 6 caractères pour valider la livraison.",
                "Possibilité d’installer GoSanté comme une application (PWA) depuis le navigateur.",
                "Interface entièrement en français.",
            ],
            sty,
        )
    )
    story.append(
        Paragraph(
            "<b>Parcours type patient (médicaments)</b> : ouvrir l’app → trouver une pharmacie "
            "sur la carte → ajouter des médicaments → placer le point de livraison → "
            "commander → suivre le livreur → confirmer la réception avec le code.",
            sty["Body"],
        )
    )

    # 6
    story.append(section_title("6. Comment ça fonctionne, en langage simple", sty))
    story.append(
        Paragraph(
            "Inutile d’être informaticien pour comprendre l’architecture. "
            "Voici les briques essentielles :",
            sty["Body"],
        )
    )
    story.append(
        make_table(
            ["Brique", "Explication simple", "À quoi ça sert"],
            [
                [
                    "Application web (Next.js)",
                    "Le site moderne qui s’affiche sur téléphone et ordinateur",
                    "Tous les écrans patients et professionnels",
                ],
                [
                    "Supabase",
                    "Le « cerveau données » : comptes, base, sécurité, temps réel",
                    "Connexion, commandes, RDV, carnets, notifications",
                ],
                [
                    "Vercel",
                    "L’hébergement de l’application sur Internet",
                    "Mettre GoSanté en ligne (démo gosantetest)",
                ],
                [
                    "Cartes OpenStreetMap",
                    "Des cartes libres, sans coût Google Maps",
                    "Pharmacies, livraison, navigation",
                ],
                [
                    "OCR",
                    "Lecture automatique du texte d’une photo",
                    "Scan d’ordonnances",
                ],
                [
                    "Assistant IA (Groq)",
                    "Dialogue automatisé encadré",
                    "Soutien bien-être (avec avertissements)",
                ],
                [
                    "Visio (WebRTC)",
                    "Appel vidéo direct dans le navigateur",
                    "Consultation psychologique à distance",
                ],
                [
                    "Paiement (cible)",
                    "Mobile Money / cash",
                    "Aujourd’hui en simulation pour les tests",
                ],
            ],
            sty,
            col_widths=[3.4 * cm, 6.2 * cm, 5.9 * cm],
        )
    )

    # 7
    story.append(PageBreak())
    story.append(section_title("7. Sécurité, données et confiance", sty))
    story.append(
        Paragraph(
            "Les données de santé sont sensibles. GoSanté intègre dès maintenant "
            "plusieurs garde-fous, tout en rappelant que la <b>validation juridique "
            "complète</b> (notamment l’hébergement sur le territoire national) reste "
            "une étape à finaliser avec les porteurs.",
            sty["Body"],
        )
    )
    story.extend(
        bullets(
            [
                "Cadre de référence : Loi n°001-2021/AN sur la protection des données personnelles.",
                "Consentement obligatoire à l’inscription + page Politique de confidentialité.",
                "Isolation des données par rôle : un patient ne voit que son dossier, un livreur seulement ses missions, etc.",
                "Journal d’audit sur les actions importantes (commandes, livraisons, changements admin…).",
                "Journal de santé mentale : chiffrement possible côté utilisateur.",
                "L’assistant IA affiche clairement qu’il ne remplace pas un professionnel.",
                "CGU complètes et conformité d’hébergement Burkina Faso : à finaliser.",
            ],
            sty,
        )
    )

    # 8
    story.append(section_title("8. Où en est le projet aujourd’hui ?", sty))
    story.append(
        make_table(
            ["Domaine", "Avancement", "Commentaire pour décideurs"],
            [
                ["Application web & infra", "~85 %", "Démo en ligne opérationnelle"],
                ["Pharmacie + livraison", "~75–85 %", "Parcours bout-en-bout testable"],
                ["Santé mentale", "~65–80 %", "Journal, exercices, chat d’écoute"],
                ["Carnet médical", "~80 %", "Complet + export PDF"],
                ["Consultation psy / visio", "Avancé", "RDV + visio déjà présents"],
                ["Paiements réels", "~60 % concept", "Simulation active ; PSP à brancher"],
                ["Scan ordonnance", "Prêt techniquement", "À réexposer dans le menu"],
                ["Écosystème Phase 3", "0 %", "Hôpitaux, labos, langues locales…"],
            ],
            sty,
            col_widths=[4.2 * cm, 3.2 * cm, 8.1 * cm],
        )
    )
    story.append(Spacer(1, 0.4 * cm))
    story.append(
        Paragraph(
            "<b>Ce qui peut déjà être démontré</b> : création de comptes multi-rôles, "
            "commande pharmacie jusqu’à la livraison avec code, santé mentale, "
            "carnet PDF, consultation psy en visio, administration.",
            sty["Body"],
        )
    )

    # 9
    story.append(section_title("9. Prochaines étapes recommandées", sty))
    story.extend(
        bullets(
            [
                "Brancher et tester un vrai paiement Mobile Money (Genius Pay / Orange / Moov).",
                "Réactiver le scan d’ordonnance dans la navigation patient.",
                "Finaliser les règles de stockage des images d’ordonnances.",
                "Valider juridiquement l’hébergement des données de santé au Burkina Faso.",
                "Rédiger les CGU et préparer un guide utilisateur simple.",
                "Lancer un pilote terrain avec quelques pharmacies et livreurs partenaires.",
                "Améliorer la PWA (icônes) puis décider d’une éventuelle app native.",
            ],
            sty,
        )
    )

    # 10
    story.append(section_title("10. Accès démo et contacts utiles", sty))
    story.append(
        Paragraph(
            "<b>Adresse de démonstration</b> : https://gosantetest.vercel.app",
            sty["Body"],
        )
    )
    story.append(
        Paragraph(
            "Pour essayer : créer un compte patient via « S’inscrire », ou utiliser "
            "des comptes de démonstration selon les rôles préparés par l’équipe technique.",
            sty["Body"],
        )
    )
    story.append(
        Paragraph(
            "Les paiements affichés dans la démo sont indiqués comme <b>paiement test</b> : "
            "aucun débit réel n’est effectué.",
            sty["Body"],
        )
    )
    story.append(Spacer(1, 0.8 * cm))
    story.append(
        Paragraph(
            "Ce document présente l’état du produit tel qu’il peut être compris et "
            "piloté par des porteurs non techniques. Il peut servir de base à un "
            "comité de pilotage, un dossier partenaire, ou une présentation investisseurs / institutions.",
            sty["Body"],
        )
    )
    story.append(Spacer(1, 1.2 * cm))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL_LIGHT, spaceAfter=10))
    story.append(
        Paragraph(
            "GoSanté — Documentation porteurs de projet · Juillet 2026 · Confidentiel partenaires",
            sty["Caption"],
        )
    )

    doc.build(story, onFirstPage=draw_cover, onLaterPages=add_page_number)
    print(f"PDF écrit : {OUT}")
    return OUT


if __name__ == "__main__":
    build()
