
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");



inquirer
  .prompt([
    {
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    type: 'input',
    name: 'userColor',
    message: 'Choose your background color'
  }
])
  .then(function({ username, userColor }) {
    //user info github api
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(res => {
      
      //user name
      const profName = res.data.login;
      //profile image
      const profImg = res.data.avatar_url;
      //user bio
      const userBio = res.data.bio;
      //user location
      const location = res.data.location;
      //user github url
      const githubU = res.data.html_url;
      //user blog
      const blog = res.data.blog;
      //number of public repos
      const numRepo = res.data.public_repo;
      //number of github follwers
      const followers = res.data.follwers;
      //number of github accounts following
      const following = res.data.following;
      //number of github stars

      //user picked color
      const pickColor = userColor;
      
    //create HTML

      return  htmlStr = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>${profName} Developer Profile</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <link href="https://fonts.googleapis.com/css?family=Caveat&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="style.css">
          
        </head>
        <body>
        <div class="jumbotron" style="background-color: ${pickColor}">
          <div>${profName}</div>
          <img src="${profImg}">
        </div>
        <div class="container">
          <div>${userBio}</div>
          
          <div>${blog}</div>
          
          <div class="fas fa-map-marked-alt">${location}</div>
          <div>${numRepo}</div>
          <div>${followers}</div>
          <div>${following}</div>
          <a href="${githubU}"</a>
          </div>
        </body>
        </html>
      `;
      
    })
    .then(() => {
      // convert to pdf 
      const createPDF = async () => {
        const html5ToPDF = new HTML5ToPDF({
          inputPath: path.join(__dirname, "./index.html"),
          outputPath: path.join(__dirname, "./developer.pdf"),
          include: [
            path.join(__dirname, "./style.css")
          ],
          options: { printBackground: true } 
        });
        await html5ToPDF.start();
        await html5ToPDF.build();
        await html5ToPDF.close();
        console.log("DONE");
        process.exit(0);
        };
      return createPDF();
    });
  });
    
  


  //api object info
  // data: {
  //   login: 'iedson',
  //   id: 54321248,
  //   node_id: 'MDQ6VXNlcjU0MzIxMjQ4',
  //   avatar_url: 'https://avatars3.githubusercontent.com/u/54321248?v=4',
  //   gravatar_id: '',
  //   url: 'https://api.github.com/users/iedson',
  //   html_url: 'https://github.com/iedson',
  //   followers_url: 'https://api.github.com/users/iedson/followers',
  //   following_url: 'https://api.github.com/users/iedson/following{/other_user}',
  //   gists_url: 'https://api.github.com/users/iedson/gists{/gist_id}',
  //   starred_url: 'https://api.github.com/users/iedson/starred{/owner}{/repo}',
  //   subscriptions_url: 'https://api.github.com/users/iedson/subscriptions',
  //   organizations_url: 'https://api.github.com/users/iedson/orgs',
  //   repos_url: 'https://api.github.com/users/iedson/repos',
  //   events_url: 'https://api.github.com/users/iedson/events{/privacy}',
  //   received_events_url: 'https://api.github.com/users/iedson/received_events',
  //   type: 'User',
  //   site_admin: false,
  //   name: null,
  //   company: null,
  //   blog: '',
  //   location: null,
  //   email: null,
  //   hireable: null,
  //   bio: null,
  //   public_repos: 9,
  //   public_gists: 0,
  //   followers: 0,
  //   following: 0,
  //   created_at: '2019-08-20T14:26:18Z',
  //   updated_at: '2019-10-26T15:06:07Z'
  // }

