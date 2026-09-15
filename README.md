# NourishPB

NourishPB is a community-focused web application designed to help Pine Bluff residents make more heart-healthy food choices while working within real-world constraints such as budget, available ingredients, and access to local food options.

The project was developed by **Project Eureka** during an Innovation Sprint centered around the challenge:

> **“Promoting Heart Disease Prevention by Increasing Awareness of Healthy Food Choices in Pine Bluff.”**

Instead of approaching healthy eating as simply a matter of telling people what foods are good or bad, we designed NourishPB around a more practical question: **How can we make healthier choices easier with the money, ingredients, restaurants, and stores people already have access to?**

## Why We Built It

Healthy eating recommendations are only useful when they are realistic.

Someone may want to eat healthier but have a limited grocery budget, only a few ingredients at home, or need to grab food quickly from a local fast-food restaurant. These constraints shaped how we approached NourishPB.

The platform brings several tools into one experience:

* heart-healthy food education
* budget-based recipe discovery
* ingredient-based meal recommendations
* personalized meal planning
* healthier fast-food alternatives
* links to local grocery options

Our goal was to move beyond simply providing health information and instead help users turn that information into everyday decisions.

## Core Features

### Heart-Healthy Food Discovery

The home page introduces users to foods and ingredients associated with heart-conscious eating.

Content is organized into sections for:

* healthy meals
* herbs
* fruits
* local shopping options

Meal cards highlight core ingredients and explain their role in a heart-conscious diet, while herb and fruit cards provide information about their potential benefits and practical ways they can be incorporated into meals.

This design makes health information part of the food-discovery experience rather than separating education from action.

### Budget-Based Recipe Discovery

One of the central ideas behind NourishPB is helping users answer:

**“What healthy meal can I make with the money I have?”**

Users can enter their available grocery budget, and the application is designed to recommend meals whose ingredients fit within that constraint.

Recipe results can include:

* meal information
* core ingredients
* estimated ingredient prices
* heart-health information
* step-by-step cooking instructions

The long-term goal is to connect this feature to current pricing from grocery stores serving Pine Bluff so recommendations reflect realistic local costs.

### Ingredient-Based Recipe Recommendations

NourishPB also explores the opposite problem: instead of starting with money, what if someone already has food at home?

The ingredient-based recipe experience allows users to provide the ingredients they currently have and receive meal suggestions based on those ingredients.

The concept was designed to eventually support multiple forms of input:

* typed ingredients
* voice input
* images of available food

When potentially less heart-conscious ingredients are identified, the system can explain why they may be worth limiting and suggest healthier alternatives or meals using the remaining ingredients.

This feature is intended as an educational and meal-discovery tool rather than a substitute for professional medical or nutritional advice.

### Personalized Meal Planning

The Meal Plan feature extends individual recipe recommendations into structured daily or weekly plans.

Users can customize a plan based on:

* budget
* number of people
* group type
* planning period
* breakfast, lunch, and/or dinner

The system is designed to generate a timetable where each meal can be expanded to display its ingredients, health information, estimated cost, and preparation instructions.

Potential use cases include meal planning for:

* individuals
* families
* schools
* community organizations

The design also includes the ability to export generated plans as a PDF, making them easier to save, print, or share.

### Fast Food Cheat Sheet

One of the most important design decisions in NourishPB was recognizing that improving nutrition does not necessarily mean eliminating fast food.

The **Fast Food Cheat Sheet** helps users identify more heart-conscious options at restaurants they may already visit around Pine Bluff.

Each recommendation can include:

* restaurant information
* meal image
* relevant ingredients
* nutritional context
* explanation of healthier components
* a simple heart-based rating

Rather than presenting food choices as strictly "healthy" or "unhealthy," the feature is designed to help users make **better choices within their existing habits and circumstances**.

## Local-First Design

NourishPB was designed specifically around the Pine Bluff community rather than as a generic nutrition application.

That influenced several product decisions, including:

* considering prices at stores accessible to local residents
* linking users to nearby grocery options
* highlighting choices from fast-food restaurants available locally
* designing recommendations around realistic budgets
* considering future partnerships with local food producers and organizations

This local-first approach was important because food accessibility is affected by more than nutritional knowledge. Cost, transportation, availability, and convenience all influence what people are realistically able to eat.


## Future Development

Future versions of NourishPB could expand the prototype with:

* persistent user accounts and preferences
* real-time or regularly updated local grocery pricing
* grocery store and location APIs
* nutrition database integration
* AI-powered meal recommendations
* image-based ingredient recognition
* voice-based ingredient entry
* dietary preference and allergy filtering
* personalized weekly meal plans
* downloadable meal-plan PDFs
* grocery lists generated from meal plans
* nutrition comparisons between meals
* local restaurant menu integrations
* accessibility improvements
* mobile-first optimization

A larger version of the platform could also integrate local food resources, farms, community organizations, and other Pine Bluff initiatives to make recommendations even more relevant to residents.

## Project Status

NourishPB is currently a **prototype** developed to explore how technology can support healthier food decisions in Pine Bluff.


## Running the Project Locally

### Prerequisites

Make sure Node.js and npm are installed.

Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Live Demo

NourishPB can be viewed here:


https://heart-happy-helper.lovable.app
