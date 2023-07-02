---
layout: layouts/campaigns.njk
eleventyNavigation:
  key: Email Your Councillor
  parent: Campaigns
  order: 0
script: generateEmail.js
---

# Email Your Councillor

To email your councillors please select your ward from the dropdown menu below.
You can then send an email to the councillors who represent you, in your own short words, to support clean air initiatives in Brighton & Hove.
It is best to include a subject, some text and your name and address so that they know you are a constituent.

<div class="dropdown">
	<select id="wardDropdown">
		<option value="" selected disabled>Select Ward</option>
		<option value="BrunswickAdelaide">Brunswick & Adelaide</option>
		<option value="CentralHove">Central Hove</option>
		<option value="ColdeanStanmer">Coldean & Stanmer</option>
		<option value="Goldsmid">Goldsmid</option>
		<option value="HanoverElmGrove">Hanover & Elm Grove</option>
		<option value="HangletonKnoll">Hangleton & Knoll</option>
		<option value="HollingdeanFiveways">Hollingdean & Fiveways</option>
		<option value="Kemptown">Kemptown</option>
		<option value="MoulsecoombBevendean">Moulsecoomb & Bevendean</option>
		<option value="NorthPortslade">North Portslade</option>
		<option value="PrestonPark">Preston Park</option>
		<option value="QueensPark">Queen's Park</option>
		<option value="Regency">Regency</option>
		<option value="RottingdeanWestSaltdean">Rottingdean & West Saltdean</option>
		<option value="WestbournePoetsCorner">Westbourne & Poets’ Corner</option>
		<option value="WestdeneHovePark">Westdene & Hove Park</option>
		<option value="WhitehawkMarina">Whitehawk & Marina</option>
		<option value="Woodingdean">Woodingdean</option>
		<option value="Wish">Wish</option>
		<!-- Add more wards as needed -->
	</select>
</div>

<button onclick="generateEmail()">Compose Email</button>

If you are unsure of your ward, you can find out here

<a href="https://www.brighton-hove.gov.uk/council-and-democracy/councillor-ward-map" target="_blank">https://www.brighton-hove.gov.uk/council-and-democracy/councillor-ward-map</a>
