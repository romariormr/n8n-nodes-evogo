"""Gera a referência do node Evolution GO para agentes, a partir do description real do node."""
import json, sys

d = json.load(open(sys.argv[1], encoding="utf-8"))
props = d["properties"]
pkg = json.load(open(sys.argv[2], encoding="utf-8"))


def shows(p):
    return (p.get("displayOptions") or {}).get("show") or {}


def hides(p):
    return (p.get("displayOptions") or {}).get("hide") or {}


def visible(p, res, op):
    s = shows(p)
    if "resource" in s and res not in s["resource"]:
        return False
    if "operation" in s and op not in s["operation"]:
        return False
    h = hides(p)
    if res in h.get("resource", []) or op in h.get("operation", []):
        return False
    return True


def fmt_default(v):
    if v in ("", None, [], {}):
        return ""
    s = json.dumps(v, ensure_ascii=False)
    return s if len(s) < 60 else s[:57] + "..."


def cell(t):
    import re
    t = re.sub(r"<a [^>]*>([^<]*)</a>", r"\1", t or "")
    t = t.replace(" Choose from the list, or specify an ID using an expression.", "")
    return t.replace("|", "\\|").replace("\n", " ").strip()


def extra_conditions(p):
    s = {k: v for k, v in shows(p).items() if k not in ("resource", "operation")}
    return "; ".join(f"só se `{k}` = {', '.join('`'+json.dumps(x, ensure_ascii=False)+'`' for x in v)}" for k, v in s.items())


def describe_options(p):
    if p.get("type") in ("options", "multiOptions") and p.get("options") and not (p.get("typeOptions") or {}).get("loadOptionsMethod"):
        vals = [f"`{o.get('value')}`" for o in p["options"] if "value" in o]
        if vals:
            return "valores: " + ", ".join(vals[:15]) + (" …" if len(vals) > 15 else "")
    if (p.get("typeOptions") or {}).get("loadOptionsMethod"):
        return "lista dinâmica (instâncias da credencial)"
    if p.get("type") in ("collection", "fixedCollection") and p.get("options"):
        names = []
        for o in p["options"]:
            if "values" in o:
                names.append(f"{o['name']}{{{', '.join(v['name'] for v in o['values'])}}}")
            else:
                names.append(o.get("name", ""))
        return "campos: " + ", ".join(f"`{n}`" for n in names)
    return ""


res_prop = next(p for p in props if p["name"] == "resource")
out = []
out.append(f"# Evolution GO no n8n — referência para agentes\n")
out.append(f"Gerado a partir do node `{pkg['name']}` v{pkg['version']} (tipo `{pkg['name']}.{d['name']}`, typeVersion {d['version']}).\n"
           "Use este node no lugar de **HTTP Request**: ele resolve o token da instância, monta o corpo certo de cada endpoint e trata erros.\n")
out.append("""## Como usar

- **Credencial:** `evolutionGoApi` (Base URL + API Key). Com a **API Key global**, o parâmetro `instanceId` recebe o **ID (UUID) da instância** (pegue em `resource: "instance"`, `operation: "listAll"`) e o node resolve o token dela sozinho. Com o token de uma instância na credencial, deixe `instanceId` vazio (`""`).
- **No n8n com projetos:** o workflow só enxerga credenciais do próprio projeto ou compartilhadas com ele.
- **Parâmetros:** todo node tem `resource` e `operation`; os demais dependem dos dois (tabelas abaixo). Os nomes são os internos do n8n (o que vai no JSON do workflow), não o rótulo da tela.
- **Número:** só dígitos com DDI (`5511999999999`), ou JID completo (`...@s.whatsapp.net`, grupo `...@g.us`, canal `...@newsletter`).
- **Mídia:** URLs precisam ser acessíveis pelo **servidor do Evolution GO**, não pelo n8n. Para arquivo vindo de outro node, use as opções que aceitam binário ou data URI.

### Exemplo de node no JSON do workflow

```json
{
  "type": "%s.%s",
  "typeVersion": %s,
  "name": "Enviar texto",
  "parameters": {
    "resource": "message",
    "operation": "sendText",
    "instanceId": "<uuid-da-instancia ou vazio>",
    "number": "5511999999999",
    "text": "Olá!"
  },
  "credentials": { "evolutionGoApi": { "id": "<id-da-credencial>", "name": "Evolution GO" } }
}
```
""" % (pkg["name"], d["name"], d["version"]))

out.append("## Índice\n")
for r in res_prop["options"]:
    out.append(f"- [{r['name']}](#{r['value'].lower()}) — `resource: \"{r['value']}\"`")
out.append("")

for r in res_prop["options"]:
    rv = r["value"]
    op_prop = next((p for p in props if p["name"] == "operation" and rv in shows(p).get("resource", [])), None)
    out.append(f"## {r['name']}\n<a id=\"{rv.lower()}\"></a>\n\n`resource: \"{rv}\"`\n")
    if not op_prop:
        continue
    for o in op_prop["options"]:
        ov = o["value"]
        out.append(f"### {o['name']} — `operation: \"{ov}\"`\n")
        if o.get("description"):
            out.append(cell(o["description"]) + "\n")
        rows = [p for p in props if p["name"] not in ("resource", "operation") and visible(p, rv, ov) and p.get("type") != "notice"]
        if not rows:
            out.append("_Sem parâmetros além de resource/operation._\n")
            continue
        out.append("| Parâmetro | Tipo | Obrig. | Padrão | Observações |\n|---|---|---|---|---|")
        for p in rows:
            notes = "; ".join(x for x in [cell(p.get("description")), describe_options(p), extra_conditions(p)] if x)
            out.append(f"| `{p['name']}` | {p.get('type')} | {'sim' if p.get('required') else ''} | {cell(fmt_default(p.get('default')))} | {notes} |")
        out.append("")

open(sys.argv[3], "w", encoding="utf-8", newline="\n").write("\n".join(out))
print("ok", sys.argv[3])
