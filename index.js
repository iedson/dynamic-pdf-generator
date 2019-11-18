const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");
let htmlStr = ``;



inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
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


      

    //create HTML

      htmlStr = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>${profName} Developer Profile</title>
        </head>
        <body>
          <header>${profName}</header>

          <img>${profImg}</img>
          <div>${githubU}</div>
          <div>${blog}</div>
          <div>${userBio}</div>
          <div>${location}</div>
          <div>${numRepo}</div>
          <div>${followers}</div>
          <div>${following}</div>

        </body>
        </html>
      `;
    })

    //turn js to html
    .then(htmlStr => {
      fs.writeFile("index.html", htmlStr, () => {
      });
    })
    .then(() => {
    
      //convert html to pdf
      const run = async () => {
        const html5ToPDF = new HTML5ToPDF({
          inputPath: path.join(__dirname, './index.html'),
          outputPath: path.join(__dirname, './developer.pdf'),
          options: { printBackground: true }
        });
        await html5ToPDF.start();
        await html5ToPDF.build();
        await html5ToPDF.close();
        console.log("DONE");
        process.exit(0);
      };
      return run();
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

