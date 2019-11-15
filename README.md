
Best Buyz

## Table of Contents

* [Overview](#overview)
* [User stories](#user-stories)
* [RESTful routes](#restful-routes)
* [Bugs](#bugs)

## Overview

Best Buyz is a simple product search app to view popular Best Buy items and save those items to favorites lists. Users may also see what other people are using to better inform their purchasing decisions.

## User stories

User signs up via sign-up form.
User logs in via login form and is directed to a profile page. 
User may update username, email, and profile-picture, which will prompt them to login again with updated info. 
User may view popular Best Buy desktops, laptops, and tvs (LIMIT 10 products per page). 
User may comment on any of these displayed products, and save them either to a list of products they own, or a wishList. 
User may view their products, or their wishlist on separate pages. 
User may view what other users have, but not their wishlist. 

## RESTful routes

/GET
/Profile displays current user profile, populated by user database. 
/items has three links to three separate product pages. 
/myitems displays current user's favorited items.
/wishList display current user's wish list items.
/computers, /laptops, and /tvs display 10 most popular products of that type from Best Buy's api. 


/POST
Form on product display page allows user to save a product to their wish list or to their items list.
/wishList --> find current user --> find or create wished item for that user --> render page with that item and any others listed. 
/myItems --> find current user --> find or create item for that user --> render page with that item and any others listed. 

Form on computers/view
currently the post route is handled by the computers controller though that will likely change for clarity. 
/computers/view --> find item in database --> if it exists in database render a page with the users who have that item in their 
items list --> else render page that says 'Be the first to add this item.'


/PUT
An update form calls on the current user's row and updates its information with text in the form inputs. 

/DELETE
A delete button calls on the current user's row and deletes it. 

## Bugs

As of now it is possible to save the same item to My Items list multiple times simply
by changing the comment input. 

Deleting a user does not delete his/her associated items from the database. 

Future features:

Users should be able to see either a number or percentage of other users who use a particular product, not just their names. 

When there are no favorited or wished items the rendered pages should read something like, 
'Looks like you haven't added anything yet!'