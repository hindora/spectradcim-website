# SpectraDCIM positioning inventory: what the product is, claims, proof assets and marketing constraints

Research date: 2026-11-18. Method: read-only review of the website repository at `C:\Users\harii\PycharmProjects\spectradcim-website` (Astro 5 static site, 14 pages), plus a check of the live site and a light web search. Links to local files are relative to this notes folder (`../../` is the repository root). Nothing in the repository was modified. Where the content brief and the built pages differ, the built pages (and the live site) are what the public sees; the brief is the owner's rulebook.

Short names used below:
- BRIEF = [docs/content-brief.md](../../docs/content-brief.md)
- README = [README.md](../../README.md)
- HOME = [src/pages/index.astro](../../src/pages/index.astro)
- LIVE = https://spectradcim.com/

## 1. What is SpectraDCIM and what is its core promise?

### Takeaway
SpectraDCIM is self-hosted data centre infrastructure management (DCIM) software, in early access, that monitors IT equipment, the electrical chain and the cooling plant in one model and folds alarm floods under the one cause. It has only ever run against the owner's own simulated two-site estate, and the site says so repeatedly.

### Cited Findings
- Site title: "SpectraDCIM | Power, Cooling And IT Watched As One"; inner pages are titled "<Page> | SpectraDCIM" — [src/layouts/Base.astro](../../src/layouts/Base.astro) line 37; confirmed on [LIVE](https://spectradcim.com/).
- Home H1: "Power, Cooling And IT. One System, Watched As One." Hero pill: "Data Centre Infrastructure Management". Hero sub-line and meta description: "SpectraDCIM monitors every site from the utility feed to the server outlet, and turns alarm floods into the one problem that caused them." — [HOME](../../src/pages/index.astro) lines 69-85.
- "About" statement: "One telemetry model for white space and grey space: servers, switches, PDUs, UPS, switchgear, chillers, CRAHs and CDUs in the same console." — [HOME](../../src/pages/index.astro) lines 111-114.
- The problem statement in the owner's words: "Most tools watch the IT room or the plant. An outage does not respect that line: a pump trips, a hall warms, servers throttle. SpectraDCIM models the dependency between them, so the alarm you see first is the one that matters." — [HOME](../../src/pages/index.astro) lines 120-124.
- Footer line: "Power, cooling and IT in one system, watched as one. Self-hosted data centre infrastructure management, now in early access." — [src/components/Footer.astro](../../src/components/Footer.astro) lines 44-47.
- Company page one-liner: "SpectraDCIM is data centre infrastructure management software that watches power, cooling and IT as one system." — [src/pages/company.astro](../../src/pages/company.astro) line 58.
- Positioning line in the brief: "one model for white space and grey space, and one alarm per real problem. Engineering-honest tone, equipment named, numbers sourced. Protocols are not a headline feature" — [BRIEF](../../docs/content-brief.md) section 2, line 47.
- Deployment: "Self-hosted, on your own infrastructure. The platform and its collectors run inside your network, and your telemetry stays there." — [HOME](../../src/pages/index.astro) FAQ, line 56.
- It does not replace the BMS: "No. The building management system keeps controlling the plant. SpectraDCIM reads the plant alongside the electrical chain and the IT equipment, so one console shows how they affect each other." — [HOME](../../src/pages/index.astro) line 58.
- Maturity: "The product has so far run only against the simulator (2 sites, ~700 devices). The site must not claim more than that." — [BRIEF](../../docs/content-brief.md) section 1, line 9.
- Spelling convention on the site is British ("data centre", "colour", "programme"); page language tag is `en` — [src/layouts/Base.astro](../../src/layouts/Base.astro) line 41 and all pages.

### Inferences
- The one-sentence promise that every page repeats is two-part: (a) one model across IT + power + cooling ("white space and grey space"), and (b) "one condition, one alarm". Any marketing message should be a variation of these two, since the brief names them as the positioning.
- The product monitors and reads; nothing on the site claims it controls plant or equipment, except PDU outlet/server actions which are NOT mentioned on the website at all (inferred from absence).

### Gaps
- The company/legal entity behind the product is not stated anywhere on the site. The brief lists it as an open decision with a placeholder "[Company]" ([BRIEF](../../docs/content-brief.md) line 33); the footer says only "Copyright {year} SpectraDCIM. All rights reserved." ([Footer.astro](../../src/components/Footer.astro) line 70).
- No founder, team, location or founding-date information exists on the site or in the brief.

## 2. Who is it for? Personas, segments and the problem each page says it solves

### Takeaway
The site names five roles (each with one question in the role's own voice) and three site types (colocation, enterprise, edge/multi-site), plus three partner types. These persona questions are the site's substitute for testimonials and are ready-made hooks for social content.

### Cited Findings
- Persona questions on Home ("Who It Is For"): DC Operations "Which of these 700 alarms is the cause?"; Facility Manager "Which train is carrying the load, and what happens if it trips?"; Capacity Planner "What runs out first: power, cooling, space or ports?"; Sustainability Lead "What is our PUE, site by site, hour by hour?" — [HOME](../../src/pages/index.astro) lines 23-28.
- Solutions page adds a fifth role: Network Engineer "What is on the other end of this port, and what depends on it?" — [src/pages/solutions.astro](../../src/pages/solutions.astro) `roles` array.
- Solutions H1: "Built For The People Who Run The Building." Sub: "Different sites and different jobs, one model of the building underneath." — [solutions.astro](../../src/pages/solutions.astro).
- Segment: Colocation. "Evidence For Every Room You Sell" / "Tenants ask what happened in their room. Answer with the record, not with a recollection." Points: power evidence per room, thermal evidence per room, incident history — [solutions.astro](../../src/pages/solutions.astro) `segments`.
- Segment: Enterprise. "IT And Facilities In One Console" / "Two teams, two sets of tools and one building. Give both teams the same picture." Points: one view for both teams, dependencies written down ("in the model, not in one person's head"), "Your BMS Stays" — [solutions.astro](../../src/pages/solutions.astro).
- Segment: Edge and multi-site. "Many Small Sites, One Place To Look" / "A room with six racks deserves the same attention as a hall with six hundred." Points: world map with weather and hazard overlays, a collector at each site that stores to disk if the link drops, the same model everywhere — [solutions.astro](../../src/pages/solutions.astro).
- Early-access target: "Operators who run plant and IT" — [src/pages/early-access.astro](../../src/pages/early-access.astro) `glance`.
- Partner audiences: Reseller ("You already sell to and support data centre operators"), System Integrator Or MEP Contractor ("You design, build or commission the plant and the electrical chain"; "Hand over a site that is monitored, not only built"), Technology Partner ("You make devices or sensors, or you run a service desk product") — [src/pages/partners.astro](../../src/pages/partners.astro) `tracks`.
- Problem framing with sourced statistics shown on the site: 45% of impactful outages caused by power and 14% by cooling, both captioned "Uptime Institute Global Data Center Survey, 2025" — [HOME](../../src/pages/index.astro) lines 142-146; [company.astro](../../src/pages/company.astro) lines 80-89.
- Further statistics the brief permits (with a source line), not all used on pages yet: 54% of operators' most recent significant outage cost over $100,000 and one in five over $1M (Uptime Annual Outage Analysis 2025); 46% struggle to find qualified staff (Uptime 2025); data-centre electricity ~415 TWh in 2024, ~945 TWh projected by 2030 (IEA Energy and AI 2025); EU EED reporting for sites with 500 kW or more of installed IT power — [BRIEF](../../docs/content-brief.md) lines 24-29.
- Statistics the brief forbids: average PUE figure, liquid-cooling adoption %, stranded-capacity %, CSRD "applies to everyone" ("all unverified or outdated") — [BRIEF](../../docs/content-brief.md) line 30.
- Sustainability angle: EU Energy Efficiency Directive reporting of PUE, WUE, ERF, REF; the site states PUE is "Measured today" and WUE, ERF, REF are "Not available" — [solutions.astro](../../src/pages/solutions.astro) `indicators` and reporting section.

### Inferences
- The site is written for hands-on operations and facilities people (operators, facility managers, capacity planners), not for C-level buyers; no page addresses finance or procurement.
- Sunbird, Modius, EkkoSense, Nlyte, Hyperview, Device42, Schneider EcoStruxure IT, Vertiv, Cormant, RiT Tech and Packet Power are the competitors the owner studied ([BRIEF](../../docs/content-brief.md) line 3), so these are the reference set for competitor comparison; the public site names none of them.

### Gaps
- No company-size, geography or industry targeting is stated (no mention of target regions or languages). British spelling and the EU EED emphasis suggest a UK/EU-leaning audience, but that is inference only.
- No ideal-customer size (MW, racks, sites) is given; the brief forbids any device-count scale claim.

## 3. Feature list and claimed differentiators (exact headlines and key phrases per page)

### Takeaway
Six product modules plus an architecture/integration page. The differentiators the site leans on hardest are: grey space and white space in one model, alarm folding with cause-first incidents ("727 to 10" in a simulated chiller-plant loss), 3-D floor with sensor heat map and video-style replay, trap-plus-poll alarm truth, and deliberately plain honesty about limits (no LLM, not CFD, partial ISA-18.2, roadmap gaps listed).

### Cited Findings

**Navigation and page set**
- Header nav: Platform (dropdown: Platform Overview, Power & Capacity, Thermal & Cooling, 3-D Floor & Replay, Alarms & Incidents, Assets & Discovery), Solutions, Works With, Partners, Resources, Company, and a "Request A Demo" button — [src/components/Header.astro](../../src/components/Header.astro).
- 14 pages: `/`, `/platform`, `/platform/power`, `/platform/thermal`, `/platform/visualization`, `/platform/alarms`, `/platform/assets`, `/works-with`, `/solutions`, `/early-access`, `/partners`, `/resources`, `/company`, `/demo` — [BRIEF](../../docs/content-brief.md) section 3; files under [src/pages/](../../src/pages/).

**Platform overview** — [src/pages/platform/index.astro](../../src/pages/platform/index.astro)
- H1: "One Telemetry Model For White Space And Grey Space". Sub: "Servers, switches, PDUs, UPS, switchgear, generators, CRAHs, chillers, pumps, CDUs and fire panels in the same model, the same alarm console and the same floor map."
- "Seven Menus, One Model Behind Them": Home ("The Estate At A Glance"), Thermal ("Heat, From Plant To Inlet"), Power ("The Chain And Its Redundancy"), Capacity ("What Runs Out First"), Visualization ("Walk It, Then Rewind It"), Assets ("An Inventory That Matches The Floor"), System Status ("The Monitor, Monitored": "If data is late or a collector goes quiet, the console says so.").
- Data flow in five steps: Devices, Collectors, Stream, Platform, Console And API. "A collector fleet inside your network, sharded by site and network plane, polls and listens." "Collectors enrol with mutual TLS, hold their device credentials encrypted, and run signed releases."
- Standards: "ASHRAE TC 9.9 Thermal Envelopes" and "Alarm Handling Aligned With ISA-18.2" with the caveat "The alignment is partial today, and we will show you where it stops."

**Power & Capacity** — [src/pages/platform/power.astro](../../src/pages/platform/power.astro)
- H1: "Know The Whole Power Chain, And How Much Of It Is Left". Sub: "SpectraDCIM follows power from the utility feed to the server outlet, shows which redundancy is still intact, and names the resource that runs out first."
- "Eight Steps From Utility To Outlet, On One Line"; "Both Feeds, Side By Side" ("a rack running on one cord is visible before the second one fails"); "Panels Read Through Their Meters".
- "Redundancy, Right Now" (census of every redundant group); "Headroom And Stranded kW" (per room and rack); "Per-Outlet Current" ("Where a PDU does not report it, the gap is shown, not filled in.").
- "PUE Per Site, With The Trend Behind It" (hour by hour, facility and IT energy side by side).
- "What Runs Out First?": "A hall with free rack space can still be full, because power or cooling ran out before the floor did." Four resources: power, cooling, space, ports. "A Forecast That States Its Limits": "When there is not enough history to forecast, the panel says so and draws no line."

**Thermal & Cooling** — [src/pages/platform/thermal.astro](../../src/pages/platform/thermal.astro)
- H1: "From Chiller Plant To Server Inlet, One Cooling Picture". Sub: "Chillers, pumps, towers, CRAHs, CDUs and rack inlets in one model, so a warm row can be followed back to the plant that caused it."
- "Every Rack Inlet Against Its ASHRAE Envelope"; "The Plant Room, Read Like The White Space" (chiller staging, loop delta-T, pumps, towers, valves; "The building management system keeps control of the plant. SpectraDCIM reads it.").
- "Room Units For Both Kinds Of Hall": CRAH monitoring (air-cooled) and CDU monitoring (liquid-cooled).
- "Correlation That Follows The Cooling Chain": Plant, Unit, Zone, Server.
- Anomaly detection: "Findings On Learned Baselines, When You Want Them". "A threshold catches a reading that is too high. A baseline catches one that is unusual for that point at that time". Opt-in; learned per point ("the panel says when it is still learning"); operator feedback (confirm/dismiss); "Plain statistics. Baselines and data-quality checks. There is no LLM in the detection path." A finding is labelled "Finding, not an alarm."

**3-D Floor & Replay** — [src/pages/platform/visualization.astro](../../src/pages/platform/visualization.astro)
- H1: "Walk The Building. Then Rewind It." Sub: "A 3-D model of every site, from the building down to the device face, with a heat map drawn from live sensors and a timeline you can scrub back through."
- "Five Steps From The Building To The Port": Building, Level, Room, Rack, Device.
- "The Same Room, Flat Or Standing Up" (2-D plan and 3-D). "Heat-Map Planes From Live Sensors": "The heat map is interpolated between the readings of real sensors at the height you choose. It shows what was measured, and it is not an airflow simulation." "Empty Positions Are Drawn Too".
- "Scrub The Last Hours Like Video": "Drag the timeline back and the room redraws as it was. The alarms of that period sit on the same track, so you can watch a fault arrive and spread." "Each frame is rebuilt from the sensor readings stored for that moment, not from a recording of the screen." "Evidence For The Review".
- "Every Site, And The Weather Above It": world map, pins by worst alarm, weather overlay (cloud and radar), hazard overlay (published weather warnings and natural-hazard alerts).
- "Five Layers, One Map Of What Connects To What": production network, management network, power, cooling, fieldbus; "Trace" and "Impact" ("see everything that depends on it, before you switch it off for maintenance").

**Alarms & Incidents** — [src/pages/platform/alarms.astro](../../src/pages/platform/alarms.astro)
- H1: "One Condition. One Alarm. One Incident With Its Evidence." Sub: "A plant fault can raise hundreds of alarms in a minute. SpectraDCIM folds the symptoms under the cause, shown here for a simulated chiller-plant loss."
- "The Trap Makes It Fast. The Poll Makes It True." Raised by whichever arrives first; confirmed by the poll; cleared by the poll ("even if the clearing event never arrives").
- "Three Layers That Find The Cause": "Power Dependency, Redundancy Aware" (a redundancy veto "holds back the outage and reports lost redundancy instead"); "Both Ends Of A Link" (one alarm on the link, not two on two ports); "Cooling Chain".
- Proof block: "727 -> 10", "Raw alarms to console lines, simulated chiller-plant loss"; "In a simulated chiller-plant loss, 727 raw alarms reached the operator as 9 console lines and 1 summary alarm." "Nothing is thrown away. Every raw alarm is still there, folded under the line it belongs to, and one click opens the full list."
- "One Page For The Whole Event": cause first, evidence trail (device events, polled readings, operator actions on one timeline), history kept.
- "Tune It Once, Then Trust It": rules with dwell and hysteresis, per-device overrides, maintenance windows, email notifications, Jira / JSM (tagged Beta), audit trail on alarm actions.

**Assets & Discovery** — [src/pages/platform/assets.astro](../../src/pages/platform/assets.astro)
- H1: "An Inventory That Matches The Floor." Sub: "Devices are found on the network, placed in a rack position, and monitored from then on. The record and the room stay the same thing."
- "New Devices Wait In A Queue, Not In A Spreadsheet"; four steps Found, Reviewed, Commissioned, Monitored.
- "From The Site Down To The Rack Unit": rack elevations, complete rows (empty cabinets modelled), one record per device.
- Records: Contracts, Spare Parts, Reservations, Tags, Maintenance Windows, Export To Jira Assets (Beta).
- "Planned Work Should Not Look Like A Fault" (maintenance windows suppress and still record alarms).

**Works With** — [src/pages/works-with.astro](../../src/pages/works-with.astro)
- H1: "Named Device Classes. Open Integrations. No Black Box."
- "Standard Interfaces, No Agents": "Collectors sit on your network and read each device over the interface it already exposes. IT equipment is read over SNMP, gNMI streaming and Redfish; power and cooling plant over BACnet and Modbus. Traps and change-of-value updates are taken as they happen and confirmed by polling."
- Device classes: IT (servers and their management controllers, switches, routers, firewalls, load balancers, storage); Power (utility feed, transformer, switchgear, transfer switch, generator, UPS, remote power panel, rack PDU); Cooling (CRAH, chiller, pump, cooling tower, valve, CDU); Sensors and Fire (temperature/humidity sensors, power and energy meters, "Fire panels, monitoring only").
- Integrations ("Your Data Is Yours To Use"): REST API with OpenAPI, WebSocket feed, Prometheus metrics, Email, Jira / JSM (Beta).
- Architecture facts: a collector per network plane; pools and a shard map with hand-over; disk spool; signed self-update; collectors written in Go, shipped as Docker image, .deb or .rpm; platform self-hosted on PostgreSQL with TimescaleDB.
- Security "What Is In Place, And What Is Not Yet": Today = encrypted, authenticated device polling; collectors enrolled with mutual TLS; signed releases; device credentials encrypted per collector; audit trail on alarm actions; three roles (viewer, operator, admin). On The Roadmap = single sign-on (SSO), per-user accounts ("These are not available today.").

### Inferences
- Features the brief lists in the product inventory but which are not (or only lightly) surfaced as marketing claims: nothing was found that contradicts the brief; the site stays inside it.
- "Honest limits" is itself used as a differentiator (roadmap gaps listed, "not an airflow simulation", "partial" ISA-18.2, WUE/ERF/REF "Not available"). A marketing plan can treat candour as a brand trait, because the Company page makes it a stated principle.

### Gaps
- No feature comparison against named competitors exists in the repository beyond the short teardown notes in [BRIEF](../../docs/content-brief.md) section 2.
- No list of supported vendors or models (the site names device classes only, never brands). Whether a vendor list may be published is not addressed in the brief.
- No system requirements, sizing or performance figures are published (and the brief forbids device-count claims).

## 4. Stage and proof: what exists and what is absent

### Takeaway
Pre-customer early access. The only proof is the simulated estate: real product screenshots captured on it and one simulated result (727 raw alarms presented as 9 console lines and 1 summary alarm). There are no customers, logos, testimonials, case studies, prices, ROI figures, certifications or third-party reviews, and the owner's rules forbid inventing any.

### Cited Findings
- Stage: "Early access"; "Starting scope: One pilot site"; "Price list: Not published yet"; "Deployment: Self-hosted, on your network" — [early-access.astro](../../src/pages/early-access.astro) `glance`.
- Early Access H1: "Early Access, With Engineers On Both Sides". "SpectraDCIM is in early access. We are working with a small number of design partners who want a DCIM that covers plant and IT together." — [early-access.astro](../../src/pages/early-access.astro).
- Design-partner exchange: you get guided deployment, "A direct line to engineering" ("You talk to the people who write the code, not to a ticket queue."), "A say in the roadmap"; we ask "One pilot site" and "Honest feedback" — [early-access.astro](../../src/pages/early-access.astro).
- Explicit admission: "The product has so far been run against a simulated estate. A pilot is how it meets real equipment, which is why your feedback matters this much." — [early-access.astro](../../src/pages/early-access.astro) lines 104-107.
- Explicit admission: "This is the proof we have today. The product has not yet run on a customer site, which is what early access is for." — [company.astro](../../src/pages/company.astro) lines 139-142.
- Test bed: "SpectraDCIM is tested against a full simulated data centre: two sites, each with its chiller plant, its electrical chain and its IT equipment." "Every simulated device answers over the same management interfaces as the real equipment it stands for... We can trip a chiller, fail a UPS or block a filter, and watch what the platform does from the first alarm to the incident." — [company.astro](../../src/pages/company.astro) lines 126-135.
- The single quantified result, always labelled simulated: "In a simulated chiller-plant loss, 727 raw alarms were presented as 9 console lines and 1 summary alarm." — [company.astro](../../src/pages/company.astro) line 137; [alarms.astro](../../src/pages/platform/alarms.astro); [thermal.astro](../../src/pages/platform/thermal.astro); Home stat "727 -> 10 / Alarms To Console Lines / In a simulated chiller-plant loss: 9 lines and 1 summary alarm" — [HOME](../../src/pages/index.astro) lines 147-151.
- Pricing: "Three Principles, Before Any Numbers": "Priced By Footprint", "No Charge Per Data Point", "Unlimited Users". "No prices appear on this page because none have been set. Design partners will see the terms before they commit to anything." — [early-access.astro](../../src/pages/early-access.astro) lines 28-32, 133-136. The brief marks these principles "placeholder, needs decision" — [BRIEF](../../docs/content-brief.md) line 135.
- Demo: 30 minutes, runs "on a simulated estate with plant, electrical chain and IT, so nothing is needed from your network"; covers live estate overview, a chiller-loss scenario, the power chain, thermal replay — [src/pages/demo.astro](../../src/pages/demo.astro) lines 5-25. Home FAQ: "a live demo is available now" — [HOME](../../src/pages/index.astro) line 59.
- Partner programme is new: "The partner programme is opening alongside early access, and the first partners will help shape its terms." Co-marketing = "Shared guides and case material, written once there is real work to describe." — [partners.astro](../../src/pages/partners.astro).
- Jira / JSM integration and Jira Assets export are labelled Beta wherever they appear — [alarms.astro](../../src/pages/platform/alarms.astro), [assets.astro](../../src/pages/platform/assets.astro), [works-with.astro](../../src/pages/works-with.astro).
- Screenshots are real: "A real screen from SpectraDCIM (captured on the simulated estate), not a drawing. Exception: the four trend charts (power-draw, power-pue, thermal-intake, thermal-band) are redrawn ... in the product's chart style, because the captures had gaps in the data." — [src/components/Shot.astro](../../src/components/Shot.astro) lines 2-5. The Solutions page captions its PUE chart "Illustrative values." — [solutions.astro](../../src/pages/solutions.astro).
- The reference-template mapping in the brief records the absences directly: "no customer count exists", "no testimonials exist", "no price list yet" — [BRIEF](../../docs/content-brief.md) section 6.2, lines 278-285.

**Proof that is ABSENT (verified by reading every page and grepping the source):**
- No customer names, logos, logo wall, testimonials, quotes from real people, star ratings or review-site badges — all 14 files under [src/pages/](../../src/pages/).
- No case studies, white papers, downloadable PDFs, webinars, videos or product-tour recordings — [src/pages/resources.astro](../../src/pages/resources.astro) and [public/](../../public/) (only `bg/`, `brand/`, `shots/`, `favicon.png`).
- No prices, plans or ROI/savings numbers — [early-access.astro](../../src/pages/early-access.astro).
- No certifications or compliance claims (SOC 2, ISO 27001 are on the brief's not-allowed list) — [BRIEF](../../docs/content-brief.md) line 17.
- No real-site deployment, no device-count or scale number, no uptime/performance figure — [BRIEF](../../docs/content-brief.md) lines 9, 16.
- No analyst mentions, press coverage or awards anywhere in the repository.

### Inferences
- Because the only numeric proof is simulated, every social post or video that uses "727 to 10" must carry the word "simulated" (this is a stated rule, see section 5).
- The honest framing ("This is the proof we have today") means marketing should sell the demo and the design-partner pilot, not outcomes at customers.

### Gaps
- A count mismatch to be aware of: the Home screenshot alt text for `incident-cause` reads "one plant unit stopped, 701 downstream alarms folded under it" ([HOME](../../src/pages/index.astro) line 156) while the headline figure is 727 raw alarms. These may describe different things (downstream alarms under one cause vs all raw alarms) or different runs; the repository does not explain the difference. Do not mix the two numbers in one piece of content without checking with the owner.
- The number of design partners signed (if any) is not stated anywhere.
- No public documentation site, changelog or release notes were found.

## 5. Marketing rules and constraints set by the owner

### Takeaway
The brief contains a strict claims table. The most important rules: brand is one word "SpectraDCIM"; no customers/logos/testimonials/ROI numbers; protocol names never highlighted (sentences only); no "AI-powered", "CFD", "digital twin", SaaS, SSO or certification claims; the 727 figure always with "simulated"; plain, engineering-honest tone with sources next to every statistic.

### Cited Findings
- Claims table (allowed vs not allowed) — [BRIEF](../../docs/content-brief.md) section 1, lines 11-22:
  - Brand: "SpectraDCIM" (one word, as in the logo); not "Spectra DCIM".
  - Customers: none shown; "Early access / design partner" framing; no logo wall, testimonials, ROI numbers.
  - Protocols: "May be named only inside ordinary sentences: SNMP v2c/v3, gNMI streaming, Redfish, BACnet/IP, Modbus/TCP". Not allowed: IPMI polling, sFlow, and "Any highlighted protocol: no strips, marquees, tables, chips, badges, mono labels, diagram labels or headings (decided 2026-11-16)".
  - Scale: "collector fleet sharded by site and network plane" allowed; "any device-count claim" not allowed.
  - Security: allowed = SNMPv3 authPriv, mTLS-enrolled collectors, signed releases, per-collector encrypted credentials, audit trail on alarm actions, role model (viewer/operator/admin). Not allowed = SSO/SAML/LDAP, SOC 2, ISO 27001, "enterprise-grade security" (SSO and user accounts to be labelled "on the roadmap").
  - Deployment: self-hosted / on-premises allowed; SaaS and "air-gapped certified" not allowed.
  - 3-D / thermal: 3-D building, room, rack views; sensor-interpolated heat map; thermal replay allowed. Not allowed: "CFD", "physics-based", "AI digital twin".
  - Anomaly detection: statistical baselines (EWMA/CUSUM), data-quality checks, operator feedback; "no LLM in the detection path". Not allowed: "AI-powered", "predictive AI".
  - Integrations: email (SMTP), REST API + OpenAPI, WebSocket feed, Prometheus metrics; Jira / JSM labelled "beta". Not allowed: ServiceNow, Slack, PagerDuty, Teams.
  - Alarm proof: the 727 sentence "always with the word 'simulated'"; "the same number without that label" is not allowed.
- Protocol rule restated as a decision: "Never highlighted. No strip, marquee, table, chip, badge, mono label, diagram label or heading names a protocol. Protocol names appear only inside sentences (Works With 'How it connects' paragraph, Home FAQ answer, Power 'where readings come from' sentence). Integrations (REST API, WebSocket, Prometheus, email, Jira) may still be listed." — [BRIEF](../../docs/content-brief.md) section 7.1, line 316; also [README](../../README.md) "Design rules".
- The built pages follow the protocol rule: protocols appear in exactly three sentences — Home FAQ ("such as SNMP, Redfish, BACnet and Modbus") [HOME](../../src/pages/index.astro) line 57; Power page "Where The Readings Come From" [power.astro](../../src/pages/platform/power.astro); Works With "How It Connects" [works-with.astro](../../src/pages/works-with.astro). The Works With security list says "Encrypted, authenticated device polling" rather than naming a protocol, and the Company principle that the Stitch draft called "Name the protocol" is published as "Say Exactly What It Does" — [company.astro](../../src/pages/company.astro) lines 10-31; draft wording at [BRIEF](../../docs/content-brief.md) line 256.
- Section 7 of the brief overrides sections 5 and 6 (the original Stitch prompts still contain protocol strips and an older palette; do not reuse them) — [BRIEF](../../docs/content-brief.md) lines 311-313.
- Four published principles (Company page): "Say Exactly What It Does" ("If we cannot show a claim in a demo, it does not go on this site."); "One Alarm Per Problem"; "No LLM In The Detection Path" ("No language model decides what is an alarm."); "Say What Is Not Built Yet" — [company.astro](../../src/pages/company.astro) lines 10-31.
- Content rules for guides (Resources page): "Plain Language" (one question an operator actually asks, in their words); "Worked Examples" ("Examples come from our simulated data centre, and are labelled as simulated every time."); "Sources Named" ("When we quote a figure or a standard, the source is on the page next to it.") — [resources.astro](../../src/pages/resources.astro) `approach`.
- Tone: "Engineering-honest tone, equipment named, numbers sourced." Phrases the brief treats as overused by competitors: "single pane of glass" and invented categories (DCOI, UIIM) — [BRIEF](../../docs/content-brief.md) lines 45-47.
- "No claim beyond what docs/content-brief.md section 1 allows." — [README](../../README.md) "Design rules".
- Visual identity (current): pure black page; headings Title Case; accent fill `#5974C7`, accent text/links `#7E91CB`, body `#CCCFD8`, headings `#F1F2FF`; surfaces `#0A0B16`, `#13152A`, `#1A1C38`; the earlier blue `#3b82f6` and cyan `#22d3ee` are retired — [BRIEF](../../docs/content-brief.md) section 7.3; tokens in [src/styles/global.css](../../src/styles/global.css) lines 14-24.
- Imagery rule from the design brief: product UI and data-hall imagery, "No people portraits." — [BRIEF](../../docs/content-brief.md) line 177. The built site uses real product 3-D views as section backgrounds instead of stock photography — [src/components/Backdrop.astro](../../src/components/Backdrop.astro) comment lines 2-5.
- Hero background photo licence: Unsplash Licence, free for commercial use, attribution not required — [assets/bg/CREDITS.md](../../assets/bg/CREDITS.md).

### Inferences
- These rules were written for the website, but they are claim rules, so they should bind social posts, videos, ads and guides equally. Practical consequences for social: no protocol hashtags or protocol-name graphics; no "AI" positioning; no "digital twin" wording; no customer-style quotes; persona questions and the labelled simulated result are the allowed substitutes.
- "Digital twin" is restricted only in the form "AI digital twin" in the table; the site itself never uses "digital twin" at all, so avoiding the term entirely is the safe reading (inferred).

### Gaps
- Logo colour is in flux: the brief says "DCIM" in the wordmark is `#7E91CB`, while the working tree has uncommitted logo changes described as "cyan-to-blue gradient mark, sky-blue DCIM" ([src/components/Logo.astro](../../src/components/Logo.astro) comment; `git status` shows `public/brand/spectradcim-logo.png`, `public/favicon.png` and `Logo.astro` modified and not committed). Which logo is final needs the owner's confirmation before social profile images are made.
- Heading font: the brief and `global.css` name Poppins, but [Base.astro](../../src/layouts/Base.astro) line 55 loads Lato from Google Fonts. Which typeface is the brand font for graphics is not settled by the files (I did not check how the live page actually renders).
- No written social-media policy, hashtag list, or boilerplate "about" paragraph exists in the repository.

## 6. Existing conversion paths and technical marketing plumbing

### Takeaway
The site is live at spectradcim.com with a consistent "Request A Demo" call to action on every page, but nothing converts yet: all three forms are deliberately unwired, no contact details are published, and there is no analytics, share image, sitemap, robots file, newsletter, blog or legal page.

### Cited Findings

**Live site**
- https://spectradcim.com/ returns HTTP 200, served by nginx over HTTPS with HSTS; `www.spectradcim.com` 301-redirects to the apex domain; page last modified 17 Nov 2026 — [LIVE](https://spectradcim.com/) (checked 2026-11-18 with a plain HTTP request).
- Live title: "SpectraDCIM | Power, Cooling And IT Watched As One". Live meta description: "SpectraDCIM monitors every site from the utility feed to the server outlet, and turns alarm floods into the one problem that caused them." Live H1: "Power, Cooling And IT. One System, Watched As One." — [LIVE](https://spectradcim.com/).
- Main call to action: "Request A Demo" (primary, to `/demo`) with "Tour The Platform" (secondary, to `/platform`) — [HOME](../../src/pages/index.astro) lines 82-85; same pair on inner page heroes via [src/components/PageHero.astro](../../src/components/PageHero.astro); header button [Header.astro](../../src/components/Header.astro) line 59; closing band "Ready To See Your Site As One System?" / "Start With A 30-Minute Demo" / "Request A Demo" on every page via [src/components/CtaBand.astro](../../src/components/CtaBand.astro).
- Secondary paths on Home ("Three Ways To Begin"): Live Demo (`/demo`), Design Partner Pilot (`/early-access`, featured), Partner Programme (`/partners`) — [HOME](../../src/pages/index.astro) lines 30-53.

**Forms (three, none connected)**
- Request A Demo form fields: name, work email, company (required); role, number of sites, message — [demo.astro](../../src/pages/demo.astro) lines 40-74.
- Early Access form fields: name, work email, company (required); role, number of sites, approximate racks, message — [early-access.astro](../../src/pages/early-access.astro) lines 178-217.
- Partner form fields: company, region, partner type (reseller / system integrator or MEP contractor / technology partner / not sure yet), contact name, work email (required); message — [partners.astro](../../src/pages/partners.astro) lines 148-187.
- All three forms have no `action`; the submit handler calls `preventDefault()` and only reveals the message "This form is not connected to a mailbox yet, so nothing was sent. It will be wired up before launch." — [src/scripts/motion.js](../../src/scripts/motion.js) lines 165-176; message text in each page. The same message is present in the live `/demo/` HTML — [LIVE /demo/](https://spectradcim.com/demo/).
- "Forms have no mailbox or backend; submitting shows a notice saying so. Guides on the Resources page are titles only." — [README](../../README.md) "Not connected yet".

**Contact details**
- None published: no email address, phone number, postal address or `mailto:`/`tel:` link in the source (grep of `src/` and `public/`). The Company page says "Contact details will be published here before launch. Until then, each of these routes leads to the right form." — [company.astro](../../src/pages/company.astro) lines 153-156. The footer "contact" row links only to `/demo`, `/early-access`, `/partners` — [Footer.astro](../../src/components/Footer.astro) lines 64-68.

**Resources / blog / newsletter**
- Resources H1: "Plain Answers About Running Data Centres"; "The first ones are being written now." Seven planned guides, all tagged "Coming soon" and none linked: What Is DCIM? (featured), DCIM vs BMS vs EPMS, How To Calculate PUE, Traps vs Polling: Why You Need Both, Alarm Floods And ISA-18.2, EU EED Reporting For Data Centres, Monitoring Liquid Cooling. "None of these is published yet, so none of them is a link." — [resources.astro](../../src/pages/resources.astro).
- Home's three guide cards all link to `/resources`, not to articles — [HOME](../../src/pages/index.astro) lines 62-66.
- No blog: no blog route in [src/pages/](../../src/pages/); `https://spectradcim.com/blog/` returns 404 — [LIVE](https://spectradcim.com/blog/). The brief planned a "Blog grid" and a "Newsletter band" on Resources ([BRIEF](../../docs/content-brief.md) lines 147, 251); neither was built. No newsletter or subscribe form exists anywhere in the source.
- "Tell Us What To Write Next / Suggest a topic" links to the (unwired) demo form — [resources.astro](../../src/pages/resources.astro) lines 118-127.

**Analytics, SEO and social-share tags**
- No analytics or tag manager of any kind (no Google Analytics/Tag Manager, Plausible, Matomo, Hotjar, Clarity) in `src/` or in the live HTML — [Base.astro](../../src/layouts/Base.astro) head, lines 42-61; [LIVE](https://spectradcim.com/).
- Present meta tags: `title`, `description`, `og:title`, `og:description`, `og:type=website`, `theme-color`, favicon and apple-touch-icon — [Base.astro](../../src/layouts/Base.astro) lines 45-52.
- Absent meta tags: `og:image`, `og:url`, `og:site_name`, any `twitter:` card tag, `link rel="canonical"`, JSON-LD structured data — [Base.astro](../../src/layouts/Base.astro); confirmed in live head [LIVE](https://spectradcim.com/). No share image file exists in [public/](../../public/).
- No `robots.txt` and no sitemap: neither file is in [public/](../../public/), `@astrojs/sitemap` is not a dependency ([package.json](../../package.json) lists only `astro`), and `https://spectradcim.com/robots.txt` and `/sitemap.xml` return 404 — [LIVE](https://spectradcim.com/robots.txt).
- No privacy policy or terms pages: the brief's footer plan lists "Privacy, Terms" ([BRIEF](../../docs/content-brief.md) line 70) but no such pages exist and `https://spectradcim.com/privacy/` returns 404. No cookie banner (none needed while there is no tracking).
- No social profile links anywhere (header, footer, company page) — [Footer.astro](../../src/components/Footer.astro), [Header.astro](../../src/components/Header.astro).
- Each screenshot on the site links to its full-size image in a new tab — [Shot.astro](../../src/components/Shot.astro).

**Hosting facts relevant to marketing**
- Static build uploaded to a VM under `/var/www/spectradcim` with timestamped releases and rollback; nginx with a Let's Encrypt certificate; the domain is passed in as a parameter (`SITE_URL`), not hard-coded — [deploy/deploy.sh](../../deploy/deploy.sh), [deploy/setup-vm-nginx.sh](../../deploy/setup-vm-nginx.sh).
- The live server sends a strict Content-Security-Policy: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; form-action 'self'; frame-ancestors 'none'`, plus `X-Frame-Options: DENY` — response headers of [LIVE](https://spectradcim.com/).

### Inferences
- The site is publicly reachable but not yet "launched" in the owner's terms: the pages say forms "will be wired up before launch" and contact details "will be published here before launch". Driving social traffic to it today would lose every lead, because a visitor who submits a form is told nothing was sent.
- The CSP will block third-party analytics scripts, embedded YouTube/Vimeo players, externally hosted images and form posts to an outside service (for example a hosted form or CRM endpoint) until the nginx policy is widened. Adding analytics, video embeds or a form backend therefore needs a server-config change as well as a code change.
- Without `og:image` and Twitter card tags, links shared on LinkedIn, X, Slack or WhatsApp will show a text-only preview (or none). Without a sitemap, robots file and canonical tags, search indexing relies on crawling alone; a web search for the brand name and the domain returned no result for the site (see section 9), consistent with a site that is days old and not yet indexed.

### Gaps
- Whether a mailbox, CRM or form service has been chosen for the forms is not recorded in the repository.
- Whether the owner wants analytics at all (and which, given the self-hosted, privacy-leaning positioning) is not stated.
- I did not test the forms in a browser on the live site; the finding rests on the source code and on the same notice text being present in the live HTML.

## 7. Reusable marketing assets (screenshots, 3-D views, charts)

### Takeaway
There are 37 real product screenshots (web-optimised) and 18 full-bleed 3-D/world-map background views in two sizes, plus larger raw captures and a chart source file. All show the simulated estate. There are no videos, animations, GIFs, diagrams for download, or share-sized images.

### Cited Findings

**Product screenshots** — folder [public/shots/](../../public/shots/) (WebP; pixel sizes from [public/shots/_sizes.json](../../public/shots/_sizes.json); subjects from the alt text in the pages that use them)

3-D viewer and replay (2560 x 1396 unless noted):
- `replay-bar.webp` — server hall in 3-D in replay, timeline bar with marker, play controls, step and speed (Home hero feature).
- `replay-wide.webp` — replay timeline under the 3-D hall: marker scrubbed back, play, step, speed and compare. Note: same file size in bytes as `replay-bar.webp` (147,414), so the two are very probably the same image.
- `viewer-full.webp` — the 3-D floor with room information panel and the replay timeline.
- `hall-alarm.webp` — hall in 3-D with racks coloured by worst open alarm.
- `hall-power.webp` — hall in 3-D with racks coloured by power utilisation.
- `hallb-inlet.webp` — hall in 3-D with rack faces coloured by inlet and outlet temperature.
- `hall-temp.webp` (1800 x 886) — hall temperature view (present in the folder; not referenced by any page).
- `plan-heat.webp` — hall plan from above with the heat-map plane at mid height.
- `plant.webp` — central plant in 3-D: chillers and pumps.
- `site-view.webp` — the simulated site in 3-D: building, substation, generator yard and compound.
- `building.webp` — the whole building in 3-D, every level.
- `connectivity.webp` (2560 x 1370) — connectivity map: network room, server halls, UPS room, central plant and roof in one model (also used as the power-layer view).
- `world.webp` (2500 x 1260) — world map with both sites and their state.

Alarms and incidents:
- `incidents.webp` (1834 x 893) — incident list: each cause with state, severity, and number of alarms and rooms behind it.
- `incident-page.webp` (1506 x 1134) — incident page: cause, reach by room, evidence charts and timeline.
- `incident-cause.webp` (605 x 246) — incident cause panel: one plant unit stopped, 701 downstream alarms folded under it, rooms reached.
- `incident-evidence.webp` (678 x 439) — incident evidence: plant water temperatures, then intake air at the first devices to go hot.

Power, capacity and efficiency:
- `power-top.webp` (2509 x 645) — power page: load, share of rating, headroom and feed risk per site.
- `power-headroom.webp` (842 x 224) — load, share of rating and headroom per site.
- `power-draw.webp` (1320 x 692) — draw across the estate over seven days: total, IT and cooling (redrawn chart).
- `power-pue.webp` (1320 x 594) — PUE across the estate over seven days (redrawn chart; captioned "Illustrative values." on Solutions).
- `capacity.webp` (2509 x 610) — space, power and cooling used per site, and which runs out first.
- `analytics.webp` (1358 x 168) — the binding constraint, with a plain statement where no rating is recorded.
- `rack-feeds.webp` (905 x 190) — rack page: both power feeds with load against rating.
- `rack-redundancy.webp` (1009 x 164) — rack page: what happens if one supply side is lost.

Thermal:
- `thermal-top.webp` (2509 x 610) — average, p90 and maximum inlet, share in band and humidity per site.
- `thermal-intake.webp` (1320 x 654) — intake temperature across the estate against the ASHRAE recommended band (redrawn chart).
- `thermal-band.webp` (1320 x 452) — share of time in band across the estate (redrawn chart).
- `rack-unusual.webp` (1268 x 378) — rack page: open conditions and unusual behaviour (anomaly findings).

Estate, assets and system:
- `home.webp` (2500 x 1065) — Home: both sites with state by power, cooling, environment, IT, network and fire.
- `assets-overview.webp` (2130 x 1680) — counts, cabinet and floor space, rack fill.
- `inventory.webp` (1905 x 780) — asset tag, name, type, model, location and lifecycle.
- `discovery.webp` (2125 x 1177) — discovery: responders, serial match and address ranges being swept.
- `placement.webp` (1784 x 696) — rooms per site with racks, assets, free rack units and rated power.
- `maintenance.webp` (2124 x 295) — maintenance page where windows are scheduled.
- `rack.webp` (1800 x 809) — rack page (present in the folder; not referenced by any page).
- `platform.webp` (2174 x 1335) — system status: pipeline health, open conditions and collectors.

**Full-bleed background views** — folder [public/bg/](../../public/bg/): 18 real product views, each as `-2400.webp` and `-1200.webp`: `fpv` (first-person view down a server-room aisle; Home hero), `aisle`, `racks`, `hall`, `heat` (hall coloured by temperature), `temp`, `power`, `ups` (UPS room), `plant` (chiller plant), `netroom` (network room), `under`, `roof`, `yard` (generator yard), `levels`, `building`, `site` (compound; footer), `world`, `worldpue`. Mapping of view to page is in [Base.astro](../../src/layouts/Base.astro) lines 19-34; described as "a real 3-D, first-person or world-map view from the product (simulated estate)". Source PNGs for these are in [assets/bg/](../../assets/bg/) as `product-*.png`.

**Raw and source material (not on the site)**
- Larger raw captures in [assets/captures-raw/](../../assets/captures-raw/), including screens not used on the site: `alarm-rules.png`, `device.png`, `devices.png`, `racks.png`, `assets-commissioning.png`, `assets-reservations.png`, `assets-estate.png`, `v-hallA-fpv.png`, `v-netroom.png`, `v-ups.png`, `v-hallB-3d.png`, `v-hallA-3d.png`, `incident.png`, plus a `1280/` subfolder of 24 downsized captures. Most of these are excluded from git by [.gitignore](../../.gitignore) and exist only on this machine.
- Chart source: [assets/charts/charts.html](../../assets/charts/charts.html) with `render.cjs` and the four original chart captures in `assets/charts/original-captures/` — the four trend charts can be regenerated or restyled from this.
- Logo: [public/brand/spectradcim-logo.png](../../public/brand/spectradcim-logo.png) (860 x 216 per `_logo.json`), [public/favicon.png](../../public/favicon.png); originals and a recolour script in [assets/brand/](../../assets/brand/).
- Illustrative (not real) SVG/HTML mock components also exist: `MockHall`, `MockAlarms`, `MockChart`, `MockCapacityBars`, `MockPlant`, `MockWorldMap`, `MockOneLine`, `MockPowerChain`, `MockNetMap` in [src/components/](../../src/components/); the earlier mock-based page versions are kept under `docs/themes/pages-with-mocks`.

**Ready-made copy assets**
- Five persona questions (section 2), the trap/poll line "The Trap Makes It Fast. The Poll Makes It True.", the "727 -> 10" simulated result, four FAQ answers on Home, the four company principles, and seven planned guide titles (section 6) — sources as cited above.
- An illustrative incident timeline (chiller trip at 14:02:11 through operator acknowledgement at 14:09:02; 6, 48 and 212 alarms folded at successive stages) — [alarms.astro](../../src/pages/platform/alarms.astro) `evidence`; [thermal.astro](../../src/pages/platform/thermal.astro) `chain`. These are illustrations inside the page, not captured data.

### Inferences
- Best social/video candidates, judged from subject and size: `replay-bar`/`viewer-full` (replay), `plan-heat` and `hallb-inlet` (heat map), `hall-alarm` (alarm colouring), `incident-cause` + `incident-evidence` + `incident-page` (root cause story), `connectivity` (five-layer map), `site-view` and `building` (3-D estate), `power-draw` and `power-pue` (charts), and the `fpv` background (first-person aisle). The small crops (`rack-feeds`, `rack-redundancy`, `power-headroom`, `analytics`, `incident-cause`) are under 1100 px wide and will need a designed frame to be used at social sizes.
- All visuals show simulated data, and four charts are redrawn; captions on social should say "simulated estate" to stay within the brief's rule on labelling.
- Since the 3-D replay is described as playing "like video", a screen recording of the product would be the natural video asset, but none exists in the repository.

### Gaps
- No video, GIF or screen-recording files exist in the repository (file listing of `public/` and `assets/`).
- No social-sized images (1200 x 630, 1080 x 1080, 1080 x 1920), no banner/cover images, no slide deck, no one-page PDF, no press kit.
- I did not open every image to verify its content visually; subjects are taken from file names and the alt text written in the pages. The brief notes that earlier "captures predate the logo; re-capture needed" ([BRIEF](../../docs/content-brief.md) line 36); the latest commit message says the screens were retaken, so this appears resolved, but it was not visually verified.
- Whether the screenshots contain any simulated device names or addresses the owner would prefer not to publish on social was not checked.

## 8. Gaps a marketing plan must fix

### Takeaway
Before any campaign, the conversion plumbing has to exist: working forms, a contact address, a share image, analytics and legal pages. After that, the content engine is empty: seven guide titles and zero published pieces, no blog, no video, no social profiles.

### Cited Findings
- Forms are not connected; a submitted lead is discarded and the visitor is told so — [motion.js](../../src/scripts/motion.js) lines 165-176; [README](../../README.md).
- No contact email, phone or address is published — [company.astro](../../src/pages/company.astro) lines 153-156.
- No analytics, so traffic and campaign results cannot be measured — [Base.astro](../../src/layouts/Base.astro).
- No `og:image`, `og:url`, Twitter card, canonical link or structured data — [Base.astro](../../src/layouts/Base.astro) lines 45-52.
- No `robots.txt`, no sitemap — [public/](../../public/); [LIVE](https://spectradcim.com/sitemap.xml) returns 404.
- No privacy policy or terms pages although the forms collect names and work emails — [BRIEF](../../docs/content-brief.md) line 70 (planned); [LIVE](https://spectradcim.com/privacy/) returns 404.
- No blog, and all seven guides are "Coming soon" placeholders — [resources.astro](../../src/pages/resources.astro).
- No newsletter sign-up — [resources.astro](../../src/pages/resources.astro) (the brief's planned "Newsletter band" was not built).
- No social profiles linked in the header or footer — [Footer.astro](../../src/components/Footer.astro).
- No customer proof of any kind, and no real-site deployment yet — [company.astro](../../src/pages/company.astro) lines 139-142.
- No published pricing; the three pricing principles are still marked as needing a decision — [BRIEF](../../docs/content-brief.md) lines 34, 135.
- Company name behind the product undecided (placeholder "[Company]") — [BRIEF](../../docs/content-brief.md) line 33.
- No video or animated asset, although the lead feature is described as video-like replay — [visualization.astro](../../src/pages/platform/visualization.astro); file listing of [public/](../../public/).
- Strict CSP on the live server restricts scripts, images, frames and form targets to the site's own origin — response headers of [LIVE](https://spectradcim.com/).
- Uncommitted logo/favicon changes in the working tree; the live site may not match the local logo — `git status` in the repository; [Logo.astro](../../src/components/Logo.astro).

### Inferences
- Suggested order of fixes implied by the findings (inference, not an owner decision): (1) wire the three forms and publish a contact address; (2) add privacy/terms; (3) add share image and Open Graph/Twitter tags, canonical, sitemap, robots; (4) add analytics and adjust the CSP; (5) settle logo, company name and brand font; (6) publish the first guides (the seven titles are already chosen and double as SEO targets and social topics); (7) record the 30-minute demo scenarios (chiller loss, replay) as short videos; (8) create and link social profiles.
- The honest-proof constraint shapes the content mix: explainers ("What is DCIM?", "DCIM vs BMS vs EPMS", "Traps vs Polling"), simulated worked examples, product walk-throughs, and design-partner recruitment, rather than customer stories or ROI claims.
- The partner page positions the simulator as a demo and training environment; this is a second audience (integrators, MEP contractors, resellers) for which no content exists yet beyond that page.

### Gaps
- No marketing budget, team, timeline, target lead numbers or launch date appear in the repository.
- No decision is recorded on which social platforms to use.

## 9. Web presence and brand-name collision check

### Takeaway
No existing social presence for "SpectraDCIM" was found, and the brand name returns no search results for the product at all, so it starts from zero visibility. No DCIM product named "Spectra" was found, but "Spectra"/"Spectrum" is a crowded name in adjacent IT and data-centre markets (notably Spectra Logic in storage and Broadcom's DX Spectrum in network monitoring), which is a search and recall risk if the name is ever split into two words.

### Cited Findings
- A web search for the exact term "SpectraDCIM" returned no result about the product; results were unrelated spectrum/spectroscopy pages — web search run 2026-11-18, e.g. top results [tine-docs.desy.de](https://tine-docs.desy.de/structDSPECTRUM.html), [NIST](https://www.nist.gov/publications/derived-spectra-software-tools-detecting-spatial-and-spectral-features-spectrum-images).
- A search for the domain name "spectradcim.com" returned no result for the site itself; results were similarly named unrelated domains — e.g. [builtwith.com listing for spectrumim.com](https://builtwith.com/spectrumim.com), [Spectrum Instrumentation](https://spectrum-instrumentation.com/company/index.php).
- A combined search for "SpectraDCIM" or "Spectra DCIM" with LinkedIn, YouTube, Reddit and Medium found no page for the product on any of them; the nearest hits were reviews of DX Spectrum (Broadcom, formerly CA Spectrum), a network monitoring and fault-management product — [PeerSpot DX Spectrum reviews](https://www.peerspot.com/products/dx-spectrum-reviews).
- Direct checks of the obvious handle (2026-11-18): `youtube.com/@spectradcim` returned 404, `github.com/spectradcim` returned 404, `x.com/spectradcim` returned 404 to a plain request; `linkedin.com/company/spectradcim`, `medium.com/@spectradcim` and Reddit returned 403 (automated requests blocked, so inconclusive) — [YouTube](https://www.youtube.com/@spectradcim), [GitHub](https://github.com/spectradcim), [LinkedIn](https://www.linkedin.com/company/spectradcim).
- Searches for a DCIM product called "Spectra" found none; DCIM results were the established vendors (Sunbird, Nlyte, Raritan Power IQ, Schneider, Vertiv) — e.g. [Sunbird "What is DCIM"](https://sunbirddcim.com/what-dcim), [Nlyte DCIM](https://nlyte.com/dcim), [Raritan DCIM software](https://www.raritan.com/products/power/dcim-software).
- Spectra Logic is an established data-storage company (tape libraries, object storage) that markets to data centres; founded 1979, Boulder, Colorado — [Enterprise Storage Forum profile](https://www.enterprisestorageforum.com/hardware/storage-company-profile-spectra-logic/); [spectralogic.com](https://spectralogic.com/features); [Carahsoft "Modern Storage for Today's Data Center"](https://carahsoft.com/spectra-logic/solutions).
- Other "Spectra"/"Spectrum" names that surfaced in data-centre-adjacent searches: SpectraSensors ([Intricately listing](https://www.intricately.com/reports/subsidiary-e68e8ece-06d7-4792-b29d-549306e4de8e)) and data-centre projects named "Spectrum" ([interconnection.fyi](https://www.interconnection.fyi/data-center/project/spectrum-af6032c4)).
- The site itself links to no social profiles, which is consistent with none existing — [Footer.astro](../../src/components/Footer.astro).

### Inferences
- The one-word spelling rule in the brief ("SpectraDCIM", not "Spectra DCIM") is also the right SEO choice: the single token is currently unique in search, while "Spectra" alone competes with Spectra Logic, DX Spectrum, Spectrum (the US cable brand) and many others. Hashtags and handles should use the one-word form.
- The handle "spectradcim" appears to be free on YouTube and GitHub (404 responses), and probably on X; LinkedIn, Medium and Reddit could not be verified by automated request and need a manual check while signed in.
- The site is not yet indexed by the search engine used (no result for brand or domain), which fits a site first deployed around 17 Nov 2026 with no sitemap, no inbound links and no social profiles.

### Gaps
- LinkedIn, Medium, Reddit, Instagram and Facebook presence could not be confirmed either way by automated requests; a manual signed-in search is needed.
- No trademark search was done (USPTO/EUIPO/UKIPO) for "SpectraDCIM" or "Spectra" in software classes; this is outside what a light web check can establish and should be done before spending on brand building.
- Search results came from a US-only search tool and a small number of queries; a competitor called "Spectra" in a regional DCIM/BMS market could exist and not have surfaced.
- I found no reliable source on whether other domain endings (for example .io, .co) of the name are registered by anyone else.
