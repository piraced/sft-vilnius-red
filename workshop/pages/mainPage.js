class MainPage{

    constructor(page){
        this.page = page;
    }

    // this function breaks but I dont have time to fix it
    async goToDay(weekday){
        let query = "[text='" + weekday + "']"; 
        await this.page.locator(query).click();
    }

    // should return an array of suppliers for the selected day
    async getListOfShops(){
        const div = await this.page.locator('.v-list__group__items v-list__group__items--no-action');
        const shops = await div.querySelectorAll('xpath=child::*');
        return shops;
    }

    // function to click on each dish from the currently selected supplier
    async clickOnEachDish(){
        const dishes = "";
        const divs = await this.page.querySlectorAll('.layout row wrap');
        divs.foreach( div => {
            dishes.push( div.querySelectorAll('xpath=child::*'));
        })
        dishes.foreach( dish => {
            dish.click();
        })
    }

    async pause(time){
        await this.page.pause(time);
    }

}

module.exports = { MainPage };