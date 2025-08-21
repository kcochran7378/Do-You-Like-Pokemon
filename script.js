let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // Tracks the scaling factor directly

const gifElement = document.getElementById("togepi-gif"); // <-- Togepi gif element
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// ✅ Your same GIFs (in order)
const gifs = [
  "/Users/Karmen/Practice app:website/gifs/snorlax.gif",
  "gifs/ -2.gif",
  "gifs/ -2.gif",
  "gifs/ -2.gif"
];

// ✅ Your same messages
const buttonMessages = [
  "Are you sure??",
  "Pookie please",
  "Pookie PLEASE",
  "You can't do this to me!"
];

// ❌ No button clicked
noButton.addEventListener("click", () => {
  if (noClicks < maxNoClicks) {
    // change image
    gifElement.src = gifs[noClicks];
  }

  // change no button text
  noButton.textContent = buttonMessages[noClicks % maxNoClicks];

  // Adjust button width to fit text
  noButton.style.width = "auto";
  noButton.style.width = `${noButton.scrollWidth}px`;

  // decrease the size of the no button
  if (noScale > minNoScale) {
    noScale -= 0.1;
    noButton.style.transform = `scale(${noScale})`;
  }

  // Calculate the scaled width of the yesButton
  const baseWidth = parseFloat(yesButtonStyle.width);
  const scaledWidth = baseWidth * yesScale;

  console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

  // grow the Yes button if it's still smaller than max
  if (scaledWidth < maxYesWidth) {
    yesScale += 0.5;
    yesButton.style.transform = `scale(${yesScale})`;

    // Get current gap scale factor from CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const gapScaleFactor =
      parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

    // Adjust the gap dynamically
    const currentGap = parseFloat(buttonContainer.style.gap) || 20;
    const newGap = Math.sqrt(currentGap * gapScaleFactor);
    buttonContainer.style.gap = `${newGap}px`;
  }

  // increment clicks
  noClicks++;
});

// 🎉 Yes button with confetti + redirect
yesButton.addEventListener("click", () => {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
  setTimeout(() => {
    window.location.href = "yay.html";
  }, 1200);
});