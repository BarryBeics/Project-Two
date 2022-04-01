# Trade Probability Calculator Website
 
![Barry Marples](./readme-docs/readme-TPC-view.png)
 
 
This site is a learning tool for those new to the world of crypto trading, it offers the user the chance to explore how changing various trading parameters may impact a given strategies profitability.
 
You can visit the deployed website [here](https://barrybeics.github.io/Project-Two/).
 
<br /><br />
 
## 1. UX
---
 
### 1.1. Project Goals ###
 
Picking a trading strategy can be complex. This site will help users gain a better understanding of what impact changing parameters can have on the effectiveness of a given trading strategy.
As this is a project I would like to further develop, users are also able to contact the developer using the contact form to make suggestions for improvements to the site.
 
### 1.2. User Stories ###
 
- As a USER I want to be able to add the amount I would stake in a trading strategy.
- As a USER I want to be able to choose my prefered crypto currency.
- As a USER I want to be able to vary the point I would take profit from a trade so that I can see the effect this would have on the overall strategy.
- As a USER I want to be able to vary the point I would exit from a trade so that I can see the effect this would have on the overall strategy. 
- As a USER I want to be able to vary the volatility in the simulation so that I can see the effect this would have on the overall strategy. 
- As a USER I want to be able to vary the percentage of gain the simulation is working on so that I can see the effect this would have on the overall strategy. 
- As a USER I want to be able to change the time spent in a trade so that I can see the effect this would have on the overall strategy.
- As a USER I want to be able to change the duration the simulation will run for so that I can see the effect this would have on the overall strategy. 
- As a USER I want simple explanations of any complex terminology so that I can understand what it is I’m making changes to.
- As a USER I want a simple interface so that I can cycle between strategies quickly and easily.
- As a USER I want a simple summary of the results so that I can quickly understand if change I have made has improved my strategy or not.
- As a USER I want a to be able to save results for later comparison.
- As a USER I want to be able to contact the developer to suggest future developments to the site.

 
 
### 1.3. Design ###
 
- **Colour Scheme**: The colours have been selected to produce a simple clean look so that users can focus on the results. 

![Barry Marples](./readme-docs/readme-colours.png)
 
- Persian Green #00aaaa - Highlighted elements 
- Elm #197b7b - Heading Text & button background
- Emperor #504e4f - Box borders
- Tundora #444444 - Unselected buttons 
- Pale Slate #c7c5c6 - Text 
- Cod Grey #1b1b1b - Website background colour 

- **Typography**: The site uses 2 fonts, Firstly for the body text and buttons Montserrat font was the choice, Montserrat is a clean font used frequently in programming, so it is both attractive and appropriate. Secondly for the headings, navigation text and to display the results Teko is the choice, this is a slim font allowing for more content to be displayed in a small area. Both fonts have Sans Serif as the fallback font in case for any reason the font isn't being imported into the site correctly.
 
- **Imagery**: The site only has 2 graphics. Firstly the bull & bear logo seen in the top left of every page consistent with branding of sites of this nature. Then we have the second graphic on the home of a typical newbie trader swamped in data trying to make sense of it all.
 
### 1.4. Wireframes ###
 
The wireframes for this site were produced in Balsamiq (https://balsamiq.com/). Wire frames were created for Desktop, Tablet & mobile respectively.

  
Wireframe - [View](WIREFRAMES.md)
 
<br /><br />
 
## 2. Features
---
 
### 2.1. Existing features ###
 
**The Header** includes:
 
- **Navigation Bar**: allows users to navigate the site in an easy and intuitive way.
 
**The Footer** includes:
 
- **Social**: allows users to know more about the developer. These are all links to real accounts as I intend to develop this project further over time.
 
Both the Header and the Footer are consistent throughout the website.
 
**Home Page** includes:
 
- **overview**: A couple of sentences to give a brief explanation of the site does.
Graphic showing a person working hard to understand trading strategy
 
 
**Calculator Page** includes:
 
- **Options Panel**: Allows for input of various parameters by the user.
- **Results Panel**: Show the results of the current trading strategy.

 
**Results Page** includes:
 
- **Past Results**: Here users will see all results of past trade strategies.

 
**Contact Page** includes:
 
- **Contact form**: allows users to make initial contact in a structured format so that the developer can respond with an answer.
 

 
### 2.2. Features left to implement in the future ###
 

- Offer other volatility indicators
- Ability to sort results by percentage profit
- Allow user to add broker fee to be factored into the profitability calculation
- Setting page to allow further customization


 
<br /><br />
 
## 3. Technologies used
---
 
### 3.1. Languages Used ###
 
-   [HTML5](https://en.wikipedia.org/wiki/HTML5)
-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
-   [Javascript](https://en.wikipedia.org/wiki/JavaScript)


### 3.2. Frameworks, Libraries & Programs Used ###
 
- [Bootstrap 5.0.2:](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - Bootstrap was used to handle the responsive layout of the website.
- [Hover.css:](https://ianlunn.github.io/Hover/) - Hover.css was used on the navigation buttons with the underline-from-center effect and the Social Media icons in the footer pop was used for a response while being hovered over.
- [Google Fonts:](https://fonts.google.com/) - Google fonts were used to import the 'Montserrat' & 'Teko' fonts into the style.css file which is used on all pages throughout the project.
- [Font Awesome:](https://fontawesome.com/) - Font Awesome was used on the navigation buttons and in the footer which are present on all pages throughout the website to add icons for aesthetic and UX purposes.
- [Gitpod](https://gitpod.io/) - Git was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.
- [GitHub:](https://github.com/) - GitHub is used to store the project's code after being pushed from Git.
- [Photoshop:](https://www.adobe.com/ie/products/photoshop.html) - Photoshop was used to resize graphics and customise the bulls n bears logo.
- [Balsamiq:](https://balsamiq.com/) - Balsamiq was used to create the [wireframes](https://github.com/) during the design process.
 
 
<br /><br />
 
## 4. Logic
---

Here is a flow diagram to illustrate the logic required to control this application based on the users choices

![Logic](./readme-docs/readme-logic.png)

<br /><br />
 
## 5. Testing
---
The testing process can be seen [here](TESTING.md).
 
<br /><br />
 
## 6. Deployment
---
 
**To deploy the project**
 
This project is hosted in GitHub Pages
 
1. Once your viewing the project’s repository on GitHub select **Settings** from just above the green Gitpod button.

![Deployment Settings](./readme-docs/deployment-share-repository.png)

2. From the left hand side navigation go down and click on **Pages** link.

![Deployment Pages](./readme-docs/deployment-share-pages.png)

3. Inside that section, click on the drop-down menu under **Source** and select **Branch: Main**.
4. Click **Save** and the website is now deployed.

![Deployment Save](./readme-docs/deployment-share-save.png)

5. The link to the webpage appears in the green box above where you clicked **Save**.
 
Only one branch has been used for this project.


<br /><br />


**To run the project locally**
 
To clone this project from GitHub:
 
1. Once you navigate the main page of project’s repository on GitHub, above the list of files click **Code**
2. This opens a view showing the url for the project click the copy icon to get the full repository address.

![Clone Copied](./readme-docs/deployment-clone-copied.png)

3. Open Terminal and ensure to navigate to the folder where you want to place the cloned project.

![Clone Terminal](./readme-docs/deployment-clone-terminal.png)

4. Type **git clone** and now paste the url you copied earlier.
5. Now press **Enter** to create your local clone of this project
 
 
<br /><br />
 
## 7. Credits
---
 
### 7.1. Content
All the text on the website has been written by Barry Marples
 
[Bootstrap5](https://getbootstrap.com/docs/5.0/getting-started/introduction/): Bootstrap Library used throughout the project mainly to make the site responsive using the Bootstrap Grid System. I also utalised some of the boostap styling for the buttons and form inputs.

[Mark Heath Radio Buttons](https://markheath.net/post/customize-radio-button-css ): code for turning radio button options to buttons with styling inkeeping with the site design was based on Mark Heaths code, I utalised the fuctionality of this code but styled them to fit the projects look.

[w3schools range slider](https://www.w3schools.com/howto/howto_js_rangeslider.asp): code for the option range sliders is based on the w3chools lesson and I utalised the fuctionality of this code but styled them to fit the projects look.


 
### 7.2. Media
 
The graphic on the home page, the logo & the background image are a free downloads from [Vecteezy](https://www.vecteezy.com/vector-art/2214399-stock-trader-exchange): made by the illustrator Chalermsuk Bootvises.

 
### 7.3. Acknowledgments
 
[Precious Ijege](https://www.linkedin.com/in/precious-ijege-908a00168/?originalSubdomain=ng) for the mentor guidance and support.
 
The [Code Institute](https://codeinstitute.net/) tutor team.
 
 
 
