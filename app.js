// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyD7156apCcrJnRX9cP8KSazMbILNJgKEt0",
	authDomain: "lois-files.firebaseapp.com",
	projectId: "lois-files",
	databaseURL: "https://lois-files-default-rtdb.asia-southeast1.firebasedatabase.app/",
	storageBucket: "lois-files.appspot.com",
	messagingSenderId: "294529638144",
	appId: "1:294529638144:web:f2c2c504d1ed9a12641de5"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

window.onload = function () {
	postFrom.reset();
	authorInput.disabled = true;
	setTimeout(function () {
		window.scrollTo(0, 0);
	}, 0);
}

const internetTime = Date.now();
var items = 10;
var database = firebase.database();
var urltext = "";
var posttext = "";
var selectedText = "";
var rnum = "";


let user = "";
const name = "";
let uarray = ['Frenzo125', 'Fenimaure', 'FindingXY', 'ZzenN', 'Pennyclied30', 'Coolbookkeeper7', 'Jolyows', 'XtreamCH', 'ZzzChizCurlzzZ', 'JellyMuse', 'lystar', '8seven3', 'Bradford', 'Metsuki', 'mjba4w'];
/*
var usersRef = database.ref('users');

// Fetch data from the 'users' node
usersRef.once('value').then(function (snapshot) {
	snapshot.forEach(function (childSnapshot) {
		var userData = childSnapshot.val();
		var username = userData.username;
		var photo = userData.photo;

		// Add username to the array
		uarray.push(username);

		// Populate the hashmap with username and corresponding photo URL
		profileHashMap[username] = photo;
	});

	var userInput = randomNum(0, (uarray.length - 1));
	user = uarray[parseInt(userInput)];

}).catch(function (error) {
	console.error('Error fetching data:', error);
});

console.log(uarray);
*/

var userInput = randomNum(0, (uarray.length - 1));
user = uarray[parseInt(userInput)];

localStorage.setItem("data", internetTime);
sessionStorage.setItem("link", "?");
sessionStorage.setItem("base64", "");
var upflag = false;

const headerImage = document.querySelector("#header-image");
const loading = document.querySelector("#loading-page");
loading.style.display = "block";
headerImage.src = imageHeader;
//previewImage.src = imageURL;

var childNum = 0;


loadDatabase(items, "", true, pinTableBody);
loadDatabase(items, "", false, quoteTableBody);


const reactArr = ["loves", "likes", "wows", "hahas", "frowns", "dislikes"];

// Reference to the 'users' node in your database


database.ref('quotes').once('value')
	.then((snapshot) => {
		childNum = snapshot.numChildren();
	})
	.catch((error) => {
		console.log("Error retrieving data:", error);
	});

let inputChanged = false;
let more_toggle = false;

function resetPage() {
	location.reload();
	window.location.href = "#top";
	postFrom.reset();
}


showFormButton.addEventListener('click', function () {
	postModal();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


searchBt.addEventListener('click', function () {
	var sk = document.getElementById("search-in").value;
	moreButton.innerHTML = "<b>END OF SEARCH RESULTS</b>";
	more_toggle = true;
	showFormButton.innerHTML = "<b>Search results for \"" + sk + "\"</b>";
	window.location.href = "#top";
	column1.style.backgroundColor = "#f2cbc1";
	loadDatabase(1000, sk, false);
	document.getElementById("search-in").value = "";
});

function openLink(url) {
	window.open(url);
}


window.addEventListener('beforeunload', function (e) {
	if (inputChanged) {
		e.preventDefault();
		e.returnValue = '';
	}
});


moreButton.addEventListener('click', function () {


	if (more_toggle) {
		window.location.href = "#top";
		location.reload();
	} else {
		items += 9;

		loadDatabase(items, "", false, quoteTableBody);
		if (childNum <= items) {

		}

	}
});

function checkRegex() {
	let text = quoteTextarea.value;
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const urls = text.match(urlRegex);
	const validUrlRegex = /^https?:\/\/shp\.ee\/.*$/;

	if (urls && urls.length > 0) {
		for (const url of urls) {
			if (validUrlRegex.test(url)) {
				showImage.style.display = "block";
				toolBar.style.display = "none";
				urltext = url;
				posttext = quoteTextarea.value.replace(urlRegex, '<a>$1</a>');
			} else {
				if (window.getComputedStyle(toolbarUrl).display === "none") {
					showImage.style.display = "none";
					toolBar.style.display = "block";
				}
			}
		}
	} else {
		if (window.getComputedStyle(toolbarUrl).display === "none") {
			showImage.style.display = "none";
			toolBar.style.display = "block";
		}
	}
}

/*                                                                                                                          
UUUUUUUU     UUUUUUUUPPPPPPPPPPPPPPPPP   LLLLLLLLLLL                  OOOOOOOOO                 AAA               DDDDDDDDDDDDD        
U::::::U     U::::::UP::::::::::::::::P  L:::::::::L                OO:::::::::OO              A:::A              D::::::::::::DDD     
U::::::U     U::::::UP::::::PPPPPP:::::P L:::::::::L              OO:::::::::::::OO           A:::::A             D:::::::::::::::DD   
UU:::::U     U:::::UUPP:::::P     P:::::PLL:::::::LL             O:::::::OOO:::::::O         A:::::::A            DDD:::::DDDDD:::::D  
 U:::::U     U:::::U   P::::P     P:::::P  L:::::L               O::::::O   O::::::O        A:::::::::A             D:::::D    D:::::D 
 U:::::D     D:::::U   P::::P     P:::::P  L:::::L               O:::::O     O:::::O       A:::::A:::::A            D:::::D     D:::::D
 U:::::D     D:::::U   P::::PPPPPP:::::P   L:::::L               O:::::O     O:::::O      A:::::A A:::::A           D:::::D     D:::::D
 U:::::D     D:::::U   P:::::::::::::PP    L:::::L               O:::::O     O:::::O     A:::::A   A:::::A          D:::::D     D:::::D
 U:::::D     D:::::U   P::::PPPPPPPPP      L:::::L               O:::::O     O:::::O    A:::::A     A:::::A         D:::::D     D:::::D
 U:::::D     D:::::U   P::::P              L:::::L               O:::::O     O:::::O   A:::::AAAAAAAAA:::::A        D:::::D     D:::::D
 U:::::D     D:::::U   P::::P              L:::::L               O:::::O     O:::::O  A:::::::::::::::::::::A       D:::::D     D:::::D
 U::::::U   U::::::U   P::::P              L:::::L         LLLLLLO::::::O   O::::::O A:::::AAAAAAAAAAAAA:::::A      D:::::D    D:::::D 
 U:::::::UUU:::::::U PP::::::PP          LL:::::::LLLLLLLLL:::::LO:::::::OOO:::::::OA:::::A             A:::::A   DDD:::::DDDDD:::::D  
  UU:::::::::::::UU  P::::::::P          L::::::::::::::::::::::L OO:::::::::::::OOA:::::A               A:::::A  D:::::::::::::::DD   
	UU:::::::::UU    P::::::::P          L::::::::::::::::::::::L   OO:::::::::OO A:::::A                 A:::::A D::::::::::::DDD     
	  UUUUUUUUU      PPPPPPPPPP          LLLLLLLLLLLLLLLLLLLLLLLL     OOOOOOOOO  AAAAAAA                   AAAAAAADDDDDDDDDDDDD        
*/


function uploadImages() {

	const theToolbar = document.getElementById('toolbar');
	const imageInput = document.getElementById('img-button');
	const files = imageInput.files;
	const thumbnailsDiv = document.getElementById('thumbnails');
	const posButton = document.getElementById('post-button');;

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const storageRef = storage.ref('images/' + file.name);
		const task = storageRef.put(file);

		// Create a container for each image
		const imageContainer = document.createElement('div');
		thumbnailsDiv.appendChild(imageContainer);

		task.on(
			'state_changed',
			snapshot => {
				// Calculate the upload percentage
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				// Update the container with the upload percentage

				theToolbar.style.display = 'none';
				imageContainer.innerHTML = '<strong>Uploading: ' + Math.round(progress) + '%</strong>';
			},
			error => {
				console.error('Upload failed:', error);
			},
			() => {
				// Upload is complete, now add the image to the thumbnails
				storageRef.getDownloadURL().then(downloadURL => {
					// Create thumbnail image element
					const thumbnail = document.createElement('img');
					thumbnail.src = sessionStorage.getItem("base64");;
					thumbnail.style.maxHeight = "200px";
					thumbnail.style.maxWidth = "300px";
					thumbnail.style.margin = '1px';

					// Create link for download
					const downloadLink = document.createElement('a');
					downloadLink.href = downloadURL;
					downloadLink.download = file.name;
					downloadLink.appendChild(thumbnail);

					// Clear the container and append the thumbnail
					imageContainer.innerHTML = '';
					imageContainer.appendChild(thumbnail);
					posButton.disabled = false;
					sessionStorage.setItem("link", downloadURL);

					console.log(sessionStorage.getItem("link"));
				}).catch(error => {
					console.error('Failed to get download URL:', error);
				});
			}
		);
	}
}

function selectFile() {
	const fileInput = document.getElementById('img-button');

	fileInput.addEventListener('change', function handleFileChange() {
		// Remove the event listener to prevent further changes
		fileInput.removeEventListener('change', handleFileChange);

		// The user selected a file
		if (upflag === false) {

			uploadImages();
			upflag = true;
		} else {
			console.log(upflag);
		}
	});

	fileInput.click();
}

function imageLoaded() {
	const image = document.getElementById("load-image");
	const loadingText = document.querySelector(".loading-text");

	image.onload = function () {
		// When the image is loaded, display it and hide the loading text
		image.style.display = "block";
		loadingText.style.display = "none";
	};
}


function getSelectedText() {
	// Get the selected text and store it in the variable
	selectedText = window.getSelection().toString();
}

function limitCharacters(inputString, maxLength) {
	let trimmedString = inputString.trim();

	if (trimmedString.length > maxLength) {
		return trimmedString.substring(0, maxLength);
	} else {
		return trimmedString;
	}
}

function handleImage() {
	const input = document.getElementById('img-button');
	const file = input.files[0];

	if (file) {
		const reader = new FileReader();

		reader.onload = function (e) {
			const img = new Image();
			img.src = e.target.result;

			img.onload = function () {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Set the maximum dimensions
				const maxWidth = 700;
				const maxHeight = 500;

				// Calculate the new dimensions
				let newWidth, newHeight;
				if (img.width > img.height) {
					newWidth = maxWidth;
					newHeight = (img.height * maxWidth) / img.width;
				} else {
					newWidth = (img.width * maxHeight) / img.height;
					newHeight = maxHeight;
				}

				// Set canvas dimensions
				canvas.width = newWidth;
				canvas.height = newHeight;

				// Draw the image on the canvas
				ctx.drawImage(img, 0, 0, newWidth, newHeight);

				// Get base64 representation
				const base64 = canvas.toDataURL('image/webp', 0.5); // Adjust the format as needed

				// Log or use the base64 string
				//console.log("Base64 Image:", base64);
				sessionStorage.setItem("base64", base64);
			};
		};

		reader.readAsDataURL(file);
	}
}


/*                                                                                                        
LLLLLLLLLLL                  OOOOOOOOO                    AAA               DDDDDDDDDDDDD        DDDDDDDDDDDDD        BBBBBBBBBBBBBBBBB   
L:::::::::L                OO:::::::::OO                 A:::A              D::::::::::::DDD     D::::::::::::DDD     B::::::::::::::::B  
L:::::::::L              OO:::::::::::::OO              A:::::A             D:::::::::::::::DD   D:::::::::::::::DD   B::::::BBBBBB:::::B 
LL:::::::LL             O:::::::OOO:::::::O            A:::::::A            DDD:::::DDDDD:::::D  DDD:::::DDDDD:::::D  BB:::::B     B:::::B
  L:::::L               O::::::O   O::::::O           A:::::::::A             D:::::D    D:::::D   D:::::D    D:::::D   B::::B     B:::::B
  L:::::L               O:::::O     O:::::O          A:::::A:::::A            D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L               O:::::O     O:::::O         A:::::A A:::::A           D:::::D     D:::::D  D:::::D     D:::::D  B::::BBBBBB:::::B 
  L:::::L               O:::::O     O:::::O        A:::::A   A:::::A          D:::::D     D:::::D  D:::::D     D:::::D  B:::::::::::::BB  
  L:::::L               O:::::O     O:::::O       A:::::A     A:::::A         D:::::D     D:::::D  D:::::D     D:::::D  B::::BBBBBB:::::B 
  L:::::L               O:::::O     O:::::O      A:::::AAAAAAAAA:::::A        D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L               O:::::O     O:::::O     A:::::::::::::::::::::A       D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L         LLLLLLO::::::O   O::::::O    A:::::AAAAAAAAAAAAA:::::A      D:::::D    D:::::D   D:::::D    D:::::D   B::::B     B:::::B
LL:::::::LLLLLLLLL:::::LO:::::::OOO:::::::O   A:::::A             A:::::A   DDD:::::DDDDD:::::D  DDD:::::DDDDD:::::D  BB:::::BBBBBB::::::B
L::::::::::::::::::::::L OO:::::::::::::OO   A:::::A               A:::::A  D:::::::::::::::DD   D:::::::::::::::DD   B:::::::::::::::::B 
L::::::::::::::::::::::L   OO:::::::::OO    A:::::A                 A:::::A D::::::::::::DDD     D::::::::::::DDD     B::::::::::::::::B  
LLLLLLLLLLLLLLLLLLLLLLLL     OOOOOOOOO     AAAAAAA                   AAAAAAADDDDDDDDDDDDD        DDDDDDDDDDDDD        BBBBBBBBBBBBBBBBB   
*/


function loadDatabase(itemCount, searchkey, pin, tablebody) {

	let dbRef = "";
	if (searchkey === "") {
		dbRef = database.ref('quotes').orderByChild('pinned').equalTo(pin).limitToLast(itemCount);
	} else {
		dbRef = database.ref('quotes').orderByChild('timestamp').limitToLast(itemCount);
	}

	
	  
	dbRef.on('value', function (snapshot) {
		// Clear existing table rows  

		postHeader = "";
		if (tablebody === quoteTableBody) {
			postHeader = "Feed";
		} else {
			postHeader = "Pinned Post";
		}

		tablebody.innerHTML = `<br><span style="text-align: left;font-weight: bold;font-size: 0.9em;">${postHeader}</span>`;

		// Generate new table rows in reverse order
		var quotes = [];
		snapshot.forEach(function (childSnapshot) {
			var childData = childSnapshot.val();
			childData.key = childSnapshot.key;

			if (((childData.hasOwnProperty('uname') && childData.uname.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('quote') && childData.quote.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('title') && childData.title.indexOf(searchkey) !== -1))) {
				quotes.push(childData);
			}
		});

		quotes.reverse(); // Reverse the order of the quotes
		quotes.forEach(function (childData) {
			var rrow = document.createElement('tr');
			let divStyle = "";
			let bkgStyle = "background-color: rgba(255, 255, 255, 0.8);";
			let borderStyle = "lightgrey";

			divStyle = `<td style='padding-top: 7.5px;padding-bottom: 7.5px;'>
			<div id = 'rdiv' style='${bkgStyle}; padding-top:2.5px; padding-bottom:2.5px; border: solid 0px ${borderStyle};'>`;

			let myAuthor = "";
			let indicator = "";
			let userSpan = `<span style="color: #de3c35;font-size:0.8em;font-weight:bold;">${childData.uname} </span>`;
			myAuthor = `${userSpan} ${indicator}`;


			let myViews = childData.views + " Seen" + (eval(childData.views) == 1 ? "" : "s");
			let myQuote = "";
			let myCaption = "";

			if (childData.quote === "?") {
				if (childData.hasOwnProperty('caption')) {

					let myBackground = "";

					let fontSize = (childData.caption.length < 160) ? "font-size:1.5em" : "font-size:1.2em";


					if (childData.background === "") {
						myBackground = "" + ";white-space: pre-line;text-align:center; font-weight: normal;word-wrap:break-word;padding:10px;font-size:1.1em'"
					} else {
						myBackground = childData.background + ";text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); color: #fff;white-space: pre-line;text-align:center; font-weight: bold;" + fontSize + "; word-wrap:break-word;padding:100px; font-family: sans-serif'";
					}



					myCaption = "<p style='background:" + myBackground + ">" + childData.caption + "</p>";


				}
				//myQuote = "<img src='" + imageURL + "' alt='Cannot load image 😓' id='load-image' style='width: 100%;'>";
			} else {
				myQuote = "<center><img src='" + childData.thumbnail + "' alt='Cannot load image 😓' id='load-image'  style='max-width: 100%;max-height:400px'  style='display: none;' onload='imageLoaded()'><div class='loading-text' style='display:none'>Loadfddfdffddfdfding...</div></center>";
				if (childData.hasOwnProperty('caption')) {
					if (childData.caption === "") {
						myCaption = "";
					} else {
						myCaption = "<section style='white-space: pre-line;text-align:center; font-size:0.9em; font-weight:bold; word-wrap:break-word;padding:2.5px;'>" + childData.caption + "</section>";
					}
				}

			}
			let myTime = getTimeString(childData.timestamp);

			let dotsMenu = "";

			if (!childData.pinned) {
				dotsMenu = `
				<!-- Icons section -->
				<div id="menu-options" class="button-div" style="margin-right:10px" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
				ontouchend="this.style.backgroundColor='transparent';">
					<svg width="16" height="16" fill="currentColor"
						class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
						<path
							d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
					</svg>
				</div>
				`
			} else {
				dotsMenu = `
				<!-- Icons section -->
				<div id="menu-options" class="button-div" style="margin-right:10px">
				<svg width="16" height="16" fill="currentColor" class="bi bi-pin-fill" viewBox="0 0 16 16">
				<path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354" style="fill: #C34632"/>
			</svg>
			
				</div>
				`
			}

			/////////////////////////////////////////////////////////
			var tableHTML = `
			<div style="display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 5px;">

			<div>
				<table style='margin:7px'>
					<tr>
						<td rowspan='2' style='text-align:center;'>
							<img src='${profileHashMap[childData.uname]}' alt='Profile Image' width='32'
								style='border-radius: 50%;'>
						</td>
						<td>
							<span style='color:#ed4c2b;font-size: 18px'>${myAuthor}</span>
						</td>
					</tr>
					<tr>
						<td><span style='color:#808080;word-wrap: break-word;font-size: 12px'>${myTime}</span></td>
					</tr>
				</table>
			</div>
	
${dotsMenu}
		</div>
			`;

			const reactionMap = {
				loves: getReactCount(childData.key, "loves"),
				likes: getReactCount(childData.key, "likes"),
				wows: getReactCount(childData.key, "wows"),
				hahas: getReactCount(childData.key, "hahas"),
				frowns: getReactCount(childData.key, "frowns"),
				dislikes: getReactCount(childData.key, "dislikes"),
				views: 1,
				comments: 1
			  };

			let rowData = `
			${divStyle}
			${tableHTML}
			${myQuote}
			${myCaption}

			<hr>
			
			${generateReactionHTML(reactionMap)}
			
			<div style='height:auto; margin-top:5px'>

				<span style="color: #008ba3; font-size: 0.7em; display: flex; align-items: center;">

					<span style="width: 100%; display: inline-block; text-align: center;">
						<div id="react-div" onmouseover="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';
							this.style.transition='background-color 0.3s ease'" onmouseout="this.style.backgroundColor='transparent';
							this.style.transition='background-color 0.3s ease'"	
							ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
							ontouchend="this.style.backgroundColor='transparent';" 
							style="background-color: transparent; padding: 10px; margin-right: 5px; cursor: pointer; color: #65676b;
							font-weight: bold; vertical-align: middle;">
								<svg width="16" height="16" viewBox="0 0 32 32" fill="none"  style="vertical-align: middle;"xmlns="http://www.w3.org/2000/svg">
									<path d="M5.99987 6.00001C10.6646 3.66763 14.4999 6.50001 15.9999 8.50001C17.4999 6.5 21.3351 3.66763 25.9999 6.00001C31.9999 8.99999 30.4998 16.5 25.9998 21C23.8041 23.1958 19.9371 27.0628 17.1087 29.2137C16.4552 29.7106 15.5614 29.6884 14.9226 29.1728C12.3299 27.08 8.16491 23.165 5.99987 21C1.49986 16.5 -0.000126839 8.99999 5.99987 6.00001Z" fill="#F8312F"/>
									<path d="M15.9998 8.49998V11.5492C17.2695 8.86501 20.4252 5.28051 25.6578 5.83746C21.1482 3.80623 17.463 6.54908 15.9998 8.49998Z" fill="#CA0B4A"/>
									<path d="M11.9456 5.53691C10.2614 4.95005 8.22499 4.88745 5.99987 6.00001C-0.000126839 8.99999 1.49986 16.5 5.99987 21C8.16491 23.165 12.3299 27.08 14.9226 29.1728C15.5614 29.6884 16.4552 29.7106 17.1087 29.2137C17.3629 29.0204 17.6255 28.8132 17.8945 28.5946C15.0398 26.4524 11.0335 23.0762 8.85898 21.1325C3.90218 16.702 2.24993 9.31788 8.85898 6.36425C9.93279 5.88435 10.9667 5.62654 11.9456 5.53691Z" fill="#CA0B4A"/>
									<ellipse cx="23.4771" cy="12.5937" rx="2.83554" ry="4.78125" transform="rotate(30 23.4771 12.5937)" fill="#F37366"/>
								</svg>
									React</div>
					</span>
			
					<span style="width: 100%; display: inline-block; text-align: center; vertical-align: middle; ">					
							<div id="comment-div" onmouseover="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';
							this.style.transition='background-color 0.3s ease'" onmouseout="this.style.backgroundColor='transparent';
							this.style.transition='background-color 0.3s ease'"
							ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
							ontouchend="this.style.backgroundColor='transparent';" 
							style="background-color: transparent; padding: 10px; cursor: pointer; color: #65676b;
							font-weight: bold; vertical-align: middle;">
								<svg width="16" height="16" viewBox="0 0 32 32" fill="none"  style="vertical-align: middle;"xmlns="http://www.w3.org/2000/svg">
									<path d="M16.0278 4C8.16615 4 3.53108 9.75575 1.66714 12.7026C0.772249 14.1175 0.772247 15.8825 1.66714 17.2974C3.53108 20.2442 8.16615 26 16.0278 26C17.2577 26 18.413 25.8582 19.4936 25.6063L23.8434 27.8365C24.8416 28.3483 26.0278 27.6235 26.0278 26.5017V22.3015C28.083 20.6044 29.5201 18.6702 30.3884 17.2974C31.2833 15.8825 31.2833 14.1175 30.3884 12.7026C28.5245 9.75575 23.8894 4 16.0278 4Z" fill="#9B9B9B"/>
									<path d="M24.2997 26.9467L19.6172 24.5458C18.5104 24.8344 17.3146 25 16.0278 25C8.70189 25 4.32778 19.6331 2.51227 16.7628C1.82387 15.6744 1.82387 14.3256 2.51228 13.2372C4.32778 10.3669 8.7019 5 16.0278 5C23.3537 5 27.7278 10.3669 29.5433 13.2372C30.2317 14.3256 30.2317 15.6744 29.5433 16.7628C28.6595 18.16 27.1695 20.1489 25.0278 21.8222V26.5017C25.0278 26.8757 24.6324 27.1173 24.2997 26.9467Z" fill="white"/>
								</svg>
									Comment
							</div>
					</span>
		
				</span>
		
			</div>
			</td>`;

			rrow.innerHTML = rowData;


			/////////////////////////////////////////////////////////

			tablebody.appendChild(rrow);

			rrow.querySelector(`#menu-options`).addEventListener("click", function (event) {
				var clickX = event.clientX;
				var clickY = event.clientY;
				menuModal(clickX, clickY, childData);
			});

			rrow.querySelector(`#react-div`).addEventListener("click", function (event) {
				var clickX = event.clientX;
				var clickY = event.clientY;
				reactModal(clickX, clickY, childData);
			});

			rrow.querySelector(`#comment-div`).addEventListener("click", function () {
				commentModal(childData);
			});
			document.title = "Liszt | " + user;

			loading.style.display = 'none';

		});

	}, function (error) {
		console.error("Failed to retrieve quotes:", error);
		if (error.code === "PERMISSION_DENIED") {
			//alert("You don't have permission to save quotes.");
			notif.innerHTML = "Database is locked";
		} else if (error.code === "NETWORK_ERROR") {
			//alert("No internet connection. Please check your network settings and try again.");
			notif.innerHTML = "No internet connection.";
		} else {
			//alert("Failed to save quote. Please try again later.");
			notif.innerHTML = "Failed to save link.";
		}
	});


}


/*                                                                                                                                                       
																							dddddddd                                                           
																							d::::::d                           tttt                            
																							d::::::d                        ttt:::t                            
																							d::::::d                        t:::::t                            
																							d:::::d                         t:::::t                            
	ssssssssss     aaaaaaaaaaaaa   vvvvvvv           vvvvvvv    eeeeeeeeeeee        ddddddddd:::::d   aaaaaaaaaaaaa   ttttttt:::::ttttttt      aaaaaaaaaaaaa   
  ss::::::::::s    a::::::::::::a   v:::::v         v:::::v   ee::::::::::::ee    dd::::::::::::::d   a::::::::::::a  t:::::::::::::::::t      a::::::::::::a  
ss:::::::::::::s   aaaaaaaaa:::::a   v:::::v       v:::::v   e::::::eeeee:::::ee d::::::::::::::::d   aaaaaaaaa:::::a t:::::::::::::::::t      aaaaaaaaa:::::a 
s::::::ssss:::::s           a::::a    v:::::v     v:::::v   e::::::e     e:::::ed:::::::ddddd:::::d            a::::a tttttt:::::::tttttt               a::::a 
 s:::::s  ssssss     aaaaaaa:::::a     v:::::v   v:::::v    e:::::::eeeee::::::ed::::::d    d:::::d     aaaaaaa:::::a       t:::::t              aaaaaaa:::::a 
   s::::::s        aa::::::::::::a      v:::::v v:::::v     e:::::::::::::::::e d:::::d     d:::::d   aa::::::::::::a       t:::::t            aa::::::::::::a 
	  s::::::s    a::::aaaa::::::a       v:::::v:::::v      e::::::eeeeeeeeeee  d:::::d     d:::::d  a::::aaaa::::::a       t:::::t           a::::aaaa::::::a 
ssssss   s:::::s a::::a    a:::::a        v:::::::::v       e:::::::e           d:::::d     d:::::d a::::a    a:::::a       t:::::t    tttttta::::a    a:::::a 
s:::::ssss::::::sa::::a    a:::::a         v:::::::v        e::::::::e          d::::::ddddd::::::dda::::a    a:::::a       t::::::tttt:::::ta::::a    a:::::a 
s::::::::::::::s a:::::aaaa::::::a          v:::::v          e::::::::eeeeeeee   d:::::::::::::::::da:::::aaaa::::::a       tt::::::::::::::ta:::::aaaa::::::a 
 s:::::::::::ss   a::::::::::aa:::a          v:::v            ee:::::::::::::e    d:::::::::ddd::::d a::::::::::aa:::a        tt:::::::::::tt a::::::::::aa:::a
  sssssssssss      aaaaaaaaaa  aaaa           vvv               eeeeeeeeeeeeee     ddddddddd   ddddd  aaaaaaaaaa  aaaa          ttttttttttt    aaaaaaaaaa  aaaa

*/

function saveData(quote, uname, tbn, caption, background) {
	inputChanged = false;
	saveButton.disabled = true;


	var lineBreakCount = (caption.match(/\n/g) || []).length;
	if (lineBreakCount > 5) {
		return false;
	} else {

		if (uname.length > 50) {
			uname = uname.substring(0, 50);
		}

		// Save form data to Firebase Realtime Database
		if (navigator.onLine) {

			var quoteRef = database.ref('quotes').push();

			quoteRef.set({

				quote: limitCharacters(quote, 200),
				uname: uname,
				thumbnail: tbn,
				sessionkey: internetTime,
				pinned: false,
				show: "true",
				views: "0",
				visits: "0",
				background: background,
				caption: caption,
				subtitle: "Guest",
				timestamp: firebase.database.ServerValue.TIMESTAMP
			}, function (error) {
				if (error) {
					console.error("Failed to save quote:", error);
					notif.style.display = "block";
					if (error.code === "PERMISSION_DENIED") {
						//alert("You don't have permission to save quotes.");
						notif.innerHTML = "Database is locked";
					} else if (error.code === "NETWORK_ERROR") {
						//alert("No internet connection. Please check your network settings and try again.");
						notif.innerHTML = "No internet connection.";
					} else {
						//alert("Failed to save quote. Please try again later.");
						notif.innerHTML = "Failed to save link.";
					}
				} else {
					myForm.style.display = 'none';
					postFrom.reset();
					showFormButton.style.display = 'block';
					myContent.style.display = 'block';
					notif.style.display = "block";
					notif.innerHTML = "Shared Successfully!";
					saveButton.disabled = false;
				}

			});

		} else {
			notif.style.display = "block";
			notif.innerHTML = "No Connection";
		}
		return true;

	}


}

function toggleLike(type, quoteId, username) {
	for (let i = 0; i < reactArr.length; i++) {
		document.getElementById(`${reactArr[i]}`).style.fontSize = `1em`;
	}
	
	var databaseRef = database.ref(`quotes/${quoteId}/react/${username}`);
	if (type === "") {
		databaseRef.remove();
	} else {
		databaseRef.set(type);		
		const element = document.getElementById(`${type}`);
		
		if(element){
			element.style.fontSize = `2em`;
		}
		
	}
}

function getReactCount(quoteId, type) {
	
	var itemCount = 0;
	firebase.database().ref(`quotes/${quoteId}/react`).orderByValue().equalTo(type).once('value', function (snapshot) {
		
		if (snapshot.exists()) {
			itemCount = snapshot.numChildren();
			console.log(itemCount);
		} else {
			itemCount = 0;
		}
		//updatelike(type, itemCount);
	});
	
	//console.log(itemCount);
	return itemCount;
}


function generateReactionHTML(reactionMap) {
	// Sort the reactionMap in descending order based on counts
	const sortedReactions = Object.entries(reactionMap)
	  .sort(([, countA], [, countB]) => countB - countA)
	  .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  
	// Generate HTML based on sortedReactions
	const htmlString = `
	  <div style="display: flex; justify-content: space-between; align-items: center; padding: 5px; margin: 5px; background-color: transparent;">
  
		  <div style="display: flex; gap: 0px; align-items: center; font-family: 'Arial', sans-serif; font-size: 12px; color: #333;">

			  ${Object.entries(sortedReactions)
				.filter(([reaction, count]) => count > 0 && reaction !== 'comments' && reaction !== 'views')
				.map(([reaction, count]) => `
				  <div style="display: flex; align-items: center; padding: 4px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff; margin-right: 5px;">
					  ${getEmoji(reaction)}
					  <div style="margin-left: 3px; font-weight: bold;">${count}</div>
				  </div>
				`).join('')}
		  </div>
  
		  <div style="display: flex; gap: 0px; align-items: center; font-family: 'Arial', sans-serif; font-size: 12px; color: #333;">
			  <div style="display: flex; align-items: center; margin-right: 5px; padding: 4px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff;">
			  <svg width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
			  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
			  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
			</svg>
				  <div style="margin-left: 3px; font-weight: bold;">${reactionMap.views || 0}</div>
			  </div>
  
			  <div style="display: flex; align-items: center; padding: 4px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff;">
			  <svg width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
			  <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
			</svg>
				  <div style="margin-left: 5px; font-weight: bold;">${reactionMap.comments || 0}</div>
			  </div>
		  </div>
  
	  </div>
	`;
  
	// Helper function to get emoji based on reaction key
	function getEmoji(reaction) {
	  const emojiMap = {
		loves: '❤️',
		likes: '👍',
		wows: '🔥',
		hahas: '😂',
		frowns: '😥',
		dislikes: '👎'
	  };
	  return emojiMap[reaction];
	}
  
	return htmlString;
  }
  
function getTotalReact(quoteId) {
	var totalcount = 0;
	firebase.database().ref(`quotes/${quoteId}/react`).once('value', function (snapshot) {
		if (snapshot.exists()) {
			totalcount = snapshot.numChildren();
		} else {

		}
	});


	return (totalcount);
}

function updatelike(type, itemcount) {
	const element = document.getElementById(`${type}`);

	if (element) {
		if (itemcount === 0) {
			element.innerText = ` `;
		} else {
			element.innerText = `${itemcount}`;
		}
	}

}

function togglePin(quoteId) {
	// Toggle the like status for the user on this quote
	database.ref(`quotes/${quoteId}/pinned`).transaction(currentLike => !currentLike);
}



function setComment(key, username, message) {

	console.log(message);
	// Assuming you have a 'comments' node under each quoteId
	const commentsRef = database.ref(`quotes/${key}/comments`);

	// Push a new comment object with username and message
	commentsRef.push({
		username: username,
		message: message,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	});
}

function loadComments(key, commentTB) {
	commentTB.innerHTML = '';
	const commentsRef = database.ref(`quotes/${key}/comments`);
	var comments = [];
	commentsRef.orderByChild('timestamp').on('value', function (snapshot) {
		snapshot.forEach(function (commentSnapshot) {
			var commentData = commentSnapshot.val();
			commentData.key = commentSnapshot.key;
			comments.push(commentData);
		});
		comments.reverse();
	});

	comments.forEach(function (commentData) {

		var crow = document.createElement('tr')
		crow.innerHTML =
			`<td>

			<table border="0" style="border-collapse: collapse; width: 100%;">
			<tr>
				<td style="width: 25; height: 25px; padding: 1px; text-align: center;">
					<img src='${profileHashMap[commentData.username]}' alt='Profile Image' width='32' style='border-radius: 50%;'>
				</td>
				<td style="padding: 1px; text-align: center;">
					<div style="max-width: 310px; height: auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					padding: 5px; margin: 5px;  text-align: left;">
					<span style="color: #666666;font-size:0.8em;word-wrap: break-word;">
					<span style="color: #4257B2;font-size:0.7em;font-weight: bold;">${commentData.username}</span>
					<br>
					${commentData.message}</span>
					<br>
					<span style="color: #b0b3b8;font-size:0.7em;word-wrap:break-word;">${getTimeString(commentData.timestamp)}</span>
					</div>
				</td>
			</tr>
		</table>
		</td>`;

		commentTB.appendChild(crow);
	});
}