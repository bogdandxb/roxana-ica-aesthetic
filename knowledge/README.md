# Baza de cunoștințe extinsă a asistentului virtual

Asistentul virtual de pe site răspunde **doar** din:

1. **Textul paginilor publice ale site-ului.** Se citește automat din `sitemap.xml`, deci orice modificare pe site ajunge singură la chatbot (în cel mult o oră). Sunt informații **oficiale**.
2. **Documentele din acest dosar (rădăcina lui).** Informații **oficiale** care nu apar pe site, de exemplu protocoale, produse sau instrucțiuni confirmate de Roxana. Se trimit întregi la fiecare întrebare.
3. **Dosarul `general/`.** Informații **generale**, documentate din surse medicale (AAD, DermNet, NHS, PubMed, producători), cu sursa și data verificării. Chatbotul le prezintă mereu ca „informație generală” și trimite la Roxana pentru protocolul exact. La fiecare întrebare se trimit doar secțiunile relevante (cel mult 5).

### Format pentru `general/*.md`

```
# Titlu
tip: general
cuvinte cheie: cuvinte, după, care, se, caută
verificat: data verificării
surse:
- Nume sursă — https://adresa
## Titlul secțiunii (general)
Textul secțiunii...
```

Fiecare secțiune (`## …`) trebuie să se înțeleagă singură, pentru că poate fi trimisă fără restul documentului.

## Cum adaugi informații noi (pe viitor)

- Pune aici fișiere `.md` sau `.txt`, câte unul pe subiect. De exemplu:
  - `protocol-skin-reset-hydration.md`
  - `intrebari-frecvente-epilare.md`
  - `produse-folosite.md`
- Scrie informațiile simplu, cu titluri și liste. Chatbotul le folosește exact cum sunt scrise și nu adaugă nimic din afara lor.
- Fișierul acesta (`README.md`) este ignorat.
- După ce urci modificarea pe GitHub, Vercel publică site-ul automat. Chatbotul vede documentele noi în cel mult o oră.

## Atenție

- Nu pune aici date personale ale clientelor.
- Tot ce scrii aici poate ajunge într-un răspuns către o vizitatoare a site-ului.
