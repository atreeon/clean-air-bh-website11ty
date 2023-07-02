function generateEmail() {
	var wardDropdown = document.getElementById("wardDropdown");
	var selectedWard = wardDropdown.value;

	if (selectedWard) {
		var councillorEmail = getCouncillorEmail(selectedWard);

		if (councillorEmail) {
			var subject = "";
			var body = "";

			// Customize the email body as needed

			// Open the default email client with the draft email
			window.location.href = "mailto:" + councillorEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
		} else {
			alert("No councillor email found for the selected ward.");
		}
	} else {
		alert("Please select a ward from the dropdown.");
	}
}

function getCouncillorEmail(ward) {
	var councillorEmails = {
		BrunswickAdelaide: "Andrei.Czolak@brighton-hove.gov.uk, Jilly.Stevens@brighton-hove.gov.uk",
		CentralHove: "Emma.Daniel@brighton-hove.gov.uk, Joy.Robinson@brighton-hove.gov.uk",
		ColdeanStanmer: "Mitchie.Alexander@brighton-hove.gov.uk, Tobias.Sheard@brighton-hove.gov.uk",
		Goldsmid: "Birgit.Miller@brighton-hove.gov.uk, Trevor.Muten@brighton-hove.gov.uk, Jackie.OQuinn@brighton-hove.gov.uk",
		HanoverElmGrove: "Ty.Galvin@brighton-hove.gov.uk, Tim.Rowkins@brighton-hove.gov.uk, Maureen.Winder@brighton-hove.gov.uk",
		HangletonKnoll: "Faiza.Baghoth@brighton-hove.gov.uk, Amanda.Grimshaw@brighton-hove.gov.uk, John.Hewitt@brighton-hove.gov.uk",
		HollingdeanFiveways: "Mohammed.Asaduzzaman@brighton-hove.gov.uk, Theresa.Fowler@brighton-hove.gov.uk, Bruno.DeOliveira@brighton-hove.gov.uk",
		Kemptown: "Bharti.Gajjar@brighton-hove.gov.uk, Gary.Wilkinson@brighton-hove.gov.uk",
		MoulsecoombBevendean: "Amanda.Evans@brighton-hove.gov.uk, Ty.Goddard@brighton-hove.gov.uk, Jacob.Taylor@brighton-hove.gov.uk",
		NorthPortslade: "Peter.Atkinson@brighton-hove.gov.uk, Lucy.Helliwell@brighton-hove.gov.uk",
		PrestonPark: "Steve.Davis@brighton-hove.gov.uk, Liz.Loughran@brighton-hove.gov.uk, Kerry.Pickett@brighton-hove.gov.uk",
		QueensPark: "Tristram.Burden@brighton-hove.gov.uk, Chandni.Mistry@brighton-hove.gov.uk",
		Regency: "Chloe.Goldsmith@brighton-hove.gov.uk, Alison.Thomson@brighton-hove.gov.uk",
		RottingdeanWestSaltdean: "Mark.Earthey@brighton-hove.gov.uk, Bridget.Fishleigh@brighton-hove.gov.uk",
		WestbournePoetsCorner: "Julie.Cattell@brighton-hove.gov.uk, Leslie.Pumm@brighton-hove.gov.uk",
		WestdeneHovePark: "Samer.Bagaeen@brighton-hove.gov.uk, Emma.Hogan@brighton-hove.gov.uk, Ivan.Lyons@brighton-hove.gov.uk",
		WhitehawkMarina: "David.McGregor@brighton-hove.gov.uk, Gill.Williams@brighton-hove.gov.uk",
		Woodingdean: "Jacob.Allen@brighton-hove.gov.uk, Jacqui.Simon@brighton-hove.gov.uk",
		Wish: "Paul.Nann@brighton-hove.gov.uk, Bella.Sankey@brighton-hove.gov.uk",
	};

	return councillorEmails[ward];
}
