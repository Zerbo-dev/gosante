# Documentation porteurs de projet — GoSanté

Documents destinés aux décideurs et partenaires **non techniques**.

| Fichier | Description |
|---------|-------------|
| `GoSante_Documentation_Porteurs.pdf` | Documentation complète (fonctionnalités, UX, organisation, stack vulgarisée, maturité, prochaines étapes) |
| `GoSante_Presentation_Porteurs.pptx` | Présentation PowerPoint (13 slides) pour comité / partenaires |

**Démo :** https://gosantetest.vercel.app

## Régénérer

```bash
python3 scripts/generate_gosante_pdf.py
python3 scripts/generate_gosante_pptx.py
```

Dépendances : `reportlab`, `python-pptx` (déjà listées pour l’environnement de génération).
