# HeartWise Plates

SPEC

We are Project Eureka competing in an Innovation Sprint to solve challenges that are being faced in the Pine Bluff community. Our specific problem statement is

“Promoting Heart Disease Prevention by Increasing Awareness of Healthy food Choices in Pine Bluff”

We have decided to build a website that provides information about healthy food choices. We plan on doing this by displaying healthy recipes, creating budgets using latest prices from the supermarket chains in the pine bluff, create meal plans and suggest healthy options from the local fast-food chains.

Our website has four tabs

1.        Home

-            Has links to all the other pages

-            Has a short sentence that describes a statistic/phrase on how unhealthy foods can increase the risk of heart disease

-            The first section has a subheading titled “Healthy Meals”

-            Right underneath, there are cards

 

Card

Contains

1.        Picture of the meal

2.        Name of the meal right underneath

3.        Heading: Core Ingredients (the main ingredients scientifically proven to prevent heart disease). Followed by bullet points of each of those ingredients with a short phrase on its exact effect/role in fighting heart disease

-            The next section has the subheading titled “Healthy Herbs”

-            Right underneath there are cards this time displaying the

 

Card

Contains

1.        Picture of the Herb

2.        Name of the Herb underneath

3.        Bullet points with a bolded title “What it does” with short phrases on its exact effect/role in fighting heart disease

4.        Another bullet points under a bolded title “How to take it” with short phrases to how to take it

-            The next section has the heading titled “Healthy Fruits”

-            This section will inherit the same version of the cards from healthy herbs

-            The next section Is “Where to shop”

-            This section will have images of the stores (the one’s In Pine bluff) with links to that store

2.        Create Recipe

This page will have two sections:

a.        Titled “From Money”

An input box with a dollar sign and space to input the amount that a user has to buy

When a user submits the amount, A card should be returned on the screen showing the picture of the meal, core ingredients with phrases described above, with prices of those ingredients from our local database, and the bullet points with process of cooking the meal titled “instructions”

b.       Titled “Form Ingredients”

This section has a textbox like one an chatgt where the user has the option to speak, take an image, or text of the ingredients they have.

 

The output will be conditional

                                      If there is any ingredients that are unhealthy, it returns two cards:

1.        A warning card that lists out the harmful ingredients and why they are harmful in causing Heart Disease

2.        A card (inheriting the card format from the “From Money”) with a meal showing ingredients that are healthy in the input.

If there are no unhealthy ingredients:

               It will return a healthy meal card with the format from the “From money” section with the ingredients the user entered

3. Meal Plan

This page allows users to generate meal plans from a set of parameters. These parameters are:

-            A dropdown menu with options to pick for family, individual, school or organization. This is the group of people being considered from the meal plan

The rest of the inputs are dependent on which option was selected in the above dropdown

-            Budget: An amount with a dollar sign to enter money available

-            Number of people: An integer box to enter the number of people

-            Period: A dropdown menu with options: daily and weekly

-            Meals: A dropdown menu with options: breakfast, lunch and dinner (radio buttons which many can be selected)

The output of this page is timetable depending on what Period options and meals option was. This will be a pretty table with rows representing the meals and the columns representing the day(s). Each box should be a card just like the card from the Healthy Meals section on the home page. When clicked this card should expand and show the Card from the “From Money” section of the create recipe page for that meal, thus a detailed instructions bullet.  This page has the option to be downloadable in PDF format.

 

4  Fast Food Cheat Sheet

-            This page has a large font that has the text “Healthy Choices from your unhealthy vices”

-            This page is about showing the healthy options that promote heart health/ or do not deteriorate it from the fast-food restaurants in Pine Bluff.

-            This page should have five cards loaded at a time.

-            Each card should include a small circle in the left corner with the logo of the fast-food restaurant

-            The image of the meal from the website

-            Bullet points that list Some core ingredients (if any) that promote heart Health with a description of what they do in that respect.

-            More can be loaded if the more button is clicked.

In the right corner there should be a heart representing how healthy the option is. Five heats being the most healthy and one being the least.

You as an expert sofware engineer, are tasked with creating a prototype. the app should use the best UI features and look visually pleasing.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://heart-happy-helper.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4c41811f-873b-4dd3-9377-e20de8d49bae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
