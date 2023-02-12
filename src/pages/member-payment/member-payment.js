const sectionParkir = document.querySelector("#section-parkir");
const cardParkir = document.querySelector("#card-parkir");
const cardIDMember = document.querySelector("#card-id-member");
const cardVANumber = document.querySelector("#card-va-number");
const cardBankName = document.querySelector("#card-bank-name");

const form = document.querySelector("#payment-form");
const memberIdInput = document.querySelector("#id-member");
const bankSelect = document.querySelector("#bank");
const btnSubmit = document.querySelector("#btn-submit");
const btnPaid = document.querySelector("#btn-paid");

const sectionCaptcha = document.querySelector("#section-captcha");
const captchaContainer = document.getElementById("captcha-container");
const captcha = document.querySelector("#captcha");
const captchaInput = document.querySelector("#captcha-input");

const generateRandomCardImage = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomImage = `url(https://picsum.photos/id/${randomNumber}/400/300)`;
  cardParkir.style.backgroundImage = randomImage;
};
generateRandomCardImage();

// Buat CAPTCHA dengan memunculkan 2 angka acak
let captchaNumber1 = 0;
let captchaNumber2 = 0;
const generateCaptcha = () => {
  captchaNumber1 = Math.floor(Math.random() * 10);
  captchaNumber2 = Math.floor(Math.random() * 10);
  captcha.innerHTML = `${captchaNumber1} + ${captchaNumber2} =`;

  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomImage = `url(https://picsum.photos/id/${randomNumber}/400/300)`;
  captchaContainer.style.backgroundImage = randomImage;
};
generateCaptcha();

const generateVirtualAccount = () => {
  return Math.floor(Math.random() * 100000000000 + 10000000000);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const memberId = memberIdInput.value;
  const bank = bankSelect.value;

  if (!memberId || !bank) {
    alert("ID Member dan Jumlah Pembayaran harus diisi!");
    return;
  }

  if (captchaInput.value != captchaNumber1 + captchaNumber2) {
    generateCaptcha();
    alert("CAPTCHA salah!");
    return;
  }

  console.log(`Member ID: ${memberId}`);
  console.log(`Bank: ${bank}`);

  // Kirim data pembayaran ke server

  form.classList.add("hidden");

  cardIDMember.classList.remove("hidden");
  cardVANumber.classList.remove("hidden");
  cardBankName.classList.remove("hidden");
  cardIDMember.textContent = memberId;
  cardVANumber.textContent = generateVirtualAccount();
  cardBankName.textContent = `(${bank} a/n EVO-Parking)`;

  //   btnSubmit.setAttribute("disabled", true);
  //   btnSubmit.style.opacity = "0.5";
  //   btnSubmit.style.cursor = "not-allowed";

  btnPaid.classList.remove("hidden");
  cardParkir.style.backgroundImage = `none`;
});
