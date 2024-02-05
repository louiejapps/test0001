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
						<div class="button-div">
							<img src="Aa_square.png" width="36px" id="toolbar-1">
						</div>
						</td>
	
						<td style="width: 7%">
						<div class="button-div">
							<img src="photos.png" width="36px" id="toolbar-2">
						</div>
						</td>
	
						<td style="width: 7%">
						<div class="button-div">
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


		</div></div>
		${vButton}
		<section style="color: #5a5a5a; font-size: 0.8em; font-weight: bold;  background-color: #f5f5f5; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; cursor: pointer;">VIEW HIGH QUALITY</section>
		<br>
		${scaption}

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
	//viewButton.style.borderRadius = '15px';
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
	  <td><div class="button-div"><span id='loves' style='font-size: 1em; font-weight: bold; color: red;' onclick='toggleLike("loves", "${childData.key}", "${user}")'>❤️</span><br></div></td>
	  <td><div class="button-div"><span id='likes' style='font-size: 1em; font-weight: bold; color: red;' onclick='toggleLike("likes", "${childData.key}", "${user}")'>👍</span></div></td>
	  <td><div class="button-div"><span id='wows' style='font-size: 1em; font-weight: bold; color: red;' onclick='toggleLike("wows", "${childData.key}", "${user}")'>🔥</span></div></td>
	  <td><div class="button-div"><span id='hahas' style='font-size: 1em; font-weight: bold; color: red;' onclick='toggleLike("hahas", "${childData.key}", "${user}")'>😂</span></div></td>
	  <td><div class="button-div"><span id='frowns' style='font-size: 1em; font-weight: bold; color: red;' onclick='toggleLike("frowns", "${childData.key}", "${user}")'>😥</span></div></td>
	  <td><div class="button-div"><span id='dislikes' style='font-size: 1em; font-weight: bold; color: red;' onclick='toggleLike("dislikes", "${childData.key}", "${user}")'>👎</span></div></td>
	  </tr>
	</table>`;

	let rButto2n = `
	<table border='0' id='reactTable'>
	  <tr>
	  <td><div class="button-div"><span onclick='toggleLike("loves", "${childData.key}", "${user}")'>❤️</span><br><span id='loves' style='font-size: 0.45em; font-weight: bold; color: red;'></span></div></td>
	  <td><div class="button-div"><span onclick='toggleLike("likes", "${childData.key}", "${user}")'>👍</span><br><span id='likes' style='font-size:  0.45em; font-weight: bold; color: red;'></span></div></td>
	  <td><div class="button-div"><span onclick='toggleLike("wows", "${childData.key}", "${user}")'>🔥</span><br><span id='wows' style='font-size:  0.45em; font-weight: bold;  color: red;'></span></div></td>
	  <td><div class="button-div"><span onclick='toggleLike("hahas", "${childData.key}", "${user}")'>😂</span><br><span id='hahas' style='font-size:  0.45em; font-weight: bold;  color: red;'></span></div></td>
	  <td><div class="button-div"><span onclick='toggleLike("frowns", "${childData.key}", "${user}")'>😥</span><br><span id='frowns' style='font-size:  0.45em; font-weight: bold;  color: red;'></span></div></td>
	  <td><div class="button-div"><span onclick='toggleLike("dislikes", "${childData.key}", "${user}")'>👎</span><br><span id='dislikes' style='font-size:  0.45em; font-weight: bold;  color: red;'></span></div></td>
	  </tr>
	</table>`;

	modal.innerHTML = `<div style="text-align:center">${rButton}
		<a class='remove-button'>Remove</a>
		<div class='close-button'>
		</div></div>`;


	modal.style.position = 'fixed';
	modal.style.top = eval(clickY - 50) + 'px';
	modal.style.left = '50%';
	modal.style.width = '330px';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.padding = '15px';
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

	var remButton = modal.querySelector('.remove-button');
	remButton.style.color = '#ccc';
	remButton.style.cursor = 'pointer';

	var cells = document.querySelectorAll('#myTable td');
	cells.forEach(function (cell) {
		cell.addEventListener('click', function () {
			alert('Cell clicked: ' + cell.textContent);
			console.log("ddsgsdgdsg");
			// You can replace the alert with your desired action or code
		});
	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	remButton.addEventListener('click', function () {
		toggleLike("", childData.key, user);
	});

	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

	firebase.database().ref(`quotes/${childData.key}/react/${user}`).once('value', function (snapshot) {
        // Get the value from the snapshot using val()
        var snapshotValue = snapshot.val();
		toggleLike(snapshotValue, childData.key, user);

        // Now, you can use snapshotValue as the data retrieved from the database
        console.log(snapshotValue);
    });
}






function menuModal(clickX, clickY, childData) {
	event.preventDefault();
	/*database.ref('quotes/' + childData.key).update({
		views: eval(childData.views) + eval(1)
	});*/

	// Create modal with delete button and close button

	var counter = false;
	var modal = document.createElement('div');
	let rButton = `
	<div id="del-post" class="button-div" style="padding:7.5px"><span id="delpost-span" style="color: #C34632; font-size:1.3em">Delete Post</span></div>
	<div id="pin-post" class="button-div" style="padding:7.5px"><span id="pinpost-span" style="color: #000; padding:10px; font-size:1.3em">Pin Post </span></div>
	<div id="rep-post"class="button-div" style="padding:7.5px"><span style="color: #000; padding:10px; font-size:1.3em">Report </span></div>
	
	`;

	modal.innerHTML = `<div style="text-align:center">${rButton}
		<div class='close-button'>
		</div></div>`;


	modal.style.position = 'fixed';
	modal.style.top = '45%';
	modal.style.left = '50%';
	modal.style.width = '300px';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.paddingTop = '25px';
	modal.style.paddingBottom = '25px';
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


	let delPost = modal.querySelector('#del-post');
	let pinPost = modal.querySelector('#pin-post');
	let repPost = modal.querySelector('#rep-post');
	let delSpan = modal.querySelector('#delpost-span');
	let pinSpan = modal.querySelector('#pinpost-span');

	if (childData.pinned) {
		delPost.style.display = 'none';
		repPost.style.display = 'none';
		pinSpan.style.color = '#C34632';
		pinSpan.innerHTML = `Unpin Post`;
	}



	delPost.addEventListener('click', function () {
		if (!counter) {
			delSpan.innerHTML = "&#x2713; Confirm Delete";
			pinPost.style.display = 'none';
			repPost.style.display = 'none';
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

	pinPost.addEventListener('click', function () {
		if (!counter) {
			if (childData.pinned) {
				pinSpan.innerHTML = `<svg width="12" height="12" fill="currentColor" class="bi bi-pin-fill" viewBox="0 0 16 16">
			<path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
		  </svg> Confirm Unpin`;
			} else {
				pinSpan.innerHTML = `<svg width="12" height="12" fill="currentColor" class="bi bi-pin-fill" viewBox="0 0 16 16">
					<path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
				  </svg> Pin Post?`;
			}
			delPost.style.display = 'none';
			repPost.style.display = 'none';
			counter = true;
		} else {
			togglePin(childData.key);
			modal.remove();
			overlay.remove();
			notif.style.display = "none";

		}
	});

	repPost.addEventListener('click', function () {

	});

	// Add event listener to close button
	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);
}