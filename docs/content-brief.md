# SpectraDCIM public website — content brief and Stitch prompts

Date: 2026-11-16. Sources: teardown of Modius, Sunbird, EkkoSense, Nlyte, Hyperview, Device42, Schneider EcoStruxure IT, Vertiv, Cormant, RiT Tech, Packet Power; Uptime Institute 2025 surveys; IEA Energy and AI 2025; feature inventory of the `dcim-platform` repo.

---

## 1. Ground rules for claims

The product has so far run only against the simulator (2 sites, ~700 devices). The site must not claim more than that.

| Topic | Allowed on site | Not allowed |
|---|---|---|
| Brand | "SpectraDCIM" (one word, as in the logo) | "Spectra DCIM" |
| Customers | none shown; "Early access / design partner" framing | logo wall, testimonials, ROI numbers |
| Protocols | May be named only inside ordinary sentences: SNMP v2c/v3, gNMI streaming, Redfish, BACnet/IP, Modbus/TCP | IPMI polling, sFlow. **Any highlighted protocol: no strips, marquees, tables, chips, badges, mono labels, diagram labels or headings (decided 2026-11-16)** |
| Scale | "collector fleet sharded by site and network plane" | any device-count claim |
| Security | SNMPv3 authPriv, mTLS-enrolled collectors, signed releases, per-collector encrypted credentials, audit trail on alarm actions, role model (viewer/operator/admin) | SSO/SAML/LDAP, SOC 2, ISO 27001, "enterprise-grade security" (label SSO and user accounts "on the roadmap") |
| Deployment | self-hosted / on-premises | SaaS, air-gapped certified |
| 3-D / thermal | 3-D building, room, rack views; sensor-interpolated heat map; thermal replay | "CFD", "physics-based", "AI digital twin" |
| Anomaly detection | statistical baselines (EWMA/CUSUM), data-quality checks, operator feedback; "no LLM in the detection path" | "AI-powered", "predictive AI" |
| Integrations | email (SMTP), REST API + OpenAPI, WebSocket feed, Prometheus metrics; Jira / JSM labelled "beta" | ServiceNow, Slack, PagerDuty, Teams |
| Alarm proof | "In a simulated chiller-plant loss, 727 raw alarms were presented as 9 console lines and 1 summary alarm" — always with the word "simulated" | the same number without that label |

Market statistics that may be quoted, with source line on the page:
- 45% of impactful outages are caused by power; cooling 14% (Uptime Institute Global Data Center Survey 2025).
- 54% of operators said their most recent significant outage cost over $100,000; one in five over $1M (Uptime Annual Outage Analysis 2025).
- 46% of operators struggle to find qualified staff (Uptime 2025).
- Data-centre electricity ~415 TWh in 2024, projected ~945 TWh by 2030 (IEA, Energy and AI, 2025).
- EU EED: sites with 500 kW or more of installed IT power report PUE, WUE, ERF, REF annually.
Do not quote: average PUE figure, liquid-cooling adoption %, stranded-capacity %, CSRD "applies to everyone" (all unverified or outdated).

Open decisions (defaults used below are marked):
1. Company name behind the product for footer/About — default: placeholder "[Company]".
2. Pricing model — default: no numbers; "Early access" page stating principles only.
3. Partner programme tracks — default: Reseller / System integrator / Technology partner.
4. Product screenshots — existing captures predate the logo; re-capture needed. Stitch uses stylised mock panels meanwhile.

---

## 2. What the competitors do (short)

- Shared nav: Product (one page per module), Solutions/Industries, Resources, Partners, Company, persistent demo CTA.
- Shared home: outcome hero with two CTAs, module grid, logo wall, testimonials, resources strip, closing CTA.
- Worth copying: Sunbird's per-module pages and "What is…" SEO hub; Modius's "Works With" protocol/vendor page and three-track partner programme; EkkoSense's persona questions; Hyperview's product tour, public docs and plain pricing page; Packet Power's "Problems we solve" nav item.
- Gaps to use: only Modius lists protocols; most hide pricing; "single pane of glass" and invented categories (DCOI, UIIM) are everywhere; grey-space depth (plant, electrical) is thin on IT-first vendors; Vertiv no longer sells a full DCIM suite.

Positioning for SpectraDCIM: **one model for white space and grey space, and one alarm per real problem.** Engineering-honest tone, equipment named, numbers sourced. Protocols are not a headline feature (see section 1).

---

## 3. Site map

Top nav: Platform ▾ | Solutions | Works With | Partners | Resources | Company | [Request a demo]

1. Home `/`
2. Platform overview `/platform`
3. Power & Capacity `/platform/power`
4. Thermal & Cooling `/platform/thermal`
5. 3-D Floor & Replay `/platform/visualization`
6. Alarms & Incidents `/platform/alarms`
7. Assets & Discovery `/platform/assets`
8. Works With (protocols, device classes, integrations, architecture) `/works-with`
9. Solutions (colocation, enterprise, edge; by role) `/solutions`
10. Early Access & Pricing `/early-access`
11. Partners `/partners`
12. Resources hub (What is DCIM, DCIM vs BMS, guides, blog) `/resources`
13. Company `/company`
14. Request a demo / Contact `/demo`

Footer: product links, Works With, Resources, Company, Partners, Contact, Privacy, Terms.

---

## 4. Page copy

### 4.1 Home
- **Hero** — H1: "Power, cooling and IT. One system, watched as one."
  Sub: "SpectraDCIM monitors every site from the utility feed to the server outlet, and turns alarm floods into the one problem that caused them."
  CTAs: "Request a demo" (primary), "Tour the platform" (secondary). Visual: product mock — 3-D hall with heat map, alarm rail beside it.
- **Equipment strip** (instead of logo wall): Servers · Switches · PDUs · UPS · Switchgear · Generators · Chillers · CRAHs · CDUs.
- **Problem band** — "Most outages start in the plant, not the rack." Three sourced stats (45% power; 54% over $100k; 46% staffing).
- **Three pillars**
  1. "From utility feed to outlet" — power chain, redundancy, headroom, stranded kW, PUE.
  2. "One condition, one alarm" — trap and polled reading fold onto one row; correlation follows power and cooling dependencies.
  3. "See the room, then replay it" — 3-D floor, heat map from live sensors, thermal replay like video.
- **Proof block** — "727 → 10": "In a simulated chiller-plant loss, 727 raw alarms reached the operator as 9 console lines and 1 summary alarm." Link: "How correlation works".
- **Module grid** (6 cards): Power & Capacity, Thermal & Cooling, 3-D Floor & Replay, Alarms & Incidents, Assets & Discovery, Works With.
- **Who it is for** — persona questions: Facility manager "Which train is carrying the load, and what happens if it trips?" · DC operations "Which of these 700 alarms is the cause?" · Capacity planner "What runs out first: power, cooling, space or ports?" · Sustainability lead "What is our PUE, site by site, hour by hour?"
- **Architecture strip** — Collectors (per network plane) → stream → platform → UI/API. "Signed releases, mTLS enrolment, self-hosted."
- **Early access CTA** — "We are onboarding design partners." Button: "Apply for early access".

### 4.2 Platform overview
- H1: "One telemetry model for white space and grey space."
- Sub: "Servers, switches, PDUs, UPS, switchgear, generators, CRAHs, chillers, pumps, CDUs and fire panels in the same model, the same alarm console and the same floor map."
- Sections: top-menu tour (Home / Thermal / Power / Capacity / Visualization / Assets / System status), each with a mock panel and two lines; "How data flows" diagram; "Built to standards" (ASHRAE TC 9.9 thermal envelopes, ISA-18.2-aligned alarm handling — partial, say "aligned with"); module cards; CTA.

### 4.3 Power & Capacity
- H1: "Know the whole power chain, and how much of it is left."
- Blocks: supply chain utility → transformer → switchgear → ATS/generator → UPS → RPP → PDU → outlet; redundancy census (what is still N+1 right now); headroom and stranded kW per room and rack; per-outlet PDU current; PUE per site with trends; capacity across power, cooling, space and ports — "which runs out first"; forecast ("says so when there is not enough history to forecast").
- Sources of data: UPS/PDU over SNMP, meters and switchgear over Modbus/TCP, plant over BACnet/IP.

### 4.4 Thermal & Cooling
- H1: "From chiller plant to server inlet, one cooling picture."
- Blocks: estate thermal view against ASHRAE TC 9.9 classes; cooling plant analytics (chiller staging, loop ΔT, pumps, towers, valves); CRAH and CDU monitoring for air and liquid-cooled halls; cooling-chain correlation (plant → unit → zone → server); anomaly findings on learned baselines, opt-in.

### 4.5 3-D Floor & Replay
- H1: "Walk the building. Then rewind it."
- Blocks: building → level → room → rack → device faces; 2-D plan and 3-D; heat-map planes interpolated from live sensors; thermal replay timeline ("scrub the last hours like video"); world map with weather and hazard overlays; network map across five layers (production, management, power, cooling, fieldbus) with trace and impact.

### 4.6 Alarms & Incidents
- H1: "One condition. One alarm. One incident with its evidence."
- Blocks: trap + poll on one row ("the trap makes it fast, the poll makes it true"); rule engine with dwell and hysteresis, per-device overrides; three correlation layers (power dependency with redundancy veto, link ends, cooling chain); incident pages with cause and evidence trail; maintenance-window suppression; notifications by email, Jira/JSM (beta); the 727 → 10 simulated result.

### 4.7 Assets & Discovery
- H1: "An inventory that matches the floor."
- Blocks: discovery queue and commissioning; estate tree site → room → row → rack → U; rack elevations; contracts, spares, reservations, tags; maintenance windows; export to Jira Assets (beta).

### 4.8 Works With
- H1: "Named Device Classes. Open Integrations. No Black Box."
- "How it connects" paragraph (sentences only, no table): "Collectors sit on your network and read each device over the interface it already exposes. IT equipment is read over SNMP, gNMI streaming and Redfish; power and cooling plant over BACnet and Modbus. Traps and change-of-value updates are taken as they happen and confirmed by polling."
- Device classes: IT (servers/BMC, switches, routers, firewalls, load balancers, storage) · Power (utility feed, transformer, switchgear, ATS, generator, UPS, RPP, PDU) · Cooling (CRAH, chiller, pump, tower, valve, CDU) · Sensors and meters · Fire panels (monitoring only).
- Integrations: REST API with OpenAPI, WebSocket feed, Prometheus metrics, SMTP email, Jira / JSM (beta).
- Architecture: Go collectors per network plane, pools and shard map, disk spool, signed self-update, mTLS, Docker/.deb/.rpm. Self-hosted platform on PostgreSQL + TimescaleDB.
- Security facts + "On the roadmap: SSO, per-user accounts."

### 4.9 Solutions
- H1: "Built for the people who run the building."
- Tabs by segment: Colocation (per-room power and thermal evidence, incident history) · Enterprise (IT and facilities in one console) · Edge and multi-site (world map, collector per site).
- By role: facility manager, DC operations, capacity planner, network engineer, sustainability lead (EED indicators: PUE today; WUE/ERF/REF not claimed).

### 4.10 Early Access & Pricing
- H1: "Early access, with engineers on both sides."
- Copy: "SpectraDCIM is in early access. We are working with a small number of design partners who want a DCIM that covers plant and IT together."
- What partners get: guided deployment, direct line to the engineering team, roadmap input. What we ask: a pilot site, feedback.
- Pricing principles (placeholder, needs decision): "Simple pricing by footprint. No charge per data point. Unlimited users."
- Form: name, work email, company, role, number of sites, approximate racks, message.

### 4.11 Partners
- H1: "Bring SpectraDCIM to the sites you already serve."
- Tracks: Reseller · System integrator / MEP contractor · Technology partner (device and sensor vendors, ITSM).
- Benefits: deal registration, demo environment (the protocol-accurate simulator is a real differentiator for partner demos and training), technical enablement, co-marketing.
- Form: company, region, partner type, contact.

### 4.12 Resources
- H1: "Plain answers about running data centres."
- Featured guides (SEO): What is DCIM? · DCIM vs BMS vs EPMS · How to calculate PUE · Traps vs polling: why you need both · Alarm floods and ISA-18.2 · EU EED reporting for data centres · Monitoring liquid cooling (CDUs).
- Blog grid, filters by topic.

### 4.13 Company
- H1: "Built by people who think the plant matters as much as the rack."
- Sections: why we built it; principles ("Say exactly what it does", "One alarm per problem", "No LLM in the detection path", "Say what is not built yet"); how we test (full protocol-accurate simulated data centre); contact.

### 4.14 Request a demo
- H1: "See your kind of site in SpectraDCIM."
- Left: what the 30-minute demo covers (live estate, chiller-loss scenario, power chain, replay). Right: form (name, work email, company, role, sites, message). Below: partner and general contact links.

---

## 5. Stitch prompts

Mode: **Web**. Run the design-system prompt first, then one prompt per page in the same project so the theme carries over.

### 5.0 Design system (paste first)
```
Design a marketing website for "SpectraDCIM", data centre infrastructure management software for facility and IT operations teams. Desktop web, 1440 wide.

Style: premium dark tech, modelled on modern network / IT solution template kits. Pure near-black page with large soft silk-like wave shapes in deep indigo-blue drifting diagonally behind the hero and the footer. Elegant, spacious, glowing, not flat.
Colours: page background #000000, alternate section band #0b0c1a, card surface #0f1020 to #1a1c38, card border rgba(255,255,255,0.09), heading text gradient from #f1f2ff (top) to #cccfd8 (bottom), body text #cccfd8, muted #8b8fa3, primary accent blue #3b82f6 with soft glow, secondary cyan #22d3ee for small highlights and the word "DCIM" in the logo.
Type: Poppins for everything. H1 64-68px weight 500, centred in the hero, tight line height, subtle vertical gradient fill. Section H2 40-44px weight 500. Body 15-16px. Title Case headings.
Components:
- Pill label above every section heading: small rounded capsule, dark navy fill, thin blue border, blue text (for example "Why SpectraDCIM", "Platform", "FAQ").
- Primary button: solid blue, 6px radius, 2px translucent white border, blue glow shadow beneath, label plus a small chevron. Secondary button: dark navy fill, faint border, same shape.
- Cards: 14-16px radius, thin translucent border, dark gradient fill with a faint square grid-line pattern and a soft light sweep in one corner; small square icon tile top-left.
- Stat cards: huge number with a blue "+" or unit, short label, one line of caption.
- Bento layout: one wide product-dashboard card beside a narrower card with a small glowing line chart.
- CTA band: full-width rounded panel in solid accent blue with faint grid lines and two tilted dark UI fragments peeking in from the corners.
Imagery: dark product UI mock panels (3-D rack hall with heat map, power chain, alarm console, trend charts) and moody data-hall photography with blue light. No people portraits.
Header: transparent over the hero. Logo "SpectraDCIM" left with a small three-bar mark, nav right: Platform, Solutions, Works With, Partners, Resources, Company, then a "Request A Demo" button.
Footer: sits on the silk-wave background; logo and short line left, three link columns, contact row (phone, email, address), thin divider, legal row.
```

### 5.1 Home
```
Home page for SpectraDCIM using the same design system.
1. Hero, everything centred over the silk-wave background. Small capsule above the headline: "Early Access · Now Onboarding Design Partners". H1 on two lines "Power, Cooling And IT. One System, Watched As One." Subtext "SpectraDCIM monitors every site from the utility feed to the server outlet, across SNMP, gNMI, Redfish, BACnet and Modbus, and turns alarm floods into the one problem that caused them." Two buttons side by side: "Request A Demo" (primary) and "Tour The Platform" (secondary).
2. One row of large, dim grey wordmarks scrolling as a marquee: SNMP v3, gNMI, Redfish, BACnet/IP, Modbus/TCP, REST API.
3. Bento row: wide card with a dark product dashboard mock (3-D data hall with heat map, alarm rail, trend charts); narrower card titled "See The Room, Then Replay It" with one line of text and a glowing temperature line chart with a highlighted point.
4. About split: pill label "About SpectraDCIM" on the left; on the right a large 28px statement "One telemetry model for white space and grey space: servers, switches, PDUs, UPS, switchgear, chillers, CRAHs and CDUs in the same console." Below: small rounded data-hall photo left, "Explore The Platform" button, short paragraph right.
5. Why section, two columns. Left: pill "Why SpectraDCIM", H2 "Most Outages Start In The Plant, Not The Rack", one line, then two stat cards: "45%" label "Outages Caused By Power" caption "Uptime Institute, 2025"; "727 → 10" label "Alarms To Console Lines" caption "Simulated chiller-plant loss". Right: tall rounded data-hall photo with a floating capsule "One Condition, One Alarm".
6. Platform section: centred pill "Platform", H2 "Everything Between The Utility Feed And The Outlet". Two rows of three grid-pattern cards with icon tiles: Power & Capacity, Thermal & Cooling, 3-D Floor & Replay, Alarms & Incidents, Assets & Discovery, Works With. Each: title, one line, a small circular arrow button bottom-right.
7. Persona section in a testimonial layout. Left: pill "Who It Is For", a large quote mark and the question "Which of these 700 alarms is the cause?" attributed to "DC Operations", then two small cards with further questions from "Facility Manager" and "Capacity Planner", carousel dots. Right: tall product visual on a grid-line panel (rack elevation with heat colours).
8. On a slightly lighter band (#0b0c1a): centred pill "Get Started", H2 "Three Ways To Begin". Three cards, the middle one raised with a silk-wave fill: "Live Demo" (30 minutes, chiller-loss scenario), "Design Partner Pilot" (one site, guided deployment, direct line to engineering), "Partner Programme" (resell or integrate). Each has a text link with circular arrow and an inner panel with three check-mark lines.
9. FAQ split. Left: card with silk-wave fill titled "Contact" with email and address lines and three round icon buttons. Right: pill "FAQ", H2 "Frequently Asked Questions", accordion of four items, first open: "Is SpectraDCIM Hosted Or Self-Hosted?" answer "Self-hosted, on your own infrastructure."; "Which Protocols Does It Speak?"; "Does It Replace My BMS?"; "Is It Available Today?"
10. Resources: H2 left "Plain Answers About Running Data Centres", pill "Resources" and "View All" button right; three image cards with date line and title: "What Is DCIM?", "DCIM vs BMS vs EPMS", "Traps vs Polling: Why You Need Both".
11. CTA band in solid accent blue with grid lines and tilted UI fragments: capsule "Ready To See Your Site As One System?", H2 "Start With A 30-Minute Demo", dark button "Request A Demo".
12. Footer on silk-wave background.
```

### 5.2 Platform overview
```
Platform overview page for SpectraDCIM, same design system. Hero: eyebrow "PLATFORM", H1 "One telemetry model for white space and grey space." Subtext listing servers, switches, PDUs, UPS, switchgear, generators, CRAHs, chillers, pumps, CDUs and fire panels in the same model. Then an alternating left/right tour of seven sections, each with a product mock panel and two lines of text: Home (estate overview), Thermal, Power, Capacity, Visualization, Assets, System status. Then a horizontal data-flow diagram (devices, collectors, stream, platform, UI/API). Then a "Built to standards" row with two tiles: "ASHRAE TC 9.9 thermal envelopes" and "Alarm handling aligned with ISA-18.2". Then module cards and a "Request a demo" band. Footer.
```

### 5.3 Power & Capacity
```
Product page "Power & Capacity" for SpectraDCIM, same design system, amber #e3a008 as the small accent. Hero: H1 "Know the whole power chain, and how much of it is left." with a one-line power diagram mock on the right. Section 1: horizontal chain graphic Utility → Transformer → Switchgear → ATS / Generator → UPS → RPP → PDU → Outlet with live readouts in mono. Section 2: three cards "Redundancy, right now", "Headroom and stranded kW", "Per-outlet current". Section 3: PUE trend chart mock per site. Section 4: "What runs out first?" four horizontal capacity bars: power, cooling, space, ports. Section 5: small table "Where the data comes from": UPS and PDU over SNMP, meters and switchgear over Modbus/TCP, plant over BACnet/IP. CTA band. Footer.
```

### 5.4 Thermal & Cooling
```
Product page "Thermal & Cooling" for SpectraDCIM, same design system, teal #2da9b8 as the small accent. Hero: H1 "From chiller plant to server inlet, one cooling picture." with a heat-map room mock. Sections: estate thermal view against ASHRAE TC 9.9 classes (rack inlet chart with allowed band); cooling plant panel mock with chillers, pumps, towers, loop delta-T; "Air and liquid" two cards: CRAH monitoring, CDU monitoring; chain diagram Plant → Unit → Zone → Server titled "Correlation that follows the cooling chain"; card "Anomaly findings on learned baselines, opt-in. No LLM in the detection path." CTA band. Footer.
```

### 5.5 3-D Floor & Replay
```
Product page "3-D Floor & Replay" for SpectraDCIM, same design system. Hero with a full-width 3-D data hall mock: rows of racks, coloured heat-map plane, timeline scrubber at the bottom. H1 "Walk the building. Then rewind it." Sections: zoom ladder Building → Level → Room → Rack → Device with five small mock tiles; "Thermal replay" with a video-style timeline; "World map" mock with site pins coloured by worst alarm; "Network map" mock with five coloured layers (production, management, power, cooling, fieldbus) and a highlighted trace path. CTA band. Footer.
```

### 5.6 Alarms & Incidents
```
Product page "Alarms & Incidents" for SpectraDCIM, same design system. Hero: H1 "One condition. One alarm. One incident with its evidence." with an alarm console mock. Section 1: diagram showing a trap and a polled reading merging into one alarm row, caption "The trap makes it fast. The poll makes it true." Section 2: three cards for correlation layers: "Power dependency, redundancy aware", "Both ends of a link", "Cooling chain". Section 3: big mono "727 → 10" proof block with the caption "In a simulated chiller-plant loss, 727 raw alarms reached the operator as 9 console lines and 1 summary alarm." Section 4: incident page mock with cause and evidence timeline. Section 5: row of small tiles: rules with dwell and hysteresis, per-device overrides, maintenance windows, email notifications, Jira / JSM (beta tag). CTA band. Footer.
```

### 5.7 Assets & Discovery
```
Product page "Assets & Discovery" for SpectraDCIM, same design system. Hero: H1 "An inventory that matches the floor." with a rack elevation mock. Sections: discovery queue mock table with "Commission" action; estate tree Site → Room → Row → Rack → U; grid of six small cards: Contracts, Spare parts, Reservations, Tags, Maintenance windows, Export to Jira Assets (beta tag). CTA band. Footer.
```

### 5.8 Works With
```
Page "Works With" for SpectraDCIM, same design system. Hero: H1 "Named protocols. Named device classes. No black box." Section 1: protocol table with mono names and a short use column: SNMP v2c/v3 (polling, traps, INFORMs), gNMI (streaming), Redfish, BACnet/IP (with change-of-value), Modbus/TCP. Section 2: four device-class panels with icon lists: IT, Power, Cooling, Sensors and Fire. Section 3: integrations grid: REST API with OpenAPI, WebSocket feed, Prometheus metrics, Email (SMTP), Jira and JSM (beta). Section 4: architecture diagram: collectors per network plane in pools, stream, platform on PostgreSQL and TimescaleDB, self-hosted. Section 5: two-column security list: left "Today" (SNMPv3 authPriv, mTLS-enrolled collectors, signed releases, encrypted credentials, audit trail), right "On the roadmap" (SSO, per-user accounts). Footer.
```

### 5.9 Solutions
```
Page "Solutions" for SpectraDCIM, same design system. Hero: H1 "Built for the people who run the building." Tab bar: Colocation, Enterprise, Edge and multi-site; show the Colocation tab with three benefit rows and a mock panel. Below, "By role" grid of five cards each with a role, a question in quotes and a link: Facility manager, DC operations, Capacity planner, Network engineer, Sustainability lead. CTA band. Footer.
```

### 5.10 Early Access & Pricing
```
Page "Early Access" for SpectraDCIM, same design system. Hero: H1 "Early access, with engineers on both sides." Subtext "SpectraDCIM is in early access. We are working with a small number of design partners who want a DCIM that covers plant and IT together." Two columns: "What you get" (guided deployment, direct line to engineering, roadmap input) and "What we ask" (a pilot site, honest feedback). A row of three pricing principle tiles: "Priced by footprint", "No charge per data point", "Unlimited users". Application form on a raised panel: name, work email, company, role, number of sites, approximate racks, message, button "Apply for early access". Footer.
```

### 5.11 Partners
```
Page "Partners" for SpectraDCIM, same design system. Hero: H1 "Bring SpectraDCIM to the sites you already serve." Three track cards: Reseller, System integrator, Technology partner, each with three bullet benefits. Benefits row with four tiles: Deal registration, Demo environment, Technical enablement, Co-marketing. Highlight panel "A full simulated data centre for your demos and training" with a mock. Partner application form: company, region, partner type dropdown, contact name, work email, message, button "Become a partner". Footer.
```

### 5.12 Resources
```
Page "Resources" for SpectraDCIM, same design system. Hero: H1 "Plain answers about running data centres." with a search field and topic filter chips: Guides, Power, Cooling, Alarms, Sustainability. Featured guide large card "What is DCIM?" Then a grid of six guide cards: "DCIM vs BMS vs EPMS", "How to calculate PUE", "Traps vs polling: why you need both", "Alarm floods and ISA-18.2", "EU EED reporting for data centres", "Monitoring liquid cooling". Then a blog list with dates. Newsletter band. Footer.
```

### 5.13 Company
```
Page "Company" for SpectraDCIM, same design system. Hero: H1 "Built by people who think the plant matters as much as the rack." Section "Why we built it" two short paragraphs. Section "Principles" four numbered tiles: "Name the protocol", "One alarm per problem", "No LLM in the detection path", "Say what is not built yet". Section "How we test" with a mock of a simulated data centre topology and caption. Contact band with email and "Request a demo" button. Footer.
```

### 5.14 Request a demo
```
Page "Request a demo" for SpectraDCIM, same design system. Two columns. Left: H1 "See your kind of site in SpectraDCIM." and a checklist "In 30 minutes": live estate overview, a chiller-loss scenario from first alarm to incident, the power chain from utility to outlet, thermal replay. Right: form on a raised panel: name, work email, company, role, number of sites, message, button "Request a demo". Below: two small links "Become a partner" and "General contact". Footer.
```

---

## 6. Visual reference and motion spec

Reference: Nexios "Modern Network & IT Solution" template kit (live demo inspected 2026-11-16). We take its look, layout rhythm and motion; copy, logo, photos and dashboard art are our own.

### 6.1 What was measured on the reference
- Page: pure black, 7,480 px tall home page; alternate band in dark navy for the pricing section.
- Type: Poppins; hero heading 67 px, weight 500, vertical gradient fill #f1f2ff → #cccfd8; body colour #cccfd8.
- Primary button: fill rgb(89,116,199), 6 px radius, 2 px border rgba(255,255,255,.24), shadow `0 5px 23px -6px` in the fill colour, padding 13×30. Secondary: fill rgb(26,28,56), border rgba(255,255,255,.09).
- Section order: transparent header → centred hero → logo marquee → bento (dashboard + side card) → about split → why + counters + photo → 3 service cards → testimonial carousel + portrait → pricing with monthly/yearly toggle → FAQ accordion + contact card → blog cards → solid-colour CTA band → footer on wave background.
- Motion: 45 elements enter with fade-in-up, 4 with zoom-in, all triggered on scroll into view.

### 6.2 How each reference block maps to SpectraDCIM
| Reference block | SpectraDCIM use |
|---|---|
| Avatar row "Join 15,725+ customers" | Capsule "Early Access · Now Onboarding Design Partners" (no customer count exists) |
| Client logo marquee | Protocol wordmark marquee |
| Counters "275+ projects", "364K+ clients" | Sourced stat "45%" and simulated result "727 → 10" |
| Testimonials with star ratings | Persona questions carousel (no testimonials exist) |
| Pricing cards with prices | "Three Ways To Begin" cards (no price list yet) |
| People photography | Product UI and data-hall photography |

### 6.3 Motion spec for the build (Stitch output is static; this is applied in code)
Stack: Lenis for smooth scrolling, GSAP + ScrollTrigger for scroll-driven motion, CSS for hovers. All motion is disabled under `prefers-reduced-motion`, and content is visible without JavaScript.

| Effect | Where | Spec |
|---|---|---|
| Smooth scroll | whole site | Lenis, lerp 0.1, native on touch devices |
| Fade-in-up on scroll | headings, paragraphs, cards, buttons | from opacity 0, y 40 px → 1, 0; 0.7 s, ease `power2.out`; trigger at 85% viewport; once |
| Stagger | card grids, stat cards, FAQ rows | 0.12 s between items |
| Zoom-in | dashboard bento card, CTA band, hero mock | from scale 0.92, opacity 0; 0.8 s |
| Hero load sequence | capsule → H1 lines → subtext → buttons | 0.15 s stagger, H1 lines slide up from a clipped mask |
| Silk-wave background | hero, footer | slow drift, 20–30 s loop, plus 15% scroll parallax |
| Marquee | protocol wordmarks | continuous 30 s linear loop, pauses on hover, edges fade out with a mask |
| Counters | stat cards | count from 0 to value over 1.6 s on first view |
| Parallax | data-hall photos, tilted UI fragments in CTA band | y shift −8% to +8% across the scroll range |
| Sticky header | all pages | transparent at top; after 80 px gains blurred dark fill and a hairline border; hides on scroll down, returns on scroll up |
| Card hover | all cards | lift 6 px, border brightens to accent, light sweep moves across; 0.25 s |
| Button hover | all buttons | glow grows, chevron slides 4 px right; 0.15 s |
| Carousel | persona questions | auto-advance 5 s, swipe, dots |
| Accordion | FAQ | height animate 0.3 s, plus icon rotates to minus |
| Toggle | Get Started cards (if a plan switch is added later) | sliding pill, numbers cross-fade |
| Page transition | between pages | 0.3 s fade |

---

## 7. Decisions of 2026-11-16 (these override sections 5 and 6 where they differ)

The Stitch prompts in section 5 are the originals and still carry protocol strips, the blue/cyan palette and wave backgrounds. The live Stitch screens were changed as below; use this section, not section 5, when building.

### 7.1 Protocols
Never highlighted. No strip, marquee, table, chip, badge, mono label, diagram label or heading names a protocol. Protocol names appear only inside sentences (Works With "How it connects" paragraph, Home FAQ answer, Power "where readings come from" sentence). Integrations (REST API, WebSocket, Prometheus, email, Jira) may still be listed.

### 7.2 Background
Pure black page. Hero and footer: `assets/bg/silk-2560.webp` (Unsplash, free licence, see `assets/bg/CREDITS.md`) under `linear-gradient(rgba(0,0,0,.55) 0%, #000 100%)`, reversed in the footer. Header transparent over the hero. No glow blobs, no SVG waves.

### 7.3 Type, colour, links, buttons (measured on the Nexios reference; implemented in `assets/nexios-skin.css`)
| Item | Value |
|---|---|
| Headings, navigation | Poppins 500, Title Case, line-height 1.1 |
| Hero H1 | 67 px, gradient text #F1F2FF to #CCCFD8 |
| Section H2 / card title | 42 px / 22 px, #F1F2FF |
| Body, button labels | system font stack, 16 px, weight 400 |
| Body text | #CCCFD8 |
| Accent text, links, active nav | #7E91CB |
| Accent fill (buttons, CTA band) | #5974C7; deep #354B8E; icon tile #6074B2 |
| Primary button | #5974C7, white label, letter-spacing 1 px, padding 13 x 30, radius 6, border 2 px white 24 %, shadow 0 5px 23px -6px #6175B3 |
| Secondary button | #1A1C38, border 2 px white 9 %, shadow 0 5px 18px -6px rgba(89,116,199,.36) |
| Surfaces | #0A0B16, #13152A, #1A1C38; card border 1 px white 9 % |

The earlier blue #3b82f6 and cyan #22d3ee are retired, including in the logo wordmark ("DCIM" is #7E91CB).
