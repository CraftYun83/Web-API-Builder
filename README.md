# Web-API-Builder
A website that helps you build an API easily
Work-In-Progress

Purpose: Idk, I just wanna be better and JS and CSS. This project is very unpractical (is that a word?)

<hr/>

**To run my web app:

1. Clone this repository
2. Install the node dependencies:
```
>> npm install express mongodb
```
3. Run the NodeJS server
```
>> node server.js
```
4. Visit http://localhost to access the API Creator.

<hr/>

**To run the exported Python file:

You only need to pip install pymongo if you are connecting to a MongoDB Database

```
>> pip3 install flask
>> pip3 install pymongo
>> python3 server.py
```

<hr/>

Update: 14 April 5:05pm GMT+8:00<br/>
The project now works. You can now generate working Python servers. Currently both GET and POST requests are allowed.
Planning to add option to delete paths or return functions, and being able to connect responses to MongoDB databases.

<hr/>

Update: 14 April 8:56pm GMT+8:00<br/>
I have added the feature to connect your API to (currently) 1 mongodb database. I have also added the feature to clear your current workspace.  
Note: I wanted to have a MongoDB connectivity test, but turns out, you can't connect to MongoDB databases using Javascript, only NodeJS. I might try fiure out a way to get past that, but for now, my code cannot check whether the database URI is valid or not.

<hr/>

Update 15 April 5:28pm GMT+8:00<br/>
Created a NodeJS server that will host all the files neccesary for the API creator. It also contains the feature to validate MongoDB database connections, so that's done.

<hr/>
