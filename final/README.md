# Final Project
### This is a web app created using Node.js, Express, MongoDB, and Vue.js. The idea behind the app is to reduce food waste for a building/dorm/neighborhood by allowing people to upload food items they don't need up on the site. Anyone in the community can then claim the food and pick it up. 

# To Setup
The first step is to install MongoDB and MongoDB Compass. It's not neccessary to install MongoDB Compass unless you want a GUI to see the changes to the database easily. 

1. Download MongoDB Community Server at https://www.mongodb.com/download-center/community
2. Run the executable to install MongoDB
3. Open a terminal as `administrator`
4. cd to where MongoDB lives on your computer. I'm running Windows, here's what it looks like for me

![Screenshot](https://github.com/zafirhsn/independent-study/blob/master/final/mongo.PNG)

You may not have a `data` directory like I do. If you do not, create one. Within the `data` directory, if you do not have a `db` directory, create one. Finally, you might not have a `log` directory like I have, if you don't, create one. 

4. cd to the `bin` directory within `mongodb`. I'm running Windows, so it looks like this `C:\Program Files\MongoDB\Server\4.0\bin`

5. Type this into terminal 
```
mongod --directoryperdb --dbpath C:\Program Files\mongodb\server\4.0\data\db --logpath C:\Program Files\mongodb\server\4.0\log\mongo.log --logappend --rest --install
```
The first path is your path to the `db` directory. The second path will create a log file in `log` directory. Your paths may be different




6. ```
   net start mongodb
   ```

   ![Screenshot](mongodbterminal.png)

   Example of what you should see after completing step 5 and 6

7. MongoDB is now running locally at `localhost:27017`:

### Downloading MongoDB Compass

1. You can download MongoDB Compass at https://www.mongodb.com/download-center/compass
2. Run executable to install
3. Open MongoDB Compass and click "CONNECT" on bottom right of window



# To Run
There are two parts to this project; the backend API created using Express, and the front-end created using Vue.

## Backend 
1. cd into `food-backend`
2.  ```
    npm install
    ```
3.  ```
    npm start
    ```

4. Backend should be running on port `3000` on `localhost`

## Frontend 
1. cd into `food-frontend`
2. ```
   npm install 
   ```
3. ```
   npm run serve
   ```
4. Front-end should be running on port `8080` on `localhost`
5. If app is crashing, it's most likely because some modules are not installed globally and need to be. Try the following
```
npm install -g @vue/cli
```
```
npm install -g webpack
```
```
npm install -g webpack-dev-server
```
```
npm install -g babel
```

# Steps to Use
1. Create an account
2. Login with new account
3. Click "create listing"
4. Enter item name and number of items
5. Logout
6. Create another account
7. Loging with this account
8. Claim the listing that you made on the other account by clicking "claim"

## Features
1. Users can create new account and login. 
2. Passwords are encrypted using sha1
3. Users can create a post, saying what food item and how many of it they want to post.
4. Users can see all other items posted by other others in their feed
5. User can claim a food in their feed that isn't theirs
6. On the left of the dashboard, users can see which posts of theirs haven't been claimed and which foods from other people they've claimed

## Known Bugs
1. Some bugs when refreshing pages (content not loading)
2. You can change your password by clicking "settings" on your dashboard, but you can never log in again because the hashed passwords never match on the database for some reason.
3. "Schedule" route doesn't exist