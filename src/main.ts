const streamPromise = navigator.mediaDevices.getDisplayMedia();
streamPromise.then((stream) => {
	var recordedChunks: Blob[] = []; // recorded video data
	var options = { mimeType: 'video/webm; codecs=vp9' }; // Set the encoding format
	var mediaRecorder = new MediaRecorder(stream, options); // Initialize the MediaRecorder instance
	mediaRecorder.ondataavailable = handleDataAvailable; // Set the callback when data is available (end of screen recording)
	mediaRecorder.start();
	// Video Fragmentation
	function handleDataAvailable(event: BlobEvent) {
		if (event.data.size > 0) {
			recordedChunks.push(event.data); // Add data, event.data is a BLOB object
			download(); // Encapsulate into a BLOB object and download
		}
	}
	// file download
	function download() {
		var blob = new Blob(recordedChunks, {
			type: 'video/webm',
		});
		// Videos can be uploaded to the backend here
		var url = URL.createObjectURL(blob);
		var a = document.createElement('a');
		document.body.appendChild(a);
		// @ts-ignore
		a.style = 'display: none';
		a.href = url;
		a.download = 'test.webm';
		a.click();
		window.URL.revokeObjectURL(url);
	}
});
