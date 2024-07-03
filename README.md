# Can I afford?

Das ist die Frage die ich mich gestellt habe vor diesem Projekt. Mit diesem Tool lässt sich grob abschätzen ob man sich
zum Beispiel eine Immobilie leisten kann. Auf Basis von LLMs werden Zukunftsdarstellungen eingegeben und das System versucht
diese in konkrete Szenarien umzusetzen.

## Setup

Um mit einem laufenden AzureOpenAI Instanz zu laufen musst du das `.env.local` file erstellen und die Werte entsprechend dem `.env.test` file anpassen.

Danach nur noch die Dependencies installieren und den Server starten.

```bash
yarn install
yarn dev
```

## Weitere Ideen

1. Inflation berechnen bei Einnahmen & Ausgaben
2. Investitionen & Schulden
3. Editieren von Faktoren mit llm?
4. Beispiel Szenarien vorschlagen
   1. Beispiel Immobilienkauf, Todesfall, Kinder, ...
5. Varianten des Szenarios einblenden (10% mehr / 10 % weniger...)
