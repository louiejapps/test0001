function postModal() {
	sessionStorage.setItem("link", "?");
	sessionStorage.setItem("base64", "");
	rnum = "";

	upflag = false;
	var modal = document.createElement('div');

	let myAuthor = "<big><b style='color:#ed4c2b;'>" + "CREATE POST" + "</b></big>";
	let imgButton = "<input type='file' id='img-button' onchange='handleImage()' accept='image/*'>";
	let postButton = "<button class='view-button' id='post-button'>POST</button>";
	let htmlString = `
	<table border="0" class="tbn" align="center">
	<tr>
		<td style="text-align:left; vertical-align:middle;height: 50;padding:2px;">
		<span id="yourname" style="color: #C34632; margin-left: 10px;">Post Anonymously</span>
		</td>
	
		<td style="text-align:right; vertical-align:middle; padding:15px;">
			<label class="toggle-switch">
				<input type="checkbox" unchecked>
				<span class="slider"></span>
			</label>
		</td>
	</tr>
	
	<tr>
		<td colspan="2" style="">
			<textarea id='caption' name='caption' maxlength='320' placeholder='Write something...'></textarea>
			<div id="show-image" class="image-container" style="display:block; height:auto; width:100%">
				<div id='thumbnails' style="text-align: center;"></div>
				
			</div>
			<div id="toolbar" align="center" style="width:100%;">
				<table border="0" align="center" style="width:100%;">
					<tr>
						<td style="width: 7%">
						<div 
							onmouseover="this.style.backgroundColor='rgba(211, 211, 211, 0.7)'; this.style.transition='background-color 0.3s ease'" 
							onmouseout="this.style.backgroundColor='transparent'; this.style.transition='background-color 0.3s ease'"
							ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
							ontouchend="this.style.backgroundColor='transparent';" 
							style="background-color: transparent; padding: 2.5px; margin-right: 5px; cursor: pointer; color: #65676b; font-weight: bold;">
								<img src="Aa_square.png" width="36px" id="toolbar-1">
						</div>
						</td>
	
						<td style="width: 7%">
						<div 
							onmouseover="this.style.backgroundColor='rgba(211, 211, 211, 0.7)'; this.style.transition='background-color 0.3s ease'" 
							onmouseout="this.style.backgroundColor='transparent'; this.style.transition='background-color 0.3s ease'"
							ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
							ontouchend="this.style.backgroundColor='transparent';" 
							style="background-color: transparent; padding: 2.5px; margin-right: 5px; cursor: pointer; color: #65676b; font-weight: bold;">
								<img src="photos.png" width="36px" id="toolbar-2">
						</div>
						</td>
	
						<td style="width: 7%">
						<div 
							onmouseover="this.style.backgroundColor='rgba(211, 211, 211, 0.7)'; this.style.transition='background-color 0.3s ease'" 
							onmouseout="this.style.backgroundColor='transparent'; this.style.transition='background-color 0.3s ease'"
							ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
							ontouchend="this.style.backgroundColor='transparent';" 
							style="background-color: transparent; padding: 2.5px; margin-right: 5px; cursor: pointer; color: #65676b; font-weight: bold;">
								<img src="linkurl.png" width="36px" id="toolbar-3">
						</div>
						</td>
	
						<td style="width: auto">
							<div style="text-align:right;display: none;" id="toolbar-4">
								<img src="reset.png" width="35px">
							</div>
						</td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
	</table>`;
	modal.innerHTML = "<center><div><p>" + myAuthor + "" +
		"</div></div>" + imgButton + htmlString + postButton + "<div class='close-button'></div>";

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
		modal.style.width = `max(30%, ${minWidth}px)`;
	} else {
		// Portrait mode (mobile devices)
		modal.style.width = `max(90%, ${minWidth}px)`;
	}

	var captionArea = modal.querySelector('#caption');


	var closeButton = modal.querySelector('.close-button');
	closeButton.style.cssText = `
    	position: absolute;
    	top: 108%;
    	left: 44%;
    	font-size: 35px;
    	cursor: pointer;
    	background: transparent;
    	font-size: 35px;
    	cursor: pointer;`;
	closeButton.innerHTML = '<div class="circle"><span><big><big>&times;</span></div>';

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	var overlay = document.createElement('div');
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.85);
		z-index: 9998;
	`;

	let posButton = modal.querySelector('#post-button');
	posButton.style.cssText = `
		margin-top: 10px;
		margin-bottom: 15px;
		font-weight: bold;
		border-radius: 15px;
		width: 100%;
	`;
	posButton.disabled = true;

	let toolbar1 = modal.querySelector('#toolbar-1');
	let toolbar2 = modal.querySelector('#toolbar-2');
	let toolbar3 = modal.querySelector('#toolbar-3');
	let toolbar4 = modal.querySelector('#toolbar-4');

	toolbar1.addEventListener('click', function (event) {
		rnum = randomNum(0, (gradients.length - 1));
		captionArea.style.paddingTop = "80px";
		captionArea.style.paddingBottom = "80px";
		captionArea.style.fontSize = "1.5rem";
		captionArea.style.textAlign = "center";
		captionArea.style.background = gradients[rnum];
		captionArea.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.4)";
		captionArea.style.color = "#fff";
		captionArea.style.height = "auto";
		captionArea.style.height = `${quoteTextarea.scrollHeight + 200}px`;
		//toolbar4.style.display = 'block';
		toolbar2.style.display = 'none';
		toolbar3.style.display = 'none';
	});

	toolbar2.addEventListener('click', function () {
		captionArea.style.cssText = `
		padding-top: "";
		padding-bottom: "";
		font-size: "";
		font-weight: "";
		text-align: "";
		background: "";
		text-shadow: "";
		color: "";
		height: 10px;
	`;
		selectFile();

	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

	//POSTBUTTON
	//POSTBUTTON

	posButton.addEventListener('click', function () {

		let bkg = "";

		if (rnum === "") {
			bkg = "";
		} else {
			bkg = gradients[rnum];
		}

		if (sessionStorage.getItem("link") === "?") {
			if (saveData("?", user, "?", Textarea.value, bkg)) {
				modal.remove();
				overlay.remove();
			}
		} else {
			if (saveData(sessionStorage.getItem("link"), user, sessionStorage.getItem("base64"), Textarea.value, null)) {
				modal.remove();
				overlay.remove();
			}
		}
	});

	var Textarea = document.querySelector('#caption');

	Textarea.addEventListener('input', function () {
		// Check if the textarea is not empty
		if (Textarea.value.trim() !== '') {
			// Enable the button
			posButton.disabled = false;
		} else {
			// Disable the button if the textarea is empty
			posButton.disabled = true;
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function commentModal(childData) {

	event.preventDefault();

	selectedText = "";

	var counter = false;
	var modal = document.createElement('div');

	let vButton = `<div class="img-container">
    				<img class="view-button" src="${childData.thumbnail}" alt="Description of the image">
				</div>`;
	let scaption = `<span style='white-space: pre-line;text-align:center; font-size:0.9em; font-weight:bold; word-wrap:break-word;margin:2.5px'; >${childData.caption}</span>`;

	modal.innerHTML = `<center><div>
		<span style='color:#de3c35; white-space: pre-line;text-align:center; font-size:0.95em; font-weight:bold; word-wrap:break-word;margin:2.5px'; >COMMENTS</span>
		<br>
		<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'></section></div></div>
		${vButton}${scaption}
		<div style="max-height: 200px; width=100%; margin-top:7.5px; overflow-y: scroll;">
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
	modal.style.top = '41%';
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
	closeButton.style.top = '103%';
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
	var imgContainer = modal.querySelector('.img-container'); // Make sure to add a class 'container' to your container div

	viewButton.style.marginTop = '5px';
	viewButton.style.marginBottom = '5px';
	viewButton.style.fontWeight = 'bold';
	viewButton.style.borderRadius = '15px';
	viewButton.style.width = '100%';
	viewButton.style.height = '100%';
	viewButton.style.objectFit = 'cover'; // This will apply the cropping effect

	imgContainer.style.width = '290px'; // Set the width of your container
	imgContainer.style.height = '200px'; // Set the height of your container
	imgContainer.style.marginTop = '5px';
	imgContainer.style.marginBottom = '5px';
	imgContainer.style.overflow = 'hidden'; // Ensure content outside the container is hidden


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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function reactModal(clickX, clickY, childData) {
	event.preventDefault();
	/*database.ref('quotes/' + childData.key).update({
		views: eval(childData.views) + eval(1)
	});*/

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
		<td><span onclick='toggleLike("wows", "${childData.key}", "${user}")'>🔥</span><br><span id='wows' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("hahas", "${childData.key}", "${user}")'>😂</span><br><span id='hahas' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("frowns", "${childData.key}", "${user}")'>😥</span><br><span id='frowns' style='font-size: 10px; color: red;'></span></td>
		<td><span onclick='toggleLike("dislikes", "${childData.key}", "${user}")'>👎</span><br><span id='dislikes' style='font-size: 10px; color: red;'></span></td>
	  </tr>
	</table>`;

	let vButton = `<img class="view-button" src="${childData.thumbnail}" alt="Description of the image">`;
	let scaption = "<p style='white-space: pre-line;text-align:center; font-size:12px; word-wrap:break-word;padding:0px'; >" + childData.caption + "</p>"


	modal.innerHTML = "<center><div><p>" + "<br>" +
		"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + "</section></div></div>" + vButton + rButton + "<br><a class='pin-button'>Unpin Post</a><a class='delete-button' style='display:none'>Delete</a>" + "<div class='close-button'></div>";


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
	viewButton.style.maxWidth = '300px';
	viewButton.style.maxHeight = '200px';
	viewButton.style.display = 'none';

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

