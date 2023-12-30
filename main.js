var attempt = 4;
const CreateAccountButton = document.getElementById('CreateAccount');
const LoginButton = document.getElementById('Login');
const container = document.getElementById('container');
const ForgotPasswordButton = document.getElementById('ForgotPassword')
const form = document.getElementsByClassName('form');
const returnButton = document.getElementById('return');
let inpass = [];
let uppass = [];

CreateAccountButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});


LoginButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

ForgotPasswordButton.addEventListener('click', () => {
    container.classList.add('panel');
    

});

returnButton.addEventListener('click', () => {
    container.classList.remove('panel');


});


function upimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);
            
        }
        else {
            Image.classList.add('clicked');
            uppass.push(element.id);
            
        }
    }
}

function inimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);
           
        }
        else {
            Image.classList.add('clicked');
            inpass.push(element.id);
           
        }
    }
}



function signup() {
    sessionStorage.setItem("upname", document.getElementById('upmail').value);
    sessionStorage.setItem("uppass", uppass);
    var myText = "Account Created Succesfully";
    alert(myText);
    sendMail();
}


function signin() {
    let str = document.getElementById('inmail').value;
    let array = sessionStorage.getItem("uppass");
    let check1 = array.localeCompare(inpass.toString());
    if ((!str.localeCompare(sessionStorage.getItem("upname"))) && !check1) {
        var myText = "Login Successfully";
        alert(myText);
        NewTab();
        
    }
    else{
       

        attempt --;

        alert(`Login Failed!  You have left ${attempt} more login attempt`);

        if(attempt == 0){
            document.getElementById("inmail").disabled=true;
            document.getElementById("signinbtn").disabled=true;
            alert('Your Account Has Been Blocked');
            sendMail2();
        }
       

    }
}

function NewTab() {
    window.open(
      "https://cyberlabs.club/");
}


function sendOTP() {
	const email = document.getElementById('email');
	const otpverify = document.getElementsByClassName('otpverify')[0];

	let otp_val = Math.floor(Math.random() * 10000);

	let emailbody = `<h2>Your OTP is ${otp_val} </h2>`;
	Email.send({
    SecureToken : "10fb2da3-a05f-4663-8866-b6cc62f5f000",
    To : email.value,
    From : "kjhg31228@gmail.com",
    Subject : "Email OTP",
    Body : emailbody,
}).then(

	message => {
		if (message === "OK") {
			alert("OTP Sent to your Email : " + email.value);

			otpverify.style.display = "flex";
			const otp_inp = document.getElementById('otp_inp');
			const otp_btn = document.getElementById('otp-btn');

			otp_btn.addEventListener('click', () => {
				if (otp_inp.value == otp_val) {
					alert("Email address verified..!  Login Successfully..");
                    NewTab();
				}
				else {
					alert("Invalid OTP");
				}
			})
		}
	}
);
}

function sendMail2(){

    const email = document.getElementById('inmail');


    Email.send({
        SecureToken : "10fb2da3-a05f-4663-8866-b6cc62f5f000",
        To : email.value,
        From : "kjhg31228@gmail.com",
        Subject : "Security Alert",
        Body : "<h2> Dear User, Your Account Has Been Blocked Due To 4 Consecuitve Failed Login Attempts. </h2> "
       
    }).then(
      message => alert("Alert Notify to the Registered Email : " + email.value)
    );




}

function sendMail(){

    const email = document.getElementById('upmail');


    Email.send({
        SecureToken : "10fb2da3-a05f-4663-8866-b6cc62f5f000",
        To : email.value,
        From : "kjhg31228@gmail.com",
        Subject : "Sign Up",
        Body : "<h2> Welcome User, Your Account Has Been Created Successfully. </h2>"
       
    }).then(
      message => alert("Mail Sent to the Registered Email : " + email.value)
    );





}