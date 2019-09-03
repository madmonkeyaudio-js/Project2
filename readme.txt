
Jonny's bestbuyApp

User stories:

User signs up via sign-up form.
User logs in via login form and is directed to a profile page. 
User may update username, email, and profile-picture, which will prompt them to login again. 
User may view popular Best Buy desktops, laptops, and tvs (LIMIT 10 products per page). 
User may comment on any of these displayed products, and save them either to favorites, or a wishList. 
User may view their favorite products, or their wishlist on separate pages. 


RESTful routes: 

/GET
/Profile displays current user profile, populated by user database. 
/items has three links to three separate product pages. 
/myitems displays current user's favorited items.
/wishList display current user's wish list items.
/computers, /laptops, and /tvs display 10 most popular products of that type from Best Buy's api. 


/POST


/PUT


/DELETE


Known bugs/issues:

--> As of now it is possible to save the same item to My Items list multiple times simply
by changing the comment input. 

--> Deleting a user does not delete his/her associated items from the database. 

Future features:

--> Users should be able to see either a number or percentage of other users who use a particular product. 
The easiest way to implement it would probably be by creating a new view page, finding all users for each owned item, 
and calculating the number to a variable, which would then be displayed. 

--> When there are no favorited or wished items the rendered pages should read something like, 
'Looks like you haven't added anything yet!'