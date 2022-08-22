class LoginPage{

    constructor(page){
        this.page = page;
    }

    async login(username, password){
        await this.page.goto('https://lunch.devbstaging.com/login-password');
        await this.page.locator(`[name='email']`).type(username);
        await this.page.locator(`[name='password']`).type(password);
        await this.page.locator(`[type='button']`).click();
    }

    async locatorText(locatorInput){
        return await this.page.locator(locatorInput).innerText();
    }

}

module.exports = { LoginPage };