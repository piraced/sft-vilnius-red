// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { MainPage } = require('../pages/mainPage');



const date = new Date();

test.describe('', () => {
    test(' login as user', async ({ page }) => {
        test.setTimeout(100000);
        let loginPage = new LoginPage(page);
        await loginPage.login('Andrius.Grazys@sourceryacademy.com', 'nera_svarbus14');
        // the elements are really hard to select in this site
        await expect( await loginPage.locatorText("//html/body/div/div/div[13]/div/aside/div[3]/div[2]/a/div[2]/div/span")).toContain('Atsijungti');
    })
});

    test('order all of the food as user for the next day', async ({ page }) => {
        let weekday;
        test.setTimeout(100000);
        let loginPage = new LoginPage(page);
        await loginPage.login('Andrius.Grazys@sourceryacademy.com', 'nera_svarbus14');
        
        let mainPage = new MainPage(loginPage);

        // the next block of code is for selecting the next day
        //if day is Sunday(0) - Thursday use toLocaleDateString to get the days name (+ capitalaze first letter)
        if( date.getDay() < 5){
            let tomorrowDate = new Date();
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);
            let weekdayLowercase = tomorrowDate.toLocaleDateString('lt-LT', { weekday: 'long',});
             weekday = weekdayLowercase.charAt(0).toUpperCase() + weekdayLowercase.slice(1);
        }
        // if today is Friday or Saturday select Monday as the next day
        else { weekday = 'Pirmadienis';}
        await mainPage.goToDay(weekday);

        // this should select each shop and then click on each dish in each shop

    // and (if I had the time) would then proceed to attempt to order all of it and then check if it suceeded
        let shops =  await mainPage.getListOfShops();
        shops.forEach(shop => {
            shop.click();
            mainPage.clickOnEachDish();
            mainPage.pause(9999);
        });
    });

