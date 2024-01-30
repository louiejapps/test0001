function commentModal(childData) {

	event.preventDefault();

	selectedText = "";

	var counter = false;
	var modal = document.createElement('div');

	let vButton = "<button class='view-button'>VIEW HD IMAGE</button>";
	modal.innerHTML = "<center><div><p>" + "Comments" + "<br>" +
		`<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'></section></div></div>
		${vButton}
		<div style="max-height: 200px; width=100%; overflow-y: scroll;">
			<table id="comment-table" class="tbF" align="center">
				<tbody id="comment-tb"></tbody>
			</table>
		</div>
		<div style="display: flex; align-items: center;">
		<input id="comment-input"
			type="text" style="width: calc(70% - 25px); padding: 10px; margin-top: 5px; border: 1px solid #cccccc; border-radius: 5px;" maxlength='140' placeholder="Write a comment...">
		
		<button id="comment-send2"
			style="width: 50px; margin-top: 5px; margin-left: 5px; padding: 10px; background-color: #4CAF50; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;">☺️
		</button>
	
		<button id="comment-send"
			style="width: 50px; margin-top: 5px; margin-left: 5px; padding: 10px; background-color: #4CAF50; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;">▶
		</button>
	</div>					
	<div class='close-button'></div>
	
`;

	modal.style.position = 'fixed';
	modal.style.top = '36%';
	modal.style.left = '50%';
	//modal.style.width = '90vw';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.padding = '20px';
	modal.style.border = '1px #aaa';
	modal.style.borderRadius = '10px';
	modal.style.zIndex = '9999';

	// Define minimum width in pixels
	const minWidth = 330; // Adjust this value as needed

	// Check if the viewport is in landscape or portrait mode
	if (window.matchMedia("(orientation: landscape)").matches) {
		// Landscape mode (desktop)
		modal.style.width = `400px`;
	} else {
		// Portrait mode (mobile devices)
		modal.style.width = `330px`;
	}


	var closeButton = modal.querySelector('.close-button');
	closeButton.style.position = 'absolute';
	closeButton.style.top = '108%';
	closeButton.style.left = '44%';
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';
	closeButton.style.background = 'transparent'; // remove the background image property
	closeButton.innerHTML = '<div class="circle"><span><big><big>&times;</span></div>'; // wrap the X icon inside a div element with a class name for the circle
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';

	// Add overlay with grey background
	var overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
	overlay.style.zIndex = '9998';

	// Add event listener to close button
	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});


	var viewButton = modal.querySelector('.view-button');
	viewButton.style.marginTop = '5px';
	viewButton.style.marginBottom = '15px';
	viewButton.style.fontWeight = 'bold';
	viewButton.style.borderRadius = '15px';
	viewButton.style.width = '200px';


	viewButton.addEventListener('click', function () {
		openLink(childData.quote);
		modal.remove();
		overlay.remove();
	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	var commentTB = modal.querySelector('#comment-tb');

	loadComments(childData.key, commentTB);



	var commentSend = modal.querySelector('#comment-send');
	var commentInput = modal.querySelector('#comment-input');

	commentSend.addEventListener('click', function () {
		setComment(childData.key, user, commentInput.value);
		loadComments(childData.key, commentTB);
	});

	document.body.appendChild(modal);
	document.body.appendChild(overlay);

}



function reactModal(childData) {
	event.preventDefault();
	database.ref('quotes/' + childData.key).update({
		views: eval(childData.views) + eval(1)
	});

	// Create modal with delete button and close button

	selectedText = "";

	var counter = false;
	var modal = document.createElement('div');
	let myAuthor = "<b style='color:#ed4c2b;'>" + childData.uname + "</b>";
	let dButton = "<a class='delete-button'>&nbsp; Delete  &nbsp;</a>";
	let pButton = "<a class='pin-button'>&nbsp; Pin Post &nbsp;</a>";

	let rButton = `
	<table border='0' id='reactTable'>
	  <tr>
		<td><span onclick='toggleLike("loves", "${childData.key}", "${user}")'>❤️</span><br><span id='loves' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("likes", "${childData.key}", "${user}")'>👍</span><br><span id='likes' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("wows", "${childData.key}", "${user}")'>🤩</span><br><span id='wows' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("hahas", "${childData.key}", "${user}")'>😂</span><br><span id='hahas' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("frowns", "${childData.key}", "${user}")'>😥</span><br><span id='frowns' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("dislikes", "${childData.key}", "${user}")'>👎</span><br><span id='dislikes' style='font-size: 10px; color: red;'></span></td>
	  </tr>
	</table>`;

	let vButton = "<button class='view-button'>VIEW HD IMAGE</button>";
	let scaption = "<p style='white-space: pre-line;text-align:center; font-size:12px; word-wrap:break-word;padding:0px'; >" + childData.caption + "</p>"

	if (childData.pinned === false) {
		if (childData.quote === "?") {
			modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
				"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + "<button class='view-button' style='display:none;'>VIEW IMAGE</button>" + rButton + "<br>" + pButton + dButton + "<div class='close-button'></div>";
		} else {
			modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
				"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + vButton + rButton + "<br>" + pButton + dButton + "<div class='close-button'></div>";

		}
	} else {
		if (childData.quote === "?") {
			modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
				"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + "<button class='view-button' style='display:none;'>VIEW IMAGE</button>" + rButton + "<br><a class='pin-button'>Unpin Post</a><a class='delete-button' style='display:none'>Delete</a>" + "<div class='close-button'></div>";
		} else {
			modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
				"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + vButton + rButton + "<br><a class='pin-button'>Unpin Post</a><a class='delete-button' style='display:none'>Delete</a>" + "<div class='close-button'></div>";

		}
	}
	modal.style.position = 'fixed';
	modal.style.top = '36%';
	modal.style.left = '50%';
	modal.style.width = '300px';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.padding = '20px';
	modal.style.border = '1px #aaa';
	modal.style.borderRadius = '10px';
	modal.style.zIndex = '9999';

	// Style close button
	var closeButton = modal.querySelector('.close-button');
	closeButton.style.position = 'absolute';
	closeButton.style.top = '108%';
	closeButton.style.left = '44%';
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';
	closeButton.style.background = 'transparent'; // remove the background image property
	closeButton.innerHTML = '<div class="circle"><span><big><big>&times;</span></div>'; // wrap the X icon inside a div element with a class name for the circle
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';

	// Add overlay with grey background
	var overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
	overlay.style.zIndex = '9998';

	// Add event listener to close button
	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	var viewButton = modal.querySelector('.view-button');
	viewButton.style.marginTop = '5px';
	viewButton.style.marginBottom = '15px';
	viewButton.style.fontWeight = 'bold';
	viewButton.style.borderRadius = '15px';
	viewButton.style.width = '200px';

	var deleteButton = modal.querySelector('.delete-button');
	deleteButton.style.color = '#ccc';
	deleteButton.style.cursor = 'pointer';

	var pinButton = modal.querySelector('.pin-button');
	pinButton.style.color = '#ccc';
	pinButton.style.cursor = 'pointer';

	var cells = document.querySelectorAll('#myTable td');
	cells.forEach(function (cell) {
		cell.addEventListener('click', function () {
			alert('Cell clicked: ' + cell.textContent);
			console.log("ddsgsdgdsg");
			// You can replace the alert with your desired action or code
		});
	});

	viewButton.addEventListener('click', function () {
		openLink(childData.quote);
		//react
		modal.remove();
		overlay.remove();


	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	// Delete quote from database when delete button is clicked
	deleteButton.addEventListener('click', function () {

		if (!counter) {
			deleteButton.innerHTML = "&#x2713; Confirm";
			pinButton.innerHTML = "";
			counter = true;
		} else {

			database.ref('quotes/' + childData.key).remove()
				.then(() => {
					console.log("Data successfully deleted");
				})
				.catch((error) => {
					console.log("Error deleting data:", error);
				});
			modal.remove();
			overlay.remove();
			notif.style.display = "none";

		}

	});

	pinButton.addEventListener('click', function () {

		if (!counter) {
			pinButton.innerHTML = "&#x2713; Confirm";
			deleteButton.innerHTML = "";
			counter = true;
		} else {
			togglePin(childData.key);
			modal.remove();
			overlay.remove();

		}

	});

	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

	for (let i = 0; i < reactArr.length; i++) {
		getReactCount(childData.key, reactArr[i]);
	}
}

