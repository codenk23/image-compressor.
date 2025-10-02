const uploadInput = document.getElementById('upload');
const qualityInput = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');

let compressedFile;

// Update quality value
qualityInput.addEventListener('input', () => {
  qualityValue.textContent = qualityInput.value;
});

// Handle file upload
uploadInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Show original image
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  preview.innerHTML = "<h3>Original Image:</h3>";
  preview.appendChild(img);

  // Compress
  const options = {
    maxSizeMB: 1, // max 1MB
    maxWidthOrHeight: 800,
    useWebWorker: true,
    initialQuality: qualityInput.value / 100
  };

  try {
    compressedFile = await imageCompression(file, options);

    const compressedImg = document.createElement('img');
    compressedImg.src = URL.createObjectURL(compressedFile);
    preview.innerHTML += "<h3>Compressed Image:</h3>";
    preview.appendChild(compressedImg);

    downloadBtn.disabled = false;
  } catch (error) {
    console.error(error);
    alert("Error compressing image!");
  }
});

// Handle download
downloadBtn.addEventListener('click', () => {
  if (!compressedFile) return;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(compressedFile);
  link.download = "compressed_" + uploadInput.files[0].name;
  link.click();
});
