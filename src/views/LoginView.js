import AbstractView from "./view.js";

export default class LoginView extends AbstractView {
  constructor(router, wallet) {
    super(router, wallet);
    this.setTitle("Login");
  }

  input
  form

  error = ""

  login(e) {
    e.preventDefault()
    this.error = ""

    if (this.input.value.length < 12) {
      //Min password requirements
      this.onError("Password too short")
      return false
    }

    this.getWallet().unlock(this.input.value).then(ok => {
      if (ok) {
        this.getRouter().navigateTo("tokens")
      } else {
        this.onError("Invalid password")
      }
    }).catch(e => {
      console.log("unlock err", e)
    })
      .finally(() => {
        this.input.value = "";
      })
  }

  onError(errorText) {
    this.error = errorText
    this._router.refresh()
  }

  async getHtml() {
    return `<div class="login text-center" style="height: 100%">
	<h1 class="mt-3">Login</h1>
	<p class="small mt-3">Enter your passcode to continue</p>


	<div class="row login-container mt-3">
	<form method="post" id="login-form">
		<div class="col-12">
			<input id="input" type="password" class="form-control" placeholder="">
		</div>

		<div class="col-12 text-center mt-2">
		    <p class="text-danger small">${this.error}</p>
		</div>

		<div class="col-12 text-center">
		    <button type="submit" class="btn btn-primary btn-block mt-5">LOGIN</button>
		</div>
		</form>
	</div>
</div>`;
  }


  async onMounted() {

    const passcodeSet = await this.getWallet().isPasscodeSet()
    if (!passcodeSet) {
      this.getRouter().navigateTo("set_passcode")
      return
    }


    this.input = document.getElementById("input")
    this.form = document.getElementById("login-form")

    this.form.addEventListener("submit", (e) => this.login(e))
  }

  async onDismount() {
    this.form.removeEventListener("submit", (e) => this.login(e))
  }

}
