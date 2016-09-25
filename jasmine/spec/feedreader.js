/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have a URL that is not empty', function() {
            for (i=0; i<allFeeds.length; i++) {
              expect(allFeeds[i].url).toBeDefined();
              expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have a name that is not empty', function() {
          for (i=0; i<allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).toBeGreaterThan(0);
          }
        });
    });

    /* Test suite to test the features of the slide-in menu */
    describe('The menu', function() {


        /* This test ensures the menu element is
        * hidden by default (testing whether '.menu-hidden' class in applied).
        */
        it('is hidden by default', function() {
          var status = $('body').hasClass('menu-hidden');
          expect(status).toBe(true);
        });

        /* This test ensures the menu changes
        * visibility when the menu icon is clicked.
        * It has two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

        it('display when clicked and hide when clicked again', function() {
          menuIcon = $('.menu-icon-link');

          //expect 'menu-hidden' to be removed from body on the first click
          menuIcon.click();
          expect($('body').hasClass('menu-hidden')).toBe(false);

          //expect 'menu-hidden' to be added back to body on the second click
          menuIcon.click();
          expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    /* Test suite "Initial Entries" to test loadFeed function initial load */
    describe('Initial Entries', function() {
      /* This test ensures that when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      */

      //signals to the network that async has done doing what we need it to do and we can continue testing
      beforeEach(function(done) {
        loadFeed(0,done);
      });
      it('there is at least a single .entry element within the .feed container when the loadFeed function is called and completes running', function(done) {
        expect($('.feed .entry').length).not.toBe(0);
        done();
      });
    });

    /* Test suite "New Feed Selection" to test the menu toggling icon functionality */
    describe('New Feed Selection', function() {
      /* This test ensures that when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      */
      var content0,
          content1;
      beforeEach(function(done) {
        loadFeed(0,function(){
          content0 = $('.feed').text();
          done();
        });
      });

      it('content actually changes when the new feed is loaded', function(done) {
        loadFeed(1,function(){
          content1 = $('.feed').text();
          expect(content1).not.toEqual(content0);
          console.log(content0);
          console.log(content1);
          //use done() to signal to the framework which test relies on the async execution
          done();
        });
      });
    });
}());
