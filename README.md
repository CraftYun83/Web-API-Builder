# Web-API-Builder
A website that helps you build an API easily
Work-In-Progress

Purpose: Idk, I just wanna be better and JS and CSS. This project is very unpractical (is that a word?)

***Update: 14 April 5:05pm GMT+8:00<br/>
The project now works. You can now generate working Python servers. Currently both GET and POST requests are allowed.
Planning to add option to delete paths or return functions, and being able to connect responses to MongoDB databases.***
<hr/>
___Update: 14 April 8:56pm GMT+8:00___<br/>
___I have added the feature to connect your API to (currently) 1 mongodb database. I have also added the feature to clear your current workspace.<br/>
Note: I wanted to have a MongoDB connectivity test, but turns out, you can't connect to MongoDB databases using Javascript, only NodeJS. I might try fiure out a way to get past that, but for now, my code cannot check whether the database URI is valid or not.___

To run the exported Python file:

You only need to pip install pymongo if you are connecting to a MongoDB Database

```
>> pip3 install flask
>> pip3 install pymongo
>> python3 server.py
```
