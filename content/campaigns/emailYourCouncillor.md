---
layout: layouts/campaigns.njk
eleventyNavigation:
  key: Your Councillor
  parent: Campaigns
  longTitle: Email Your Councillor
  order: 0
script: generateEmail.js
---

Our councillors make decisions that either help or hinder our efforts to improve air quality.

Why not write to your councillors and ask them to support clean air initiatives?

Use this form to find out who your councillors are and to email them.

1. Select your ward

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

2. Press the Compose Email button and write to your councillor

<button onclick="generateEmail()">Compose Email</button>

If you are unsure of your ward, you can find out here

<a href="https://www.brighton-hove.gov.uk/council-and-democracy/councillor-ward-map" target="_blank">https://www.brighton-hove.gov.uk/council-and-democracy/councillor-ward-map</a>

We have found the Labour councillors from the previous administration the least willing to engage with us on
air quality issues so if you do have a Labour councillor please do write to them and tell them how important
it is for our health to have clean air in our city.  We need to make sure that the new Labour administration
takes air quality seriously (we have been trying to get a meeting the last two months but Labour seem to
prioritise other issues).